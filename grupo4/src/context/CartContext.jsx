import { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);

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
      calculateTotalTotalPrice,
      totalPrice,
    }),
    [totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
