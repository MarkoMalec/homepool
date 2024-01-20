"use client";

import React from "react";
import {
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  format,
  isThisMonth,
  isWithinInterval,
} from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { Badge } from "~/components/ui/badge";
import { Separator } from "../ui/separator";

type User = {
  id: string;
  name: string | null;
  checkedItems: {
    id: string;
    name: string;
    price: string;
    userId: string;
    checkedAt: Date;
  }[];
};

type Props = {
  users: User[];
};

const UserExpenses = ({ users }: Props) => {
  const isDateInMonth = (date: Date, monthStart: Date) => {
    const monthEnd = endOfMonth(monthStart);
    return isWithinInterval(date, { start: monthStart, end: monthEnd });
  };

  const groupItemsByMonth = (items: User["checkedItems"]) => {
    if (!items[0]) {
      return [];
    }
    const startDate = startOfMonth(items[0].checkedAt);
    const endDate = new Date();
    const months = eachMonthOfInterval({ start: startDate, end: endDate });

    return months.map((monthStart) => ({
      monthStart,
      items: items.filter((item) => isDateInMonth(item.checkedAt, monthStart)),
    }));
  };

  return (
    <>
      {users.map((user) => {
        const groupedItems = groupItemsByMonth(user.checkedItems);

        return (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Monthly Expenses</CardDescription>
              <Separator />
            </CardHeader>
            <CardContent>
              <Accordion type="single">
                {groupedItems.map(({ monthStart, items }, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={index}
                    className="mb-2 border-none pb-5"
                  >
                    <AccordionTrigger className="rounded-md bg-secondary px-4">
                      <h2>
                        {isThisMonth(monthStart)
                          ? `Current Month - ${format(monthStart, "MMMM")}`
                          : format(monthStart, "MMMM yyyy")}
                      </h2>
                      <Badge className="m-auto block w-fit">
                        Total: €
                        {items.reduce(
                          (sum, item) => sum + Number(item.price),
                          0,
                        )}
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      {items.map((item) => (
                        <div key={item.id}>
                          <div className="mb-2 flex items-center justify-between pt-2">
                            {format(item.checkedAt, "dd.MM.yyyy")} - {item.name}
                            <Badge className="inline-block w-fit">
                              €{item.price.toString()}
                            </Badge>
                          </div>
                          <Separator className="mt-3" />
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default UserExpenses;
