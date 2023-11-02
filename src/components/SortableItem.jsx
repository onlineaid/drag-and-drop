import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, img, getItemStyles, getWrapperStyles, firstImgStyle }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const baseStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const style = {
    ...baseStyle,
    ...getItemStyles,
  };

  // Load selected products from local storage on component mount
  useEffect(() => {
    const storedSelectedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
    setSelectedProducts(storedSelectedProducts);
  }, []);

  // Function to toggle product selection
  const toggleProductSelection = () => {
    const isSelected = selectedProducts.includes(id);

    let updatedSelectedProducts;

    if (isSelected) {
      updatedSelectedProducts = selectedProducts.filter(
        (productId) => productId !== id
      );
    } else {
      updatedSelectedProducts = [...selectedProducts, id];
    }

    // Update the state with the new selected products
    setSelectedProducts(updatedSelectedProducts);

    // Save the updated selected products to local storage
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(updatedSelectedProducts)
    );

    window.location.reload();
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        ...getWrapperStyles,
      }}
      {...attributes}
      {...listeners}
     
    >
      <div className="hover" style={{position: 'relative', background: '#fff', borderRadius: '5px'}}>
        <img 
          style={{ ...firstImgStyle }}
          src={img}
          alt={"content"}
        />
        <div style={{ position: "absolute", top: '2%', left: '2%' }}>
          <input
            type="checkbox"
            onChange={toggleProductSelection}
            checked={selectedProducts.includes(id)}
          />
        </div>
      </div>
    </div>
  );
}
