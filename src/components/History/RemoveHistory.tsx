"use server";

import React from "react";
import { prisma } from "~/lib/prisma";
import { startOfMonth } from "date-fns";
import RemoveHistoryList from "./RemoveHistoryList";

const firstOfMonth = startOfMonth(new Date());

const RemoveHistory = async () => {
  const historyItems = await prisma.deletionHistory.findMany({
    where: {
      deletedAt: {
        gte: firstOfMonth,
      },
    },
    include: {
      deletedBy: true,
    },
  });

  return (
    <div className="mx-auto max-w-[500px] py-10">
      <h2 className="text-2xl font-bold">Remove history</h2>
      <small>
        Items shown here are the ones that got removed from the "Stuff needed"
        list.
      </small>
      <RemoveHistoryList items={historyItems.reverse()} />
    </div>
  );
};

export default RemoveHistory;
