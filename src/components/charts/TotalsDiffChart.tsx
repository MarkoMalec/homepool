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

    return {
      name: user.name,
      balance: userTotal.toFixed(2),
      status,
    };
  });

  const theChartData = userStatuses.map((user) => {
    const userName = user.name ? user.name.split(" ")[0] : null;
    return [userName, Number(user.balance), `color: ${user.status}`];
  });

  const chartData = [["", "", { role: "style" }], ...theChartData];

  const chartOptions = {
    title: "User expenses",
    chartArea: { width: "100%" },
    hAxis: {
      title: "Total €",
      minValue: 0,
    },
    legend: { position: "none" },
    backgroundColor: "transparent",
    // vAxis: {
    //   title: "City",
    // },
  };

  return (
    <div>
      <h2 className="mb-5 text-center text-[2rem] font-bold sm:text-[3rem]">
        User Spendings
      </h2>
      <Chart
        options={chartOptions}
        data={chartData}
        chartType="Bar"
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default TotalsDiffChart;
