import React, { useEffect, useState } from 'react';

function Header() {
  const [selectedProductsCount, setSelectedProductsCount] = useState(0);

  const clearSelectedProducts = () => {
    localStorage.removeItem('selectedProducts');
    setSelectedProductsCount(0);
  };

  useEffect(() => {
    // Load selected products from local storage on component mount
    const storedSelectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    setSelectedProductsCount(storedSelectedProducts.length);
  }, []);

  return (
    <div className='header'>
      {selectedProductsCount > 0 ? (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h3>
            <input type="checkbox" checked /> {selectedProductsCount} File Selected
          </h3>
          <button className='text-btn' onClick={clearSelectedProducts}>Delete file</button>
        </div>
      ) : (
        <h3>Gallery</h3>
      )}
    </div>
  );
}

export default Header;
