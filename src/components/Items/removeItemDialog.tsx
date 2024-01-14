"use client";

import { useFetch } from "~/lib/hooks/useFetch";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useUserContext } from "~/context/userContext";

import { Button } from "~/components/ui/button";
import { Trash2Icon } from "lucide-react";

const RemoveItemDialog = ({
  itemId,
}: {
  itemId: string;
}) => {
  const { isMutating, doFetch } = useFetch();
  const { user } = useUserContext();

  const onDelete = async (itemId: string, userId?: string) => {
    doFetch(
      "/api/item/remove",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
          userId: userId,
        }),
      },

      () => {
        toast.success("Item removed!");
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="line p-0 px-2">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove item from the list?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. History will be shown in the list
            below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(itemId, user?.id)}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveItemDialog;
