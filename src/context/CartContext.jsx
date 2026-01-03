import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicializa o estado buscando do LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("ironstore_cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Toda vez que cartItems mudar, salva no LocalStorage
  useEffect(() => {
    localStorage.setItem("ironstore_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- O resto das funções continua igual ---

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
