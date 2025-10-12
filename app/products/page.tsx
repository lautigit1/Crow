'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProductGrid from './components/ProductGrid'

export default function ProductsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0A1E]"
    >
      {/* Efectos de fondo modernos */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A1E] via-[#1a1a3a] to-[#0A0A1E]"></div>
        
        {/* Círculo difuminado 1 */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse"></div>
        
        {/* Círculo difuminado 2 */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px] animate-pulse" 
             style={{ animationDelay: '1s' }}></div>
             
        {/* Grid moderno */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMkE0MzY1IiBvcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      {/* Líneas decorativas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-azul-electrico to-blue-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Nuestro Catálogo
            </motion.h1>
            <motion.div
              className="absolute -inset-x-6 -inset-y-4 border border-blue-500/20 rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            ></motion.div>
          </div>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explora nuestra selección de repuestos de alta calidad para mantener tu flota en óptimas condiciones
          </motion.p>
        </motion.div>

        {/* Barra de búsqueda con animación y efecto glassmorphism mejorado */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-azul-electrico rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#1a1a3a]/80 rounded-full border border-blue-500/20 p-2 backdrop-blur-xl shadow-xl">
              <input
                type="text"
                placeholder="Buscar por nombre, marca o categoría..."
                className="w-full px-6 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-blue-600 to-azul-electrico text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95">
                Buscar
              </button>
            </div>
          </div>
        </motion.div>

        <ProductGrid />
      </div>
    </motion.div>
  )
}