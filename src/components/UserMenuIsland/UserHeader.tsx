"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useUserContext } from "~/context/userContext";
import useSessionUserBalance from "~/lib/hooks/useSessionUserBalance";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";

import { Badge } from "~/components/ui/badge";
import { EuroIcon, UserCircle2Icon } from "lucide-react";
import { useUsersContext } from "~/context/usersContext";

type Props = {
  includeExpense?: true | false;
}

const UserHeader = ({ includeExpense }: Props) => {
  const { user } = useUserContext();
  const { users } = useUsersContext();

  if (!user || !users) {
    return <>Loading...</>;
  }

  const userBalance = useSessionUserBalance(users);

  return (
    <>
      <div className="flex gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <UserCircle2Icon size={40} />
              <h3 className="text-lg font-bold">{user.name}</h3>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button className="w-full" variant="destructive" onClick={() => signOut()}>
              Sign out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        {includeExpense ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge className={`gap-2 ${userBalance?.status}`}>
                <EuroIcon size={20} />
                {userBalance?.balance}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {userBalance?.status === "bg-red-700"
                  ? `You are €${userBalance.balance} behind.`
                  : "You are ahead of everyone."}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        ) : null}
      </div>
    </>
  );
};

export default UserHeader;
