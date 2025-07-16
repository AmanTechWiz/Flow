import { baseProcedure,createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { prisma } from "@/inngest/lib/db";
import { inngest } from "@/inngest/client";
import {generateSlug} from "random-word-slugs"
import { TRPCError } from "@trpc/server";


export const projectsRouter = createTRPCRouter({
    getOne: baseProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Project ID is required" }),
      }),
    )
    .query(async ({input}) => {
            const existingprojects = await prisma.project.findUnique({
               where:{
                id : input.id,
               }
            });

            if(!existingprojects){
                throw new TRPCError({ code : "NOT_FOUND", message: "Project Not found!"});
            }

            return existingprojects;
        }),

    create:baseProcedure
    .input(
      z.object({
        value: z.string()
        .min(1,{message:"Prompt is required"})
        .max(10000,{message:"Prompt is too long"}),
      }),
    )
    .mutation(async({input})=>{
        const CreatedProject = await prisma.project.create({
            data: {
                name: generateSlug(2,{
                    format : "kebab",
                }),
            message: {
                create: {
                  content: input.value,
                  role : "USER",
                  type : "RESULT",
                },
              }
            }
        });

        await inngest.send({
          name:"code-agent/run",
          data:{
            value : input.value,
            projectId: CreatedProject.id,
          }
        })

        return CreatedProject;
    }),
});