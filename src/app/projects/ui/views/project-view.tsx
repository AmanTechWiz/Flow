"use client"

import { MessagesContainer } from "@/app/projects/ui/components/message-container";

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

    return ( <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
           <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
            <Suspense fallback={<p>Loading chat...</p>}>
             <MessagesContainer projectId={projectId}/>
             </Suspense>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
        defaultSize={65} minSize={50} >
            TODO : preview
        </ResizablePanel>
        </ResizablePanelGroup>
    </div>    
    );
};