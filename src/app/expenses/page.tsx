"use server";

import React from "react";
import { prisma } from "~/lib/prisma";
import UserExpenses from "~/components/UserExpenses/UserExpenses";

const Expenses = async () => {
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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex w-full max-w-[500px] flex-col justify-center gap-8 px-4 py-16">
        <h1 className="text-center text-[2rem] font-bold sm:text-[3rem]">
          Weekly expenses
        </h1>
        <UserExpenses users={usersWithSerializablePrices} />
      </div>
    </main>
  );
};

export default Expenses;
