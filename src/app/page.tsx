"use server";

import { prisma } from "~/lib/prisma";
import AddItemDialog from "~/components/Items/addItemDialog";
import List from "~/components/Items/list";
import PurchasedItems from "~/components/Items/purchasedItems";

export default async function HomePage() {
  const items = await prisma.listItem.findMany();

  return (
    <main className="flex min-h-[calc(100vh-50px)] flex-col items-center justify-center">
      <div className="container flex w-full max-w-[500px] flex-col justify-center gap-8 px-4 py-16">
        <div className="flex w-full flex-row-reverse ">
          <AddItemDialog />
        </div>
        <List items={items} />
        <PurchasedItems />
      </div>
    </main>
  );
}
