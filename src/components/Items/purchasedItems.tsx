"use server";

import React from "react";
import { prisma } from "~/lib/prisma";
import { startOfMonth } from "date-fns";
import PurchasedItemsList from "~/components/Items/purchasedItemsList";

const firstOfMonth = startOfMonth(new Date());

const PurchasedItems = async () => {
  const items = await prisma.checkedItem.findMany({
    where: {
      checkedAt: {
        gte: firstOfMonth,
      },
    },
    include: {
      checkedBy: true,
    },
  });

  const serializableItems = items.map((item) => ({
    ...item,
    price: item.price.toString(),
  }));

  return (
    <div className="py-10">
      <h2 className="mb-5 text-2xl font-bold">This month</h2>
      <PurchasedItemsList items={serializableItems} />
    </div>
  );
};

export default PurchasedItems;
