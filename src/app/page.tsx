"use client"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query";
import { useState} from "react"
import {Input} from "@/components/ui/input"
import {toast} from "sonner"
const Page= ()=>{
  const[value,setValue]=useState("")
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess:()=>{
      toast.success("Bg jobs start!");
    }
  }));
  return (
   <div className="p-4 max-w-7xl mx-auto">
    <Input value={value} onChange={(e)=>setValue(e.target.value)}/>
    <Button onClick={()=>invoke.mutate({value : value})}>
      Invoke the inngest function.
    </Button>
    
   </div>
  )
}

export default Page;