"use client";

import { useEffect, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("kitcase-cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kitcase-cart", JSON.stringify(cart));
  }, [cart]);

  function addItem(item) {
    setCart((prev) => [...prev, item]);
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    addItem,
    clearCart,
  };
}
