"use client";

import React from "react";
import { User } from "@prisma/client";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "~/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  items: {
    id: string;
    name: string;
    checkedAt: Date;
    checkedBy: User;
    price: string;
  }[];
};

const PurchasedItemsList = ({ items }: Props) => {
  const sortedItems = [...items].sort(
    (a, b) => b.checkedAt.getTime() - a.checkedAt.getTime(),
  );
  return (
    <>
      {!items.length && (
        <>
          <p className="text-md text-center font-semibold">
            No one bought anythingthis week yet.
          </p>
          <p className="text-center text-sm">
            Check{" "}
            <Link className="color-blue underline" href="/expenses">
              Expenses
            </Link>{" "}
            to see overview of purchases.
          </p>
        </>
      )}
      {sortedItems.map((item) => {
        const date = format(item.checkedAt, "d.M.yyyy");
        return (
          <Card key={item.id} className="mb-2 overflow-hidden tracking-tight">
            <CardHeader className="mb-1 bg-secondary p-3">
              <Badge className=" max-w-fit text-[8px]">{date}</Badge>
            </CardHeader>
            <CardContent className="flex justify-between pt-3">
              <div>
                <span className={`text-[${item.checkedBy.color}] font-bold`}>
                  {item.checkedBy.name}
                </span>{" "}
                <span className="inline-block">{item.name}</span>
              </div>
              <Badge className="ml-auto block max-w-fit text-sm">
                €{item.price}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default PurchasedItemsList;
