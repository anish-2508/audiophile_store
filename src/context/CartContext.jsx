import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  const fetchCart = async () => {
    // Removed: const res = await api.get("/cart");
    // Removed: setCart(res.data.items || []);
  };

  const addToCart = async (productId) => {
    // Removed: await api.post("/cart/add", { product_id: productId });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    // Removed: await api.delete(`/cart/remove/${productId}`);
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
