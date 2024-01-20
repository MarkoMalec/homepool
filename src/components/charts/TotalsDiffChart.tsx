"use client"

import React from 'react';
import { Chart } from 'react-google-charts';

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
  
    users.forEach(user => {
      const userTotal = user.checkedItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
      if (userTotal > maxSpentAmount) {
        maxSpentUser = user;
        maxSpentAmount = userTotal;
      }
    });
  
    // Determine each user's spending status based on the max spender
    const userStatuses = users.map(user => {
      const userTotal = user.checkedItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
      const status = userTotal === maxSpentAmount ? 'Green (Positive)' : 'Red (Negative)';
  
      return {
        name: user.name,
        balance: userTotal.toFixed(2),
        status
      };
    });
  
    return (
      <div>
        <h2>User Spending Status</h2>
        <ul>
          {userStatuses.map((user, index) => (
            <li key={index}>
              {user.name}: {user.balance} € - {user.status}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TotalsDiffChart;
  