// src/components/ProductList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Electronic Products</h2>
      
      {/* Wrap the search bar in a container to center it */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.shortDescription}</p>
              <p>${product.price}</p>
              <Link to={`/product/${product._id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
