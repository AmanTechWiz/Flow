"use client"

import { MessagesContainer } from "@/app/projects/ui/components/message-container";
import { MessageForm } from "@/app/projects/ui/components/message-form";
import { Fragment } from "@prisma/client";
import { useState } from "react";
import { ProjectHeader } from "@/app/projects/ui/components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { FileExplorer } from "@/components/ui/file-explorer";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Code2, Crown } from "lucide-react";


import { Suspense } from "react";
import { Laptop } from "lucide-react";
import Link from "next/link";
import { UserControl } from "@/components/ui/user-control";
import { ClerkProvider } from "@clerk/nextjs";


interface Props{
    projectId : string
}

export const ProjectView = ({projectId}:Props)=>{

   const[tabState, setTabState] = useState<"preview"|"code">("preview");

    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

    return ( 
        <ClerkProvider>
             <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel 
                    defaultSize={30} 
                    minSize={30}
                    className="flex flex-col">
                    
                    {/* Header - Fixed at top */}
                    <Suspense fallback={<div className="shrink-0 p-2 border-b">Loading project...</div>}>
                        <div className="shrink-0">
                            <ProjectHeader projectId={projectId}/>
                        </div>
                    </Suspense>    
                    
                    {/* Messages - Scrollable middle section */}
                    <div className="flex-1 min-h-0 flex flex-col">
                        <Suspense fallback={<div className="flex-1 p-3">Loading chat...</div>}>
                            <div className="flex-1 overflow-y-auto">
                                <MessagesContainer 
                                    projectId={projectId}
                                    activeFragment={activeFragment}
                                    setActiveFragment={setActiveFragment}
                                />
                            </div>
                        </Suspense>
                        
                  
                        <div className="shrink-0 p-3 border-t bg-background">
                            <MessageForm projectId={projectId} />
                        </div>
                    </div>
                    
                </ResizablePanel>
                
                <ResizableHandle/>
                
                <ResizablePanel defaultSize={65} minSize={50}>

                <Tabs
                    className="h-full"
                    defaultValue="preview"
                    value={tabState}
                    onValueChange={(value)=>setTabState(value as "preview"|"code")}
                >
                      <div className="w-full flex items-center p-2 border-b gap-x-2">
                                <TabsList className="h-8 p=0 border rounded-md">
                                    <TabsTrigger value="preview" className="rounded-md">
                                        <Laptop/> <span> Preview </span> 
                                    </TabsTrigger>
                                    <TabsTrigger value="code" className="rounded-md">
                                        <Code2/> <span> Code </span>
                                    </TabsTrigger>
                                </TabsList>
                               <div className="ml-auto flex items-center gap-x-2">
                                    <Button asChild size="sm" variant="default">
                                        <Link href="/pricing"> 
                                            <Crown size={16}/> Upgrade
                                        </Link>
                                    </Button>
                                     <UserControl/> 
                                </div>
                                </div>

                                <TabsContent value="preview">
                                          {activeFragment && <FragmentWeb data={activeFragment}/>}
                                </TabsContent>
                                <TabsContent value="code" className="min-h-0">
                                    {activeFragment?.files && (
                                        <FileExplorer files={activeFragment.files as {[path:string]:string}}/>
                                    )}
                                </TabsContent>
                                   
                </Tabs>             
               </ResizablePanel>
            </ResizablePanelGroup>
        </div>    
        </ClerkProvider>
       
    );
};