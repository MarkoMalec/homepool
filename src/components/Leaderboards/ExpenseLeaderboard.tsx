"use client";

import React from "react";
import { useUsersContext } from "~/context/usersContext";
import useUserTotalSpendings from "~/lib/hooks/useUserTotalSpendings";

import { Badge } from "../ui/badge";

type Props = {
  fontSize?: string;
};

const ExpenseLeaderboard = ({ fontSize }: Props) => {
  const { users } = useUsersContext();

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-1">
      {users.map((user) => {
        const totalSpending = useUserTotalSpendings(user.checkedItems);
        return (
          <div
            key={user.id}
            className={`font-semibold ${fontSize ? fontSize : ""}`}
          >
            {user.name} <Badge>€{totalSpending}</Badge>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseLeaderboard;
