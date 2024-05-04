"use client";

import React from "react";
import Link from "next/link";
import { ThemeSwitcher } from "~/components/ui/theme-switcher";
import Menu from "./Menu";
import UserHeader from "./UserMenuIsland/UserHeader";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b py-3 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-[4rem]">
              Home<span className="text-[hsl(280,100%,70%)]">Pool</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block flex items-center gap-3">
            <UserHeader includeExpense={false} />
          </div>
          <ThemeSwitcher />
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
