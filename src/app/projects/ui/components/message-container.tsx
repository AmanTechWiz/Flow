import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message.form";
import { useEffect, useRef } from "react";
import { Fragment } from "@prisma/client";
import { set } from "date-fns";
import { MessageLoading } from "./message-loading";

interface Props{
    projectId : string;
    activeFragment : Fragment | null;
    setActiveFragment : (fragment : Fragment | null) => void
}

export const MessagesContainer = ({projectId , activeFragment , setActiveFragment}:Props) => {
    const trpc = useTRPC();

    const {data : messages} = useSuspenseQuery(trpc.messages.getMany.
        queryOptions({projectId : projectId}
            ,{
                // todo temp live message
                refetchInterval:6000,
            }
        )); 

    const bottomRef = useRef<HTMLDivElement>(null);
    
    // useEffect(()=>{
    //     const lastAssistantMessage = messages.findLast((message)=> message.role === "ASSISTANT");
    //     if(lastAssistantMessage ){
    //         setActiveFragment(lastAssistantMessage.fragment);
    //     }
    // },[messages, setActiveFragment]);

    useEffect(()=>{
            bottomRef.current?.scrollIntoView({behavior : "smooth"});
    },[messages.length]);

    const lastMessage = messages[messages.length-1];
    const isLastMessageUser = lastMessage?.role === "USER";

    return (
   <div>     
        <div className="flex flex-col h-full">
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
                        isActiveFragment={activeFragment?.id === message.fragment?.id}
                        onFragmentClick={() => setActiveFragment(message.fragment)}
                        type={message.type}
                        />
                    ))}
                    {isLastMessageUser && <MessageLoading/>}
                    <div ref={bottomRef}/>
                </div>
            <div className="relative p-3 pt-1">
                <div className = "absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent-to-background/70 pointer-events-none" />     
                {/* <MessageForm projectId={projectId} /> */}
            </div>
        </div>
    </div>
 </div>
);    
}