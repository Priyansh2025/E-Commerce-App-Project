// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const { products, loading, error } = useProducts();
  const featuredProducts = products ? products.slice(0, 4) : [];

  return (
    <div>
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h1 className="hero-title">Welcome to FakeStore</h1>
          <p className="hero-subtitle">
            Discover the best products at unbeatable prices. Upgrade your lifestyle today.
          </p>
          <Link to="/products" className="btn btn-hero">
            Shop Now
          </Link>
        </div>
      </motion.div>

      {/* Featured Products Section */}
      <div className="container">
        <h2 className="page-title" style={{ borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
          Featured Products
        </h2>
        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading featured products...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: 'var(--danger)', marginTop: '2rem' }}>{error}</p>
        ) : (
          <ProductGrid products={featuredProducts} />
        )}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/products" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;