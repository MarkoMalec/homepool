"use server";

import React from "react";
import { prisma } from "~/lib/prisma";
import { startOfWeek } from "date-fns";
import RemoveHistoryList from "./RemoveHistoryList";

const lastMonday = startOfWeek(new Date(), { weekStartsOn: 1 });

const RemoveHistory = async () => {
  const historyItems = await prisma.deletionHistory.findMany({
    where: {
      deletedAt: {
        gte: lastMonday,
      },
    },
    include: {
      deletedBy: true,
    },
  });

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold">Remove history</h2>
      <small>Items shown here are the ones that got removed from the "Stuff needed" list.</small>
      <RemoveHistoryList items={historyItems} />
    </div>
  );
};

export default RemoveHistory;
