import { baseProcedure,createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { prisma } from "@/inngest/lib/db";
import { inngest } from "@/inngest/client";


export const messagesRouter = createTRPCRouter({
    getMany: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1,{message:"Project ID is required"}),
      }),
    )
    .query(async ({ input }) => {
            const messages = await prisma.message.findMany({
                where: {
                    projectId: input.projectId,
                },
                include:{
                  fragment:true
                },
                orderBy:{
                    updatedAt : "asc",
                },
            });
            return messages;
        }),

    create:baseProcedure
    .input(
      z.object({
        value: z.string()
        .min(1,{message:"Message is required"})
        .max(10000,{message:"Message is too long"}),
        projectId: z.string().min(1,{message:"Project ID is required"}),
      }),
    )
    .mutation(async({input})=>{
        const CreatedMessage = await prisma.message.create({
            data: {
                projectId : input.projectId,
                content: input.value,
                role : "USER",
                type : "RESULT"},  
        });

        await inngest.send({
          name:"code-agent/run",
          data:{
            value : input.value,
            projectId : input.projectId
          }
        })

        return CreatedMessage;
    }),
});