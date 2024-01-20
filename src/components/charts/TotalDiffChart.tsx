"use client";

import React from "react";
import { Chart } from "react-google-charts";

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

const TotalDiffChart = ({ users }: Props) => {
 const userCheckedItems = users.map(user => {
   return user.checkedItems
});

 console.log(userCheckedItems, "CHECKEDITEMS FROM USER");
 const userTotals = users.map(user => {
    const total = user.checkedItems.reduce((sum, item) => {
      return sum + parseFloat(item.price);
    }, 0);
    return {
      name: user.name,
      total: Number(total.toFixed(2)), // Ensuring it's treated as a number
    };
  });

  const data = userTotals.map(user => {
    return [`${user.name}`, user.total, "color: black"]; // Ensure user.total is a number
  });

  const labels = ["User", "Total Spent", { role: "style" }];

  const chartData = [labels, ...data];

  console.log(chartData);

  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
  };

  return (
    <Chart
      chartType="Bar"
      width="90%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
};

export default TotalDiffChart;
