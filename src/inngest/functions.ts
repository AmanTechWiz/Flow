import { inngest } from "./client";
import { Agent, gemini, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "[JUST NEED CODE , NOTHING ELSE , NO EXPLAINATION , NO COMMENTS]You are an expert nextjs developer. You write readable , maintainable code. You write simple Next.js and React snippets",
      model: gemini({ model: "gemini-2.5-pro"}),
    });
  
    const { output } = await codeAgent.run(
                `Write the following snippet : ${event.data.value}`,
                );
    console.log(output);

    return { output };
  },
);
