"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { AddItemForm } from "./addItemForm";
import { ListPlusIcon, AppleIcon, PlusCircleIcon } from "lucide-react";

type Props = {
  sticky?: boolean;
};

const AddItemDialog = ({ sticky }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="gap-2" asChild>
        {sticky ? (
          <Button className="h-50 w-50 fixed bottom-3 right-3 p-2">
            <div className="relative">
              <AppleIcon size={35} />
              <PlusCircleIcon
                className="absolute bottom-[-3px] right-[-4px] bg-foreground"
                size={20}
              />
            </div>
          </Button>
        ) : (
          <Button>
            <>
              <ListPlusIcon />
              Add item
            </>
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left">
            <DrawerTitle>Add new item</DrawerTitle>
            <DrawerDescription>Add new item to the list!</DrawerDescription>
          </DrawerHeader>
          <AddItemForm />
          <DrawerFooter className="pt-0">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddItemDialog;
