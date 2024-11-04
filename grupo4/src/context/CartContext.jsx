import { useState, useMemo, createContext, useEffect } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addProductToCart = (id) => {
    setCart((prevCart) => {
      const product = prevCart.find((p) => p.id === id);
      if (!product) {
        return [...prevCart, { id, quantity: 1 }];
      } else {
        return prevCart.map((p) => {
          if (p.id === id) {
            return { ...p, quantity: p.quantity + 1 };
          }
          return p;
        });
      }
    });
  };

  const calculateTotalTotalPrice = () => {
    const productsFromCart = JSON.parse(localStorage.getItem("products"));
    const total = productsFromCart.reduce((acc, product) => {
      const { valor, quantity } = product;
      return acc + valor * quantity;
    }, 0);
    setTotalPrice(total);
  };

  const value = useMemo(
    () => ({
      cart,
      totalPrice,
      addProductToCart,
      calculateTotalTotalPrice,
    }),
    [cart, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
