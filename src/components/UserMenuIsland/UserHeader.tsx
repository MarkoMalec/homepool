"use client";

import React from "react";
import { useUserContext } from "~/context/userContext";
import useSumPricesCurrentWeek from "~/lib/hooks/useSumPricesCurrentWeek";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Badge } from "~/components/ui/badge";
import { LucideCircleDollarSign } from "lucide-react";

const UserHeader = () => {
  const { user } = useUserContext();
  if (!user) {
    return <>Loading...</>;
  }
  const totalWeekExpenses = useSumPricesCurrentWeek(user.checkedItems);

  return (
    <div className="flex gap-5">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge className="gap-2">
              <LucideCircleDollarSign size={20} />
              {totalWeekExpenses}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Your weekly expenses.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default UserHeader;
