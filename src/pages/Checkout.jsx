// src/pages/Checkout.jsx
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatINR } from '../utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = uuidv4().split('-')[0].toUpperCase(); // Create a short, clean ID
    setOrderId(newOrderId);
    setIsOrdered(true);
    toast.success("Order Placed Successfully!");
  };

  if (isOrdered) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '3rem' }}>Success!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Thank you for your purchase.</p>
        <div className="rating-badge" style={{ margin: '0 auto 2rem', fontSize: '1.1rem' }}>
          Order ID: #{orderId}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
        
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="product-card" style={{ gap: '1.5rem' }}>
          <h3>Shipping Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="First Name" className="input-field" required />
            <input type="text" placeholder="Last Name" className="input-field" required />
          </div>
          <input type="email" placeholder="Email Address" className="input-field" required />
          <input type="text" placeholder="Address" className="input-field" required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="City" className="input-field" required />
            <input type="text" placeholder="State" className="input-field" required />
            <input type="text" placeholder="Zip" className="input-field" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Place Order</button>
        </form>

        {/* Summary Card */}
        <div className="product-card" style={{ height: 'fit-content' }}>
          <h3>Order Summary</h3>
          <div style={{ margin: '1.5rem 0' }}>
            {cartItems.map(item => (
              <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.quantity}x {item.product.title.substring(0, 20)}...</span>
                <span>{formatINR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <span>Total to Pay:</span>
            <span style={{ color: 'var(--primary)' }}>{formatINR(total)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;