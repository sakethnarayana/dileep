// import React from 'react';

// const Wishlist = ({ wishlist, removeFromWishlist, moveToCart, message }) => {
//   return (
//     <div>
//       <h2>Your Wishlist</h2>
//       {wishlist.length === 0 ? <p>Your wishlist is empty</p> : ( // if wishlist is empty display the message indicating so
//         <div>
//           {wishlist.map(item => (
//             <div key={item.id}>
//               <h3>{item.name}</h3>
//               <p>${item.price}</p>
//               <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
//               <button onClick={() => moveToCart(item)}>Move to Cart</button>
//             </div>
//           ))}

//           {/* Display feedback message */}
//           {message && <p className="feedback-message">{message}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;



import React from 'react';

const Wishlist = ({ wishlist, removeFromWishlist, moveToCart, message }) => {
  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? <p>Your wishlist is empty</p> : (
        <div>
          {wishlist.map(item => (
            <div key={item.productId._id}>
              <h3>{item.productId.name}</h3>
              <p>${item.productId.price}</p>
              <button onClick={() => removeFromWishlist(item._id)}>Remove</button>
              <button onClick={() => moveToCart(item._id,item.productId._id)}>Move to Cart</button>
            </div>
          ))}

          {message && <p className="feedback-message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
