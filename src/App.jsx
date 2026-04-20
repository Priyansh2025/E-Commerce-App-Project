import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          {/* Toast notifications */}
          <ToastContainer position="bottom-right" theme="colored" autoClose={2000} />
          
          <Navbar />

          {/* Main Content Area */}
          <main style={{ minHeight: '80vh' }}>
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home />} />
              
              {/* All Products Page */}
              <Route path="/products" element={<Products />} />
              
              {/* THE CRITICAL ROUTE: Matches /product/1, /product/2, etc. */}
              <Route path="/product/:id" element={<ProductDetails />} />
              
              {/* Shopping Cart */}
              <Route path="/cart" element={<Cart />} />
              
              {/* Checkout */}
              <Route path="/checkout" element={<Checkout />} />

              {/* Catch-all: Redirects any typos back to Home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;