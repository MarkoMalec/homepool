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
      {!items.length && (
        <h4 className="text-md text-center font-semibold">No history...</h4>
      )}
      <div className="grid">
        {items.map((item) => {
          const date = formatDistance(subDays(item.deletedAt, 3), new Date(), {
            addSuffix: true,
          });

          return (
            <div key={item.id} className="mb-2 mt-5 rounded bg-secondary p-2">
              <div className="flex justify-between">
                <div>
                  <strong>{item.deletedBy.name}</strong>
                  <Badge className="ml-5 text-[12px]">deleted</Badge>
                </div>
                <small>{date}</small>
              </div>
              <Separator className="mt-2" />
              <div className="mt-2 text-sm">- {item.itemName}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RemoveHistoryList;
