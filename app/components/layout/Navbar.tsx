// app/components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'
import CartDrawer from '../cart/CartDrawer'

// Componente del ícono del carrito
function CartIcon({ onClick }: { onClick: () => void }) {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <button 
      onClick={onClick}
      className="relative p-2 text-white hover:text-azul-electrico transition-colors duration-200"
      aria-label={`Carrito de compras${totalItems > 0 ? ` (${totalItems} productos)` : ''}`}
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" 
        />
      </svg>
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-rojo-potente text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
        >
          {totalItems}
        </motion.span>
      )}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/categorias/motor', label: 'Motor' },
    { href: '/categorias/frenos', label: 'Frenos' },
    { href: '/categorias/filtros', label: 'Filtros' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}
      animate={{
        backgroundColor: scrolled ? 'rgba(17, 17, 17, 0.7)' : 'rgba(17, 17, 17, 0)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
      }}
    >
      <nav className="container mx-auto flex h-24 items-center justify-between px-8">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link 
            href="/" 
            className="text-azul-electrico transition-all duration-300 hover:text-blue-400 hover:drop-shadow-lg"
          >
            CrowRepuestos
          </Link>
        </div>

        {/* Enlaces centrales - ocultos en móvil */}
        <ul className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sección derecha */}
        <div className="flex items-center space-x-3">
          {/* Barra de búsqueda - solo desktop */}
          <input
            type="text"
            placeholder="Buscar repuestos..."
            className="hidden xl:block w-48 rounded-full border border-white/20 bg-zinc-900/80 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 focus:w-56 focus:border-azul-electrico focus:outline-none"
          />
          
          {/* Carrito */}
          <CartIcon onClick={() => setCartDrawerOpen(true)} />
          
          {/* Botón catálogo */}
          <Link 
            href="/products" 
            className="bg-rojo-potente text-white font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:bg-red-600 text-sm"
          >
            Catálogo
          </Link>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={cartDrawerOpen} 
        onClose={() => setCartDrawerOpen(false)} 
      />
    </motion.header>
  )
}