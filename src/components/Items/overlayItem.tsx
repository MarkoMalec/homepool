import React, { forwardRef } from "react";
import RemoveItemDialog from "./removeItemDialog";
import CheckItemDialog from "./checkItemDialog";
import { GripVerticalIcon } from "lucide-react";
import { ListItem } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";

const OverlayItem = forwardRef(
  (
    { listItem, ...props }: { listItem: ListItem | undefined },
    ref: React.ForwardedRef<null>,
  ) => {
    if (!listItem) {
      return <Skeleton>Loading...</Skeleton>;
    }

    return (
      <div
        {...props}
        ref={ref}
        className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-lg md:p-4"
      >
        <h3 className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
          <GripVerticalIcon
            opacity={0.5}
            strokeWidth={1.8}
            className="h-10 rounded hover:bg-secondary hover:shadow-md"
          />
          {listItem?.name}
        </h3>
        <div className="flex items-center gap-2">
          <RemoveItemDialog itemId={listItem.id} />
          <CheckItemDialog itemId={listItem.id} />
        </div>
      </div>
    );
  },
);

export default OverlayItem;
