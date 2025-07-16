import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message.form";
import { useEffect, useRef } from "react";

interface Props{
    projectId : string;
}

export const MessagesContainer = ({projectId}:Props) => {
    const trpc = useTRPC();
    const {data : messages} = useSuspenseQuery(trpc.messages.getMany.
        queryOptions({projectId : projectId})); 

    const bottomRef = useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
        const lastAssistantMessage = messages.findLast((message)=> message.role === "ASSISTANT");
        if(lastAssistantMessage){
            //todo
        }
    },[messages]);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView();
    },[messages.length]);

    return (
   <div>     
        <div className="flex flex-col h-screen">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-3">
                    {messages.map((message) => (
                        <MessageCard
                        key={message.id}
                        message={message.content}
                        content={message.content}
                        role={message.role}
                        fragments={message.fragment}
                        createdAt={message.createdAt}
                        isActiveFragment={false}
                        onFragmentClick={() => {}}
                        type={message.type}
                        />
                    ))}
                    <div ref={bottomRef}/>
                </div>
            <div className="relative p-3 pt-1">
                <div className = "absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent-to-background/70 pointer-events-none" />     
                <MessageForm projectId={projectId} />
            </div>
        </div>
    </div>
 </div>
);    
}