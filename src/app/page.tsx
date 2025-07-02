"use client"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
const Page= ()=>{
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess:()=>{
      toast.success("Bg jobs start!");
    }
  }));
  return (
   <div className="p-4 max-w-7xl mx-auto">
    <Button onClick={()=>invoke.mutate({text:"Aman"})}>
      Invoke the inngest function.
    </Button>
    
   </div>
  )
}

export default Page;