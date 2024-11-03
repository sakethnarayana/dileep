// import React from 'react';

// const Cart = ({ cart, updateQuantity, removeFromCart, moveToWishlist, message }) => {
//   const totalPrice = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? <p>Your cart is empty</p> : ( //// if cart is empty display the message indicating so
//         <div>
//           {cart.map(item => (
//             <div key={item.productId.id}>
//               <h3>{item.productId.name}</h3>
//               <p>${item.productId.price} x {item.quantity}</p>
//               <button onClick={() => updateQuantity(item.productId.id, item.quantity + 1)}>+</button>
//               <button onClick={() => updateQuantity(item.productId.id, item.quantity - 1)}>-</button>
//               <button onClick={() => removeFromCart(item.productId.id)}>Remove</button>
//               <button onClick={() => moveToWishlist(item)}>Move to Wishlist</button>
//             </div>
//           ))}
//           <h3>Total: ${totalPrice.toFixed(2)}</h3>

//           {/* Display feedback message */}
//           {message && <p className="feedback-message">{message}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart, moveToWishlist, message }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <div>
          {cart.map(item => (
            <div key={item.productId._id}>
              <h3>{item.productId.name}</h3>
              <p>${item.productId.price} x {item.quantity}</p> 
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
              <button onClick={() => moveToWishlist(item._id,item.productId._id)}>Move to Wishlist</button>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          {message && <p className="feedback-message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Cart;
