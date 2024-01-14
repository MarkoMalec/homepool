"use client";

import React from "react";
import { startOfWeek, format, isWithinInterval, endOfWeek } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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
  const isDateInCurrentWeek = (date: Date) => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    return isWithinInterval(date, {
      start: startDate,
      end: endDate,
    });
  };

  return (
    <>
      {users.map((user) => {
        const currentWeekItems = user.checkedItems.filter((item) =>
          isDateInCurrentWeek(item.checkedAt),
        );
        const total = currentWeekItems.reduce(
          (sum, item) => sum + Number(item.price),
          0,
        );

        return (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Current Week Expenses</CardDescription>
              <Separator />
            </CardHeader>
            <CardContent>
              {currentWeekItems.map((item) => (
                <div className="mb-2 pt-2" key={item.id}>
                  {format(item.checkedAt, "dd.MM.yyyy")} - {item.name}
                  <Badge className="ml-2">€{item.price.toString()}</Badge>
                  <Separator />
                </div>
              ))}
              <Separator />
            </CardContent>
            <CardFooter>
              <Badge>Total: {total}</Badge>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export default UserExpenses;
