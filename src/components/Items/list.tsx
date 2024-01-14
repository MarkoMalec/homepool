"use server";

import RemoveItemDialog from "./removeItemDialog";
import CheckItemDialog from "./checkItemDialog";
import { DrumstickIcon } from "lucide-react";

import { prisma } from "~/lib/prisma";

const List = async () => {
  const items = await prisma.listItem.findMany();

  return (
    <div className="grid w-full grid-cols-1 gap-3 md:gap-5">
      {items.length
        ? items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-3 shadow-lg md:p-4"
            >
              <h3 className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
                <DrumstickIcon />
                {item.name}
              </h3>
              <div className="flex items-center gap-2">
                <RemoveItemDialog itemId={item.id} />
                <CheckItemDialog itemId={item.id} />
              </div>
            </div>
          ))
        : "Add some items first!"}
    </div>
  );
};

export default List;
