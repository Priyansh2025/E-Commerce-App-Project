// src/pages/Wishlist.jsx
import { Link } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import ProductGrid from '../components/ProductGrid';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  // Our ProductGrid expects an array of product objects. 
  // Our wishlistItems state holds objects shaped like { productId, product }.
  // So, we map over them to extract just the product details.
  const savedProducts = wishlistItems.map(item => item.product);

  if (savedProducts.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Your wishlist is empty</h2>
        <p>Save items you like to view them later.</p>
        <Link to="/products" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Your Wishlist</h1>
      <p>You have {savedProducts.length} saved item(s).</p>
      
      {/* Reusing our awesome ProductGrid! */}
      <ProductGrid products={savedProducts} />
    </div>
  );
};

export default Wishlist;