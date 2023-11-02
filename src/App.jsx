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
import Header from "./components/Header";

const fetchedItems = [
  { id: 1, content: "Item 1", img: "./image/image-1.webp" },
  { id: 2, content: "Item 2", img: "./image/image-2.webp" },
  { id: 3, content: "Item 3", img: "./image/image-3.webp" },
  { id: 4, content: "Item 3", img: "./image/image-4.webp" },
  { id: 5, content: "Item 3", img: "./image/image-5.webp" },
  { id: 6, content: "Item 3", img: "./image/image-6.webp" },
  { id: 7, content: "Item 3", img: "./image/image-7.webp" },
  { id: 8, content: "Item 3", img: "./image/image-8.webp" },
  { id: 9, content: "Item 3", img: "./image/image-9.webp" },
  { id: 10, content: "Item 3", img: "./image/image-10.jpeg" },
  { id: 11, content: "Item 3", img: "./image/image-11.jpeg" },
  { id: 12, content: "Item 3", img: "./image/image-1.webp" },
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
    <>
      <Header />
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
                getItemStyles={index === 0 ? { fontSize: "2rem" } : {}}
                getWrapperStyles={
                  index === 0
                    ? {
                        height: 312,
                        width: "100%",
                        gridRowStart: "span 2",
                        gridColumnStart: "span 2",
                        border: "3px solid #DDF2FD",
                        borderRadius: "5px",
                      }
                    : {
                        height: "auto",
                        border: "3px solid #DDF2FD",
                        borderRadius: "5px",
                        // background: '#fff',
                      }
                }
                img={item.img}
                firstImgStyle={
                  index === 0
                    ? {
                        height: 293,
                        width: "100%",
                        objectFit: 'contain'
                      }
                    : {
                        width: "100%",
                        height: "140px",
                        objectFit: "contain",
                      }
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
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
