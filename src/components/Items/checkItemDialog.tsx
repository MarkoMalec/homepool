"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { CheckItemForm } from "~/components/Items/checkItemForm";

import { Button } from "~/components/ui/button";
import { LucideClipboardCheck } from "lucide-react";

const CheckItemDialog = ({ itemId }: { itemId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="gap-2" asChild>
        <Button className="p-0 px-2 shadow-lg" variant="outline">
          <LucideClipboardCheck color="green" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left">
            <DrawerTitle>Item Purchased?</DrawerTitle>
            <DrawerDescription>
              If you purchased the item, enter the price below.
            </DrawerDescription>
          </DrawerHeader>
          <CheckItemForm itemId={itemId} />
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

export default CheckItemDialog;
