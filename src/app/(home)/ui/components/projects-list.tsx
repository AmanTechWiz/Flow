"use client"

import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { Playfair_Display } from "next/font/google"
import Aurora from "../../../projects/ui/components/aurora-background"
import { use } from "react"

// Font setup
const playfairBold = Playfair_Display({
  subsets: ["latin-ext"],
  variable: "--font-playfair-bold",
  display: "swap",
  weight: ["700"],
});

export const ProjectList = () => {
  const trpc = useTRPC();
  const {user} = useUser();

  const {data: projects} = useQuery({
    ...trpc.projects.getMany.queryOptions(),
    enabled: !!user
  })

  if(!user) return null;

  return (
    <div className="relative w-full rounded-xl">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 rounded-xl overflow-hidden">
        <Aurora
          colorStops={["#1a0d2e", "#2d1b3d", "#E8B4B8"]}
          blend={1.2}
          amplitude={6}
          speed={0.7}
        />
      </div>

      {/* Content container */}
      <div
        className="relative z-10 w-full p-8 
                   border border-white/20 
                   bg-white/10 dark:bg-black/20 
                   backdrop-blur-xl 
                   shadow-xl 
                   rounded-xl 
                   flex-col sm:gap-y-4 
                   overflow-hidden"
      >
        <h2
          className={`${playfairBold.className} text-2xl font-bold text-gray-900 dark:text-white text-center mb-6`}
        >
          {user?.firstName}&apos;s creations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {projects?.length === 0 && (
            <div className="col-span-full text-center">
              <p className="text-sm text-muted-foreground">
                No projects created yet.
              </p>
            </div>
          )}

          {projects?.slice(0, 6).map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="block">
              <Button
                variant="outline"
                className="font-normal h-auto justify-start w-full text-start p-4 
                           border-white/20 
                           bg-white/10 dark:bg-white/10 
                           backdrop-blur-md 
                           hover:bg-white/20 dark:hover:bg-white/20 
                           transition-all duration-200 ease-in-out 
                           cursor-pointer 
                           rounded-lg"
              >
                <div className="flex items-center gap-x-4">
                  <Image
                    src="/flow.svg"
                    alt="flow"
                    width={20}
                    height={20}
                    className="object-contain dark:invert"
                  />
                  <div className="flex flex-col">
                    <h3 className="truncate font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-zinc-400">
                      {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
