import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

type ItemProps = {
  price: string;
  checkedAt: Date;
};

const useSumPricesCurrentWeek = (items: ItemProps[]) => {
  const [total, setTotal] = useState(0);

  const isDateInCurrentWeek = (date: Date) => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    return isWithinInterval(date, {
      start: startDate,
      end: endDate,
    });
  };

  useEffect(() => {
    const sum = items
      .filter((item) => isDateInCurrentWeek(item.checkedAt))
      .reduce((sum, item) => sum + Number(item.price), 0);

    setTotal(sum);
  }, [items]);

  return total;
};

export default useSumPricesCurrentWeek;
