import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatINR } from '../utils/formatCurrency'; // Make sure this is imported!
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Shopping Cart</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Cart Items List */}
        <div>
          {cartItems.map((item) => (
            <div key={item.productId} className="product-card" style={{ flexDirection: 'row', marginBottom: '1rem', alignItems: 'center', gap: '2rem' }}>
              <img src={item.product.image} alt={item.product.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              
              <div style={{ flex: 1 }}>
                <h4 className="product-title" style={{ fontSize: '1rem' }}>{item.product.title}</h4>
                {/* FIXED THIS LINE BELOW */}
                <p className="product-price">{formatINR(item.price)}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="btn-outline" style={{ padding: '5px 10px', borderRadius: '8px' }} onClick={() => updateQuantity(item.productId, item.quantity - 1)}><FaMinus size={12}/></button>
                <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{item.quantity}</span>
                <button className="btn-outline" style={{ padding: '5px 10px', borderRadius: '8px' }} onClick={() => updateQuantity(item.productId, item.quantity + 1)}><FaPlus size={12}/></button>
              </div>

              <button onClick={() => removeFromCart(item.productId)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                <FaTrash size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="product-card" style={{ height: 'fit-content' }}>
          <h3>Order Summary</h3>
          <div style={{ margin: '1.5rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Subtotal:</span>
              {/* FIXED THIS LINE BELOW */}
              <span>{formatINR(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery:</span>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>FREE</span>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            {/* FIXED THIS LINE BELOW */}
            <span className="product-price">{formatINR(total)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>Proceed to Checkout</Link>
        </div>

      </div>
    </div>
  );
};

export default Cart;