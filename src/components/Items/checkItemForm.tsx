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
import { DrawerClose } from "../ui/drawer";
import { Input } from "~/components/ui/input";
import { Loader2Icon } from "lucide-react";

type Props = {
  itemId: string;
};

const formSchema = z.object({
  price: z.string(),
  userId: z.string(),
  itemId: z.string(),
});

export function CheckItemForm({ itemId }: Props) {
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
      userId: user?.id,
      itemId: itemId,
    },
  });

  const { isMutating, doFetch } = useFetch();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    doFetch(
      "/api/item/check",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: values.itemId,
          userId: user?.id,
          price: parseFloat(values.price),
        }),
      },

      () => {
        toast.success("Item purchased!");
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="69.00" {...field} />
              </FormControl>
              <FormDescription>
                How much did you pay for the item?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DrawerClose asChild>
          <Button className="w-full" type="submit">
            {isMutating ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </DrawerClose>
      </form>
    </Form>
  );
}
