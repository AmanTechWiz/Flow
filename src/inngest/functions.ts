import { inngest } from "./client";
import { openai, createAgent , createTool, createNetwork, type Tool, Agent} from "@inngest/agent-kit";
import { Sandbox } from 'e2b'
import { getSandbox } from "./utils";
import { z } from "zod";
import { PROMPT } from "@/prompt";
import { lastAssistantTextMessageContent } from "./utils";
import { prisma } from "@/lib/db";

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
     })


    const codeAgent = createAgent<AgentState>({
      name: "code-agent",
      description: "Expert coding agent",
      system: PROMPT,
      model: openai({ model: "gpt-4o-mini" }),
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
                const readFiles = [];
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

      lifecycle:{
        onResponse: async ({result,network})=>{
          const lastAssistantTextMessage = lastAssistantTextMessageContent(result);

          if(lastAssistantTextMessage && network){
            if(lastAssistantTextMessage.includes("<task_summary>")){
              network.state.data.summary = lastAssistantTextMessage;
            }
          }
          return result;
        }
      }
    });

    const network = createNetwork<AgentState>({
      name: "coding-agent-network",
      agents:[codeAgent],
      maxIter: 15,
      router: async ({network})=>{
        const summary = network.state.data.summary;
        if(summary){
          return;
        }
        return codeAgent;
      }
    })
  
    const result = await network.run(event.data.value);

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
          content: "Something went wrong!",
          role:"ASSISTANT",
          type:"ERROR",
        },
        })
      }

      return await prisma.message.create({
        data:{
        content: result.state.data.summary,
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
      title: "Fragment",
      files: result.state.data.files,
      summary: result.state.data.summary,
      };
  },
);
