"use server";

import AddItemDialog from "~/components/Items/addItemDialog";
import List from "~/components/Items/list";
import RemoveHistory from "~/components/History/RemoveHistory";
import PurchasedItems from "~/components/Items/purchasedItems";

export default async function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-50px)] flex-col items-center justify-center">
      <div className="container flex w-full max-w-[500px] flex-col justify-center gap-8 px-4 py-16">
        <div className="flex w-full flex-row-reverse ">
          <AddItemDialog />
        </div>
        <List />
        <PurchasedItems />
      </div>
    </main>
  );
}
