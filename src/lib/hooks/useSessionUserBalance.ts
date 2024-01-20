import { useUserContext } from "~/context/userContext";
import { useState, useEffect } from "react";

type User = {
  id: string;
  name?: string | null;
  image?: string | null;
  color?: string | null;
  email?: string | null;
  checkedItems: {
    id: string;
    name: string;
    price: string;
    userId: string;
    checkedAt: Date;
  }[];
};

const useSessionUserBalance = (users: User[]) => {
  const { user } = useUserContext();

  const calculateUserBalance = () => {
    if (!user) {
      return null;
    }

    let maxSpentAmount = -1;

    users.forEach((user: any) => {
      const userTotal = user.checkedItems.reduce(
        (sum: any, item: any) => sum + parseFloat(item.price.toString()),
        0,
      );
      if (userTotal > maxSpentAmount) {
        maxSpentAmount = userTotal;
      }
    });

    const currentUserTotal = user.checkedItems.reduce(
      (sum, item) => sum + parseFloat(item.price.toString()),
      0,
    );

    let balance = currentUserTotal - maxSpentAmount;
    const status =
      balance === 0
        ? "bg-green-700"
        : balance > 0
          ? `+${balance.toFixed(2)} (positive)`
          : `bg-red-700`;

    return {
      balance: balance.toFixed(2),
      status,
    };
  };

  const [currentUserBalance, setCurrentUserBalance] = useState(
    calculateUserBalance(),
  );

  useEffect(() => {
    setCurrentUserBalance(calculateUserBalance());
  }, [user, users]);

  return currentUserBalance;
};

export default useSessionUserBalance;
