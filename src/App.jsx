import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./components/SortableItem";

const fetchedItems = [
  { id: 1, content: "Item 1", isLarge: false },
  { id: 2, content: "Item 2", isLarge: false },
  { id: 3, content: "Item 3", isLarge: false },
  { id: 4, content: "Item 3", isLarge: false },
  { id: 5, content: "Item 3", isLarge: false },
  { id: 6, content: "Item 3", isLarge: false },
  { id: 7, content: "Item 3", isLarge: false },
  { id: 8, content: "Item 3", isLarge: false },
  { id: 9, content: "Item 3", isLarge: false },
  { id: 10, content: "Item 3", isLarge: false },
  { id: 11, content: "Item 3", isLarge: false },
  { id: 12, content: "Item 3", isLarge: false },
  { id: 13, content: "Item 3", isLarge: false },
  { id: 14, content: "Item 3", isLarge: false },
  { id: 15, content: "Item 3", isLarge: false },
  { id: 16, content: "Item 3", isLarge: false },
];

function App() {
  const [items, setItems] = useState(fetchedItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
          }}
        >
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              content={item.content}
              getItemStyles={
                index === 0 ? { fontSize: "2rem" } : {}
              }
              getWrapperStyles={
                index === 0
                  ? {
                      height: 298,
                      gridRowStart: "span 2",
                      gridColumnStart: "span 2",
                      background: "red",
                    }
                  : { width: '100%', height: 140, border: "2px solid green" }
              }
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = currentItems.findIndex((item) => item.id === over.id);

        // Use arrayMove to update the item order
        const updatedItems = arrayMove(currentItems, oldIndex, newIndex);

        return updatedItems;
      });
    }
  }
}

export default App;
