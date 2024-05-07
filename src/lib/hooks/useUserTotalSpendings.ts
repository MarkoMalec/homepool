import { useState, useEffect } from "react";

type ItemProps = {
  price: string;
  checkedAt: Date;
};

const useUserTotalSpendings = (items: ItemProps[]) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = items.reduce((sum, item) => sum + Number(item.price), 0);

    setTotal(sum);
  }, [items]);

  return total;
};

export default useUserTotalSpendings;
