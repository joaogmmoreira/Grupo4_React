import { useState, useMemo, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { getProductById } from "../api/Api";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [totalPrice, setTotalPrice] = useState(0);

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

  const addProductQuantity = (id, qty) => {
    setCart((prevCart) => {
      return prevCart.map((p) => {
        if (p.id === id) {
          return { ...p, quantity: qty };
        }
        return p;
      });
    });
  };

  const removeProductFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const contextTotalPrice = async () => {
    try {
      const total = await Promise.all(
        cart.map(async (product) => {
          const { preco } = await getProductById(product.id);
          const { quantity } = product;
          return preco * quantity;
        })
      ).then((prices) => prices.reduce((acc, price) => acc + price, 0));

      setTotalPrice(total);
    } catch (error) {
      console.error("Error calculating total price:", error);
    }
  };

  const cleanCart = () => {
    setCart([]);
  };

  const value = useMemo(
    () => ({
      cart,
      totalPrice,
      addProductToCart,
      removeProductFromCart,
      addProductQuantity,
      contextTotalPrice,
      cleanCart,
    }),
    [cart, totalPrice]
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    contextTotalPrice();
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
