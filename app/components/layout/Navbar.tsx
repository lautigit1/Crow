// app/components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

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
        <div className="text-3xl font-bold z-10">
          <Link 
            href="/" 
            className="text-[#00BFFF] transition-opacity duration-300 hover:opacity-80"
          >
            CrowRepuestos
          </Link>
        </div>

        <ul
          className="hidden items-center justify-center rounded-full border border-white/10 bg-dark-translucent p-1 shadow-lg md:flex"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {links.map((link) => (
            <li
              key={link.href}
              className="relative px-5 py-2"
              onMouseEnter={() => setHoveredLink(link.href)}
            >
              <Link href={link.href} className="relative z-10 text-gray-300 transition-colors duration-300 hover:text-white">
                {link.label}
              </Link>
              {hoveredLink === link.href && (
                <motion.div
                  className="absolute inset-0 z-0 rounded-full bg-azul-electrico"
                  layoutId="hover-pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 z-10">
          <input
            type="text"
            placeholder="Buscar..."
            className="hidden lg:block w-48 rounded-full border border-white/10 bg-dark-translucent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 focus:w-64 focus:border-azul-electrico focus:outline-none focus:ring-2 focus:ring-blue-glow"
          />
          {/* ¡ACÁ ESTÁ EL CAMBIO! Agregamos target y rel */}
          <Link 
            href="/productos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-rojo-potente text-white font-bold px-6 py-2 rounded-full shadow-neon-red transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            Catálogo
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}