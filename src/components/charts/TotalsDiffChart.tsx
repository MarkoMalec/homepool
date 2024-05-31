"use client";

import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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

const TotalsDiffChart = ({ users }: Props) => {
  let maxSpentUser = null;
  let maxSpentAmount = -1;

  users.forEach((user) => {
    const userTotal = user.checkedItems.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0,
    );
    if (userTotal > maxSpentAmount) {
      maxSpentUser = user;
      maxSpentAmount = userTotal;
    }
  });

  // Determine each user's spending status based on the max spender
  const userStatuses = users.map((user) => {
    const userTotal = user.checkedItems.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0,
    );
    const status = userTotal === maxSpentAmount ? "green" : "black";

    const firstName = user.name?.split(" ")[0];

    return {
      name: firstName,
      balance: Number(userTotal.toFixed(2)),
      // status,
    };
  });

  return (
    <div className="max-w-[800px] mx-auto">
      <h2 className="mb-5 text-center text-[2rem] font-bold sm:text-[3rem]">
        User Spendings
      </h2>
      <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={userStatuses}
        margin={{
          top: 5,
          right: 30,
          left: -20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 1" />
        <XAxis dataKey="name" />
        <YAxis dataKey="balance" />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="balance" className="fill-primary" activeBar={<Rectangle className="fill-foreground" stroke="white" />} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default TotalsDiffChart;
