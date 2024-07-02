import { ListItem } from "@prisma/client";
import RemoveItemDialog from "./removeItemDialog";
import CheckItemDialog from "./checkItemDialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { GripVerticalIcon } from "lucide-react";

export const Item = ({ listItem, id }: { listItem: ListItem; id: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? "0" : "1",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center justify-between rounded-lg border p-3 shadow-lg md:p-4"
    >
      <h3 className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
        <GripVerticalIcon
          opacity={0.5}
          strokeWidth={1.8}
          {...listeners}
          className="h-10 rounded hover:bg-secondary hover:shadow-md"
        />
        {listItem.name}
      </h3>
      <div className="flex items-center gap-2">
        <RemoveItemDialog itemId={listItem.id} />
        <CheckItemDialog itemId={listItem.id} />
      </div>
    </div>
  );
};
