import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('No data from backend');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cart');
        setCart(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/wishlist');
        setWishlist(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:8000/api/cart', { productId: productId });
      const response = await axios.get('http://localhost:8000/api/cart');
      setCart(response.data);
      setMessage('Product added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Error adding to cart');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:8000/api/cart/${productId}`, { quantity });
      const response = await axios.get('http://localhost:8000/api/cart');
      setCart(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${productId}`);
      const response = await axios.get('http://localhost:8000/api/cart');
      setCart(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response2 = await axios.post('http://localhost:8000/api/wishlist', { productId: productId });
      const response = await axios.get('http://localhost:8000/api/wishlist');
      if(response2.status === 200 ){
        setMessage('Product is already in the wishlist!');
      setTimeout(() => setMessage(''), 3000);
      }
      else{
        setWishlist(response.data);
      setMessage('Product added to wishlist!');
      setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/wishlist/${productId}`);
      const response = await axios.get('http://localhost:8000/api/wishlist');
      setWishlist(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const moveToWishlist = (productCartId,productId) => {
    removeFromCart(productCartId);
    addToWishlist(productId);
    setMessage('Product moved from cart to wishlist!');
    setTimeout(() => setMessage(''), 3000);
  };

  const moveToCart = (productWishlistId,productId) => {
    removeFromWishlist(productWishlistId);
    addToCart(productId);
    setMessage('Product moved from wishlist to cart!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route
          path="/product/:productId"
          element={<ProductDetails products={products} addToCart={addToCart} addToWishlist={addToWishlist} message={message} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} moveToWishlist={moveToWishlist} message={message} />}
        />
        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} moveToCart={moveToCart} message={message} />}
        />
      </Routes>
    </>
  );
};

export default App;
