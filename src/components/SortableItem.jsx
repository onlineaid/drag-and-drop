import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

  const baseStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getItemStyles = props.getItemStyles || {}; // Custom item styles
  const getWrapperStyles = props.getWrapperStyles || {}; // Custom wrapper styles

  const style = {
    ...baseStyle,
    ...getItemStyles, // Apply item-specific styles
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        ...getWrapperStyles, // Apply wrapper-specific styles
      }}
      {...attributes}
      {...listeners}
    >
      <div>
        <p>{props.content}</p>
        <label>
          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
}
