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

    useEffect(()=>{
            bottomRef.current?.scrollIntoView({behavior : "smooth"});
    },[messages.length]);

    const lastMessage = messages[messages.length-1];
    const isLastMessageUser = lastMessage?.role === "USER";

    return (
        <div className="flex flex-col h-full relative">
            {/* Messages area with scroll */}
            <div className="flex-1 overflow-y-auto p-3 pb-0">
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
                {/* Add some padding at the bottom so last message doesn't get hidden behind gradient */}
                <div className="h-4" />
            </div>
            
            {/* Gradient overlay - positioned above the form */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-10" />
        
           
        </div>
    );    
}