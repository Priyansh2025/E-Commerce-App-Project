// src/context/CartContext.jsx
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // --- Cart Logic ---
  const addToCart = (product) => {
    // 1. Check if the item already exists in the cart state
    const existingItem = cartItems.find((item) => item.productId === product.id);

    // 2. Trigger the correct toast OUTSIDE the state setter
    if (existingItem) {
      toast.info(`Increased ${product.title.substring(0, 15)}... quantity`);
      // 3. Update state
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      toast.success(`${product.title.substring(0, 15)}... added to cart!`);
      // 3. Update state
      setCartItems((prev) => [
        ...prev,
        { productId: product.id, product, quantity: 1, price: product.price },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    // Trigger toast outside the setter
    toast.error('Item removed from cart');
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent negative quantities
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  // --- Wishlist Logic ---
  const toggleWishlist = (product) => {
    // 1. Check if the item is already in the wishlist state
    const isSaved = wishlistItems.some((item) => item.productId === product.id);

    // 2. Trigger the correct toast OUTSIDE the state setter
    if (isSaved) {
      toast.info('Removed from wishlist');
      // 3. Update state
      setWishlistItems((prev) => prev.filter((item) => item.productId !== product.id));
    } else {
      toast.success('Added to wishlist!');
      // 3. Update state
      setWishlistItems((prev) => [...prev, { productId: product.id, product }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlistItems,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};