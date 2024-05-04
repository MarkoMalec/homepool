"use client";

import React from "react";
import UserHeader from "./UserMenuIsland/UserHeader";
import ExpenseLeaderboard from "./Leaderboards/ExpenseLeaderboard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { MenuIcon, HomeIcon, LucideSortDesc, PieChartIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

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
          <UserHeader includeExpense />
          <Separator />
        </SheetHeader>
        <div className="my-5">
          <h3 className="mb-3 text-xl font-bold">Menu</h3>
          <div className="flex flex-col space-y-2">
            <SheetClose asChild>
              <Link
                className="flex gap-2 rounded p-2 hover:bg-accent"
                href="/"
              >
                <HomeIcon />
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                className="flex gap-2 rounded p-2 hover:bg-accent"
                href="/expenses"
              >
                <LucideSortDesc />
                Expenses
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                className="flex gap-2 rounded p-2 hover:bg-accent"
                href="/chart"
              >
                <PieChartIcon />
                Chart
              </Link>
            </SheetClose>
          </div>
        </div>
        <Separator />
        <div className="my-5">
          <h3 className="mb-3 text-xl font-bold">Users</h3>
          <div className="pl-2">
            <ExpenseLeaderboard fontSize="text-sm" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
