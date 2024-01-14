"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import UserHeader from "./UserMenuIsland/UserHeader";

const Menu = () => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-9 w-9 p-0">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <UserHeader />
        </SheetHeader>
        <div className="mt-10 flex flex-col space-y-5">
          <SheetClose asChild>
            <Link href="/">Home</Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/expenses">Expenses</Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
