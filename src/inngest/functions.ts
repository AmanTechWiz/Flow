import { inngest } from "./client";
import { openai,gemini,createAgent , createState, createTool, createNetwork, type Tool, Agent, Message} from "@inngest/agent-kit";
import { Sandbox } from 'e2b'
import { getSandbox } from "./utils";
import { z } from "zod";
import { PROMPT, RESPONSE_PROMPT, FRAGMENT_TITLE_PROMPT } from "@/prompt";
import { lastAssistantTextMessageContent } from "./utils";
import { prisma } from "@/inngest/lib/db";

interface AgentState{
  summary : string;
  files : {[path:string]:string}
}


export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {

     const sandboxId= await step.run('get-sandbox-id',async()=>{
      const sandbox = await Sandbox.create("flow-nextjs-v1")
      return sandbox.sandboxId;
     });

     const previousMessages = await step.run("get-previous-messages", async () => {
      const editedMessage : Message[] = [];

      const messages = await prisma.message.findMany({
        where: {
          projectId: event.data.projectId,
        },
        orderBy:{
          createdAt: "desc",
        }
      });

      for(const message of messages){
        editedMessage.push({
          type: "text",
          role: message.role === "ASSISTANT" ? "assistant" : "user",
          content: message.content
        })
      }

      return editedMessage;
     });

     const state = createState<AgentState>(
      {
       summary: "",
       files: {},
     },
     {
      messages: previousMessages
     }
    )

    const codeAgent = createAgent<AgentState>({
      name: "code-agent",
      description: "Expert coding agent",
      system: PROMPT,
      model: gemini({ 
        model: "gemini-2.5-flash",
       }),
      tools: [
        createTool({
              name: "terminal",
              description: "Run terminal commands",
              parameters: z.object({
                command: z.string(),
              }),
              handler: async ({command},{step}) => {
                return await step ?.run("terminal",async() => {
                  const buffers = { stdout: "", stderr: "" };
                  
                  try{
                    const sandbox = await getSandbox(sandboxId);
                    
                    const result = await sandbox.commands.run(command, {
                      onStdout: (data:string)=>{
                        buffers.stdout += data;
                      },
                      onStderr: (data:string)=>{
                        buffers.stderr += data;
                      }
                    });
                    return result.stdout;
                  }catch(e){ 
                    console.error(
                      `Command failed : ${e} \nstdout: ${buffers.stdout} \nstderror: ${buffers.stderr}`,
                    );
                    return  `Command failed : ${e} \nstdout: ${buffers.stdout} \nstderror: ${buffers.stderr}`
                  }
                });
              }
        }),

        createTool({
          name : "createOrUpdateFiles",
          description: "Create or update files in Sandbox",
          parameters:z.object({
            files:z.array(z.object({
              path:z.string(),
              content:z.string()
            }),
          ),
          }),
          handler: async( {files} , {step,network} : Tool.Options<AgentState>)=>{
            const newFiles = await step ?.run("createOrUpdateFiles",async()=>{
              try{
                const updatedFiles = network.state.data.files || {};
                const sandbox = await getSandbox(sandboxId);
                for(const file of files){
                  await sandbox.files.write(file.path,file.content);
                  updatedFiles[file.path] = file.content;
                }
                return updatedFiles;
              }catch(e){
                return "Error: " + e;
              }
            });

            if(typeof newFiles === "object"){
              network.state.data.files = newFiles; 
            }
          }
        }),

        createTool({
          name: "readFiles",
          description: "Read files in Sandbox",
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async (
            { files }, { step } ) => {
            return await step?.run("readFiles", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const readFiles: { path: string; content: string }[] = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  readFiles.push({ path: file, content });
                }
                return JSON.stringify(readFiles);
              } catch (e) {
                return "Error: " + e;
              }
            });
          },
        })
      ],

      lifecycle: {
  onResponse: async ({ result, network }) => {
    const lastAssistantTextMessage = lastAssistantTextMessageContent(result);

    if (lastAssistantTextMessage && network) {
      if (lastAssistantTextMessage.includes("<task_summary>")) {
 
        const summaryMatch = lastAssistantTextMessage.match(/<task_summary>(.*?)<\/task_summary>/s);
        const cleanSummary = summaryMatch ? summaryMatch[1].trim() : lastAssistantTextMessage;
        
        network.state.data.summary = cleanSummary;
      }
    }
    return result;
  }
}
    });

    const network = createNetwork<AgentState>({
      name: "coding-agent-network",
      agents:[codeAgent],
      defaultState: state,
      maxIter: 15,
      router: async ({network})=>{
        const summary = network.state.data.summary;
        if(summary){
          return;
        }
        return codeAgent;
      }
    })
  
    const result = await network.run(event.data.value,{state});

    const fragmentTitleGenerator = createAgent({
      name: "fragement-title-generator",
      description: "fragement title generator",
      system: FRAGMENT_TITLE_PROMPT,
      model: gemini({ 
        model: "gemini-2.5-flash",
       }),
    });


    const ResponseGenerator = createAgent({
      name: "response-generator",
      description: "response generator",
      system: RESPONSE_PROMPT,
      model: gemini({ 
        model: "gemini-2.5-flash",
       }),
    });

    const {output : fragmentTitleOp} = await fragmentTitleGenerator.run(result.state.data.summary);
    const {output: responseOp } = await ResponseGenerator.run(result.state.data.summary);

    const generateFragmentTitle = () => {
      if(fragmentTitleOp[0].type!= "text"){
        return "Fragment";
      }

      if(Array.isArray(fragmentTitleOp[0].content)){
        return fragmentTitleOp[0].content.map((txt)=>txt).join("")
      }else{
        return fragmentTitleOp[0].content;
      }
    }

    const generateResponse = () => {
      if(responseOp[0].type!= "text"){
        return "Here you go";
      }

      if(Array.isArray(responseOp[0].content)){
        return responseOp[0].content.map((txt)=>txt).join("")
      }else{
        return responseOp[0].content;
      }
    }

    const isError = !result.state.data.summary ||
    Object.keys(result.state.data.files || {}).length === 0;

    const sandboxurl = await step.run('get-sandbox-url',async()=>{
      const sandbox = await getSandbox(sandboxId);
      const host =  sandbox.getHost(3000);
      return `https://${host}`;
    })

    await step.run("save-result",async()=>{

      if(isError){
        return await prisma.message.create({
          data:{
          projectId: event.data.projectId,
          content: "Something went wrong!",
          role:"ASSISTANT",
          type:"ERROR",
        },
        })
      }

      return await prisma.message.create({
        data:{
        projectId: event.data.projectId,  
        content: generateResponse(),
        role:"ASSISTANT",
        type:"RESULT",
        fragment: {
        create:{
          sandboxUrl: sandboxurl,
          title:"Fragment",
          files: result.state.data.files,
        },
      },
      }
      })
    });

    return {
      url : sandboxurl,
      title: generateFragmentTitle(),
      files: result.state.data.files,
      summary: result.state.data.summary,
      };
  },
);
