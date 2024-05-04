import React from "react";
import TotalDiffChart from "~/components/charts/TotalDiffChart";
import TotalsDiffChart from "~/components/charts/TotalsDiffChart";
import { prisma } from "~/lib/prisma";

const ChartPage = async () => {
  const users = await prisma.user.findMany({
    include: {
      checkedItems: true,
    },
  });
  const usersWithSerializablePrices = users.map((user) => ({
    ...user,
    checkedItems: user.checkedItems.map((item) => ({
      ...item,
      price: item.price.toString(),
    })),
  }));

  return (
    <main className="mt-12">
        <TotalsDiffChart users={usersWithSerializablePrices} />
    </main>
  );
};

export default ChartPage;
