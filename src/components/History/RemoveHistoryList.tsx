"use client";

import React from "react";
import { User } from "@prisma/client";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { formatDistance, subDays } from "date-fns";

type Props = {
  items: {
    id: string;
    itemName: string;
    deletedAt: Date;
    deletedBy: User;
  }[];
};

const RemoveHistoryList = ({ items }: Props) => {
  return (
    <>
      <Separator className="my-2" />
      {!items.length && <h4 className="text-md font-semibold text-center">No history...</h4>}
      <div className="grid">
        {items.map((item) => {
          const date = formatDistance(subDays(item.deletedAt, 3), new Date(), {
            addSuffix: true,
          });

          return (
            <div key={item.id} className="mb-2">
              <Badge className="text-[12px]">
                {item.deletedBy.name} {date} deleted
              </Badge>
              <div className="text-sm">{item.itemName}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RemoveHistoryList;
