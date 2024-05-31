"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUserContext } from "~/context/userContext";
import { useFetch } from "~/lib/hooks/useFetch";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must contain at least 2 characters.",
  }),
});

export function AddItemForm() {
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isMutating, doFetch } = useFetch();

  async function onSubmit(values: z.infer<typeof formSchema>) {

    form.reset({ name: '' });
    
    doFetch(
      "/api/item/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, user }),
      },
      () => {
        toast.success(`${values.name} has been added to the list.`);
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Toilet paper..." {...field} />
              </FormControl>
              <FormDescription>Name of the item you want to add to list.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button asChild>
          <Button className="w-full" type="submit">
            {isMutating ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </Button>
      </form>
    </Form>
  );
}
