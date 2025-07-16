import { Fragment, MessageRole, MessageType } from "@prisma/client"
import {Card} from "@/components/ui/card";
import { cn } from "@/inngest/lib/utils";
import {format} from "date-fns";
import Image from "next/image";
import {ChevronRightIcon, Code2Icon } from "lucide-react";

interface UserMessageProps {
    content: string
}

const UserMessage = ({content}:UserMessageProps) => {
    return (
        <div className="flex justify-end pb-4 pr-2 pl-10">
            <Card className="rounded-md bg-muted p-2 shadow-none border-none max-w-[50%] break-words">
                {content} 
            </Card>
        </div>
    ) 
}

interface AssistantMessageProps{
    content: string
    fragment: Fragment | null
    createdAt: Date
    isActiveFragment: boolean
    onFragmentClick: (fragment: Fragment) => void
    type: MessageType;
}

interface FragmentCardProps{
    fragment: Fragment
    isActiveFragment: boolean
    onFragmentClick: (fragment: Fragment) => void
}

const FragmentCard = ({fragment, isActiveFragment, onFragmentClick}:FragmentCardProps) => {
    return (
          <button className = {cn(
            "flex items-start text-start gap-2 border rounded-lg bg-muted  w-fit p-3 hover:bg-secondary transition-colors",
            isActiveFragment && "bg-primary text-primary-foreground border-primary hover:bg-primary"
          )}
          
          onClick={() => onFragmentClick(fragment)}>

          <Code2Icon className="size-4 mt-0.5"/>
            <div className="flex flex-col flex-1">
                <span className = "text-sm font-bold line-clamp-1">
                    {fragment.title}
                </span>
                <span className="text-sb"> Preview </span>
            </div>
            <div className = "flex item-center justify-center mt-0.5">
                <ChevronRightIcon className = "size-4"/>
            </div>

          </button>
    )};


const AssistantMessage=({content, fragment, createdAt, isActiveFragment, onFragmentClick, type}:AssistantMessageProps) => {
    return (
        <div className={cn ("flex flex-col group px-2 pb-4", type === "ERROR" && "text-red-700 dark:text-red-500")}>
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image
                    src="/flow.svg"
                    alt="flow"
                    width={20}
                    height={20}
                    className="shrink-0"
                />
                <span className="text-start text- font-bold">Flow</span>
                 <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    {format (createdAt,"HH:mm 'on' MMM dd, yyyy " )}
                 </span>
            </div>
            <div className="PL-8.5 flex flex-col gap-y-4">
                <span>
                    {content}
                </span>    
                {fragment && type === "RESULT" && (
                   <FragmentCard 
                    fragment = {fragment}
                    isActiveFragment={isActiveFragment}
                    onFragmentClick={onFragmentClick}
                    />
                )}
             </div>
        </div>
    )
}

interface MessageCardProps {
    message: string
    content:string
    role: MessageRole
    fragments: Fragment | null
    createdAt: Date
    isActiveFragment: boolean
    onFragmentClick: (fragment: Fragment) => void
    type: MessageType;
};

export const MessageCard = ({
    message,
    content,
    role,
    fragments,
    createdAt,
    isActiveFragment,
    onFragmentClick,
    type,
}: MessageCardProps) => {
    if(role === "ASSISTANT"){
        return (
        <AssistantMessage
            content = {content}
            fragment={fragments}
            createdAt={createdAt}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
            type={type}
        />
        )
       }

    return (
        <UserMessage
        content = {content}
        />
    )
};
