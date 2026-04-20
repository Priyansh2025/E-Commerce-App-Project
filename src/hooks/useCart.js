import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return {
    cartItems: context.cartItems,
    addToCart: context.addToCart,
    removeFromCart: context.removeFromCart,
    updateQuantity: context.updateQuantity,
  };
};

export default useCart;