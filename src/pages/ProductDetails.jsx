import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { formatINR } from '../utils/formatCurrency';
import { FaShoppingCart, FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import { fetchProductById } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, wishlistItems, toggleWishlist } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetchProductById(id)
      .then((data) => {
        console.log("API Product Data:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="container" style={{ textAlign: 'center', padding: '10rem' }}>
      <div className="loader">Loading Product...</div>
    </div>
  );

  if (!product) return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
      <h2>Product not found</h2>
      <button className="btn btn-primary" onClick={() => navigate('/products')}>Back to Shop</button>
    </div>
  );

  const isWishlisted = wishlistItems.some((item) => item.productId === product.id);

  return (
    <div className="container">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: '500' }}
      >
        <FaArrowLeft /> Back
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }}>

        {/* Left Side: Image Holder */}
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: 'var(--radius)',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: 'var(--shadow)'
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }}
          />
        </div>

        {/* Right Side: Product Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span className="product-category">{product.category}</span>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.2' }}>
            {product.title}
          </h1>

          <div style={{ margin: '0.5rem 0' }}>
            <span className="rating-badge">
              ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>

          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: '1rem 0' }}>
            {formatINR(product.price)}
          </h2>

          {/* THE DESCRIPTION SECTION */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            borderRadius: '12px',
            borderLeft: '4px solid var(--primary)',
            margin: '1rem 0'
          }}>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Product Description</h4>
            <p style={{
              color: 'var(--text-main)',
              fontSize: '1.05rem',
              lineHeight: '1.7',
              opacity: 0.9
            }}>
              {product.description ? product.description : "No description provided for this item."}
            </p>
          </div>

          <div className="product-actions" style={{ gap: '2rem', marginTop: '2rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
              style={{ flex: 1, padding: '1.2rem' }}
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              className="btn btn-outline"
              onClick={() => toggleWishlist(product)}
              style={{ padding: '1.2rem', borderRadius: '50%' }}
            >
              {isWishlisted ? <FaHeart color="#ef4444" size={22} /> : <FaRegHeart size={22} />}
            </button>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <p>• 100% Original product</p>
            <p>• Pay on delivery might be available</p>
            <p>• Easy 7 days returns and exchanges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;