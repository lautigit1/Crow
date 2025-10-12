'use client'

import { products } from '../../data/product'
import ProductCard from './ProductCard'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Filtros con efecto de desplazamiento suave */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-4 flex-wrap"
      >
        {['Todos', 'Motor', 'Frenos', 'Suspensión', 'Transmisión'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300
              ${selectedCategory === category 
                ? 'bg-azul-electrico text-white scale-105 shadow-lg shadow-azul-electrico/50' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Grid de productos con animación de aparición escalonada */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </motion.div>
  )
}