"use client"

import { MessagesContainer } from "@/app/projects/ui/components/message-container";
import { MessageForm } from "@/app/projects/ui/components/message.form";
import { Fragment } from "@prisma/client";
import { useState } from "react";
import { ProjectHeader } from "@/app/projects/ui/components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Suspense } from "react";

interface Props{
    projectId : string
}

export const ProjectView = ({projectId}:Props)=>{

    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

    return ( 
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel 
                    defaultSize={35} 
                    minSize={20}
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
                
                <ResizableHandle />
                
                <ResizablePanel defaultSize={65} minSize={50}>

                {activeFragment && <FragmentWeb data={activeFragment}/>}

                </ResizablePanel>
            </ResizablePanelGroup>
        </div>    
    );
};