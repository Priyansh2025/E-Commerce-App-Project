import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { formatINR } from '../utils/formatCurrency';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const isWishlisted = wishlistItems.some((item) => item.productId === product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      
      <span className="product-category">{product.category}</span>
      
      <Link to={`/product/${product.id}`}>
        <h3 className="product-title">{product.title.substring(0, 35)}...</h3>
      </Link>

      <div className="product-price-row">
        <span className="product-price">{formatINR(product.price)}</span>
        <span className="rating-badge">⭐ {product.rating?.rate || "N/A"}</span>
      </div>

      <div className="product-actions">
        <button 
          className="nav-icon" 
          onClick={() => toggleWishlist(product)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {isWishlisted ? <FaHeart color="#ef4444" size={24} /> : <FaRegHeart size={24} />}
        </button>

        <button className="btn btn-primary" onClick={() => addToCart(product)}>
          <FaShoppingCart /> Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;