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
  DrawerClose
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { AddItemForm } from "./addItemForm";
import { ListPlusIcon } from "lucide-react";

const AddItemDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="gap-2" asChild>
        <Button>
          <ListPlusIcon /> Add item
        </Button>
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
