import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products, addToCart, addToWishlist, message }) => {
  const { productId } = useParams();
  const product = products.find(p => p._id === productId); // Find the product based on the productId
  if (!product) return <p>Product not found!</p>; // display if product not found 


  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.longDescription}</p>
      <p>${product.price}</p>

      <button className="btn add-to-cart" onClick={() => addToCart(product._id)}>Add to Cart</button>
      <button className="btn add-to-wishlist" onClick={() => addToWishlist(product._id)}>Add to Wishlist</button>

      {/* Display feedback message */}
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default ProductDetails;
