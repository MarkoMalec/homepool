"use client";

import React from "react";
import { useUserContext } from "~/context/userContext";
import useSumPricesCurrentWeek from "~/lib/hooks/useSumPricesCurrentWeek";
import useSessionUserBalance from "~/lib/hooks/useSessionUserBalance";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Badge } from "~/components/ui/badge";
import { LucideCircleDollarSign } from "lucide-react";
import { useUsersContext } from "~/context/usersContext";

const UserHeader = () => {
  const { user } = useUserContext();
  const { users } = useUsersContext();

  if (!user || !users) {
    return <>Loading...</>;
  }
  const totalWeekExpenses = useSumPricesCurrentWeek(user.checkedItems);
  const userBalance = useSessionUserBalance(users)
  
  console.log(userBalance);

  return (
    <div className="flex gap-5">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge className={`gap-2 ${userBalance?.status}`}>
              <LucideCircleDollarSign size={20} />
              {userBalance?.balance}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{userBalance?.status === 'bg-red-700' ? `You are €${userBalance.balance} behind.` : 'You are ahead of everyone.'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default UserHeader;
