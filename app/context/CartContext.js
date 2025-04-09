"use client";

import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    const exists = cartItems.filter(item => item.id == product.id);
    if (exists.length > 0) {
        const modifiedItem = [];
        
        cartItems.forEach(item => {
            if (item.id === product.id) {
                modifiedItem.push({
                    ...item,
                    qty: item.qty + 1
                })
            } else {
                modifiedItem.push(item);
            }
        });
        setCartItems(modifiedItem);
    } else {

        setCartItems((prevItems) => [...prevItems, product]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Create a custom hook for easy usage of the CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
