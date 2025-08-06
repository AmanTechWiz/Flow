"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaaAutoSize from "react-textarea-autosize";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/inngest/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { PROJECT_TEMPLATES } from "@/app/(home)/constants";
import { useClerk } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Message is required" })
    .max(20000, { message: "Message is too long" }),
});

interface ProjectFormProps {
  showTemplates: boolean;
  setShowTemplates: (show: boolean) => void;
}

export const ProjectForm = ({ showTemplates, setShowTemplates }: ProjectFormProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { openSignIn } = useClerk();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(
          trpc.projects.getMany.queryOptions()
        );
        router.push(`/projects/${data.id}`);
      },
      onError: (error) => {
        console.log('Full error:', error);
        console.log('Error data:', error.data);
        console.log('Error code:', error.data?.code);

        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("Please sign in");
          openSignIn();
        } else {
          toast.error(error.message || "Something went wrong");
        }
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value,
    });
  };

  const onSelect = (value: string) => {
    form.setValue("value", value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const [isFocused, setIsFocused] = useState(false);
  const isPending = createProject.isPending;
  const isDisabled = isPending || !form.formState.isValid;

  return (
    <Form {...form}>
      <section className="space-y-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative rounded-xl border border-white/20 bg-white/20 dark:bg-white/2 backdrop-blur-md p-4 pt-1 shadow-md transition-all",
            isFocused && "shadow-lg"
          )}
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <TextareaaAutoSize
                {...field}
                disabled={isPending}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={2}
                maxRows={8}
                className="pt-4 resize-none border-none w-full outline-none bg-transparent 
                  text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                placeholder="What would you like to build?"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)(e);
                  }
                }}
              />
            )}
          />
          <div className="flex gap-x-2 items-end justify-between pt-2">
            <div className="text-[10px] text-muted-foreground font-sans">
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1
                        rounded border bg-muted px-1.5 font-mono text-[12px] font-medium text-muted-foreground">
                <span>&#8984;</span> + Enter
              </kbd>
              &nbsp; to submit
            </div>
            <Button
              disabled={isDisabled}
              className={cn(
                "size-9 !rounded-full",
                isDisabled && "bg-muted-foreground border"
              )}
            >
              {isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <ArrowUpIcon />
              )}
            </Button>
          </div>
        </form>

        <Button
          onClick={() => setShowTemplates(!showTemplates)}
          className={cn(
            "mx-auto block px-6 py-2 rounded-full text-white font-medium text-sm backdrop-blur-xl border border-white/20 bg-white/10 hover:bg-white/20",
            "transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
          )}
        >
          {showTemplates ? "Hide Suggested Templates" : "Suggested Templates"}
        </Button>

        <div className="mt-6" />

        <AnimatePresence>
          {showTemplates && (
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-white/5 blur-3xl opacity-30 z-[-1]" />
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, scale: 0.97, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6 mb-12 mx-auto max-w-3xl p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_4px_30px_rgba(255,255,255,0.1)] ring-1 ring-white/10 flex flex-wrap justify-center gap-3"
              >
                {PROJECT_TEMPLATES.map((template) => (
                  <motion.button
                    key={template.title}
                    onClick={() => {
                      onSelect(template.prompt);
                      setShowTemplates(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-sm hover:bg-white/20 transition-all duration-200"
                  >
                    {template.emoji} {template.title}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </Form>
  );
};