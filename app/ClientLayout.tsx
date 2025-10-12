// app/ClientLayout.tsx
'use client';

import React from 'react';
import { useCart } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isCartOpen } = useCart();

  return (
    <>
      <Navbar />
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCartOpen ? 'filter blur-sm pointer-events-none' : ''
        }`}
      >
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}