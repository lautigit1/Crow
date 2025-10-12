// app/ClientLayout.tsx
'use client';

import React, { useEffect } from 'react';
import { useCart } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isCartOpen, closeCart } = useCart();

  // Lock scroll and enforce black background while cart is open to avoid edge artifacts
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (isCartOpen) {
      body.classList.add('overflow-hidden');
      body.style.backgroundColor = '#000';
    } else {
      body.classList.remove('overflow-hidden');
      body.style.backgroundColor = '';
    }
    return () => {
      body.classList.remove('overflow-hidden');
      body.style.backgroundColor = '';
    };
  }, [isCartOpen]);

  return (
    <>
      <Navbar />
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCartOpen ? 'pointer-events-none' : ''
        }`}
      >
        <main>{children}</main>
        <Footer />
      </div>
      {/* Drawer global, independiente de la Navbar */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}