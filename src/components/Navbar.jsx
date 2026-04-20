// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStore, FaSun, FaMoon } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check local storage on load to see if they previously chose dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Toggle Function
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <FaStore /> FakeStore
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>

      <div className="nav-links" style={{ gap: '1.5rem' }}>
        
        {/* Dark Mode Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="nav-icon" 
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
        >
          {isDarkMode ? <FaSun size={22} color="#facc15" /> : <FaMoon size={22} />}
        </button>

        <Link to="/wishlist" className="nav-icon">
          <FaHeart size={22} />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>
        
        <Link to="/cart" className="nav-icon">
          <FaShoppingCart size={22} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;