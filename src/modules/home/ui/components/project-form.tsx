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

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Message is required" })
    .max(20000, { message: "Message is too long" }),
});

export const ProjectForm = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {openSignIn} = useClerk();

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

        <div className="mt-6" />

        <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl">
          {PROJECT_TEMPLATES.map((template) => (
            <Button
              key={template.title}
              variant="outline"
              size="sm"
              className="bg-white/10 dark:bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition"
              onClick={() => {
                onSelect(template.prompt);
              }}
            >
              {template.emoji} {template.title}
            </Button>
          ))}
        </div>
      </section>
    </Form>
  );
};
