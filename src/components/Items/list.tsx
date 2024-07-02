"use client";

import { useState, useEffect } from "react";
import { ListItem } from "@prisma/client";
import { Item } from "./listItem";
import OverlayItem from "./overlayItem";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFetch } from "~/lib/hooks/useFetch";
import toast from "react-hot-toast";

interface Items {
  items: ListItem[];
}

const List = ({ items }: Items) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [theItems, setTheItems] = useState(items);
  const [updatedItems, setUpdatedItems] = useState<ListItem[]>([]);

  const { doFetch } = useFetch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    console.log(active);
    setActiveId(active?.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = theItems.findIndex((item) => item.id === active.id);
      const newIndex = theItems.findIndex((item) => item.id === over?.id);
      const newItems = arrayMove(theItems, oldIndex, newIndex).map((item, index) => ({
        ...item,
        position: index,
      }));

      setTheItems(newItems);
      setUpdatedItems(newItems);
    }
    setActiveId(null);
  }

  useEffect(() => {
    if (updatedItems.length > 0) {
      updatedItems.forEach((item) => {
        doFetch(
          "/api/item/update",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId: item.id, position: item.position }),
          },
        );
      });
    }
  }, [updatedItems]);

  const sortedItems = [...theItems].sort((a, b) => a.position - b.position);

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        id="unique-context-id"
      >
        <SortableContext
          items={sortedItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <h2 className="mb-5 text-2xl font-bold">Stuff needed</h2>
          <div className="grid w-full grid-cols-1 gap-3 md:gap-5">
            {sortedItems.length
              ? sortedItems.map((item) => (
                  <Item key={item.id} listItem={item} id={item.id} />
                ))
              : "Add some items first!"}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <OverlayItem
              listItem={sortedItems.find((item) => item.id === activeId)}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default List;
