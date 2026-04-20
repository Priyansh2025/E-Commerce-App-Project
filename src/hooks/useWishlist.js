import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useWishlist = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useWishlist must be used within a CartProvider');
  }
  return {
    wishlistItems: context.wishlistItems,
    toggleWishlist: context.toggleWishlist,
  };
};

export default useWishlist;