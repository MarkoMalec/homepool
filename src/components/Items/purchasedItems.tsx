"use server";

import React from "react";
import { prisma } from "~/lib/prisma";
import { startOfWeek } from "date-fns";
import PurchasedItemsList from "~/components/Items/purchasedItemsList";

const lastMonday = startOfWeek(new Date(), { weekStartsOn: 1 });

const PurchasedItems = async () => {
  const items = await prisma.checkedItem.findMany({
    where: {
      checkedAt: {
        gte: lastMonday,
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
      <h2 className="text-2xl font-bold mb-5">Previously purchased</h2>
      <PurchasedItemsList items={serializableItems} />
    </div>
  );
};

export default PurchasedItems;
