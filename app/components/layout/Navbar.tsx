// app/components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'

// Componente del ícono del carrito
function CartIcon({ onClick }: { onClick: () => void }) {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="group relative p-2 text-azul-electrico transition-all duration-200 rounded-lg hover:bg-zinc-800/50 hover:ring-2 hover:ring-azul-electrico/50"
      aria-label={`Carrito de compras${totalItems > 0 ? ` (${totalItems} productos)` : ''}`}
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Carrito moderno estilo outline */}
        <path d="M2.25 2.25h1.386c.51 0 .955.343 1.087.835l.383 1.437" />
        <path d="M6.116 4.5h13.384c.72 0 1.236.67 1.065 1.37l-1.755 7.02a1.125 1.125 0 01-1.095.86H7.5" />
        <path d="M7.5 14.25L5.477 4.522" />
        <path d="M4.5 12.75H3.375" />
        <circle cx="15.75" cy="19.5" r="1.125" />
        <circle cx="9" cy="19.5" r="1.125" />
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
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { openCart } = useCart()

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
            className="text-azul-electrico logo-electric transition-all duration-300 logo-glow"
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
            <CartIcon onClick={openCart} />
          
          {/* Botón catálogo */}
          <Link 
            href="/products" 
            className="bg-rojo-potente text-white font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:bg-red-600 text-sm"
          >
            Catálogo
          </Link>
        </div>
      </nav>

  {/* Cart Drawer movido a ClientLayout */}
    </motion.header>
  )
}