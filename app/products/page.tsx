'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from './components/ProductGrid';
import { products } from '../data/product';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('name');

  // Obtener categorías únicas (filtrar valores nulos/undefined)
  const categories = ['Todos', ...new Set(products.map(product => product.categoria).filter(Boolean))];
  
  // Obtener marcas únicas (filtrar valores nulos/undefined)
  const brands = ['Todas', ...new Set(products.map(product => product.marca).filter(Boolean))];

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.descripcionCorta.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.categoria === selectedCategory;
      const matchesBrand = selectedBrand === 'Todas' || product.marca === selectedBrand;
      const matchesPrice = product.precio >= priceRange[0] && product.precio <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.precio - b.precio;
        case 'price-high':
          return b.precio - a.precio;
        case 'name':
          return a.nombre.localeCompare(b.nombre);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 pt-32 pb-8">
        {/* Header con estilo mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 relative"
        >
          {/* Decoración de fondo */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-azul-electrico/5 rounded-full blur-3xl"></div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-extrabold mb-6 relative"
          >
            <span className="bg-gradient-to-r from-azul-electrico via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Catálogo
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              de Repuestos
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl lg:text-2xl text-gray-300 mb-4 leading-relaxed">
              Encontrá los mejores repuestos para camiones con garantía y envío a todo el país
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-azul-electrico">
              <span className="flex items-center gap-2">
                ✓ <span className="text-gray-400">Stock disponible</span>
              </span>
              <span className="flex items-center gap-2">
                ✓ <span className="text-gray-400">Garantía incluida</span>
              </span>
              <span className="flex items-center gap-2">
                ✓ <span className="text-gray-400">Envío a todo el país</span>
              </span>
              <span className="flex items-center gap-2">
                ✓ <span className="text-gray-400">Soporte técnico</span>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Sección de filtros mejorada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          {/* Búsqueda principal */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar repuestos por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-6 bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 border border-zinc-600 rounded-2xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-azul-electrico focus:border-azul-electrico transition-all duration-300 shadow-lg backdrop-blur-sm"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-azul-electrico" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filtros avanzados */}
          <div className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 max-w-7xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-azul-electrico" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Filtros Avanzados
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Categoría */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Categoría</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/70 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-azul-electrico focus:border-azul-electrico transition-all duration-300"
                >
                  {categories.map((category, index) => (
                    <option key={`category-${index}-${category}`} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Marca */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/70 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-azul-electrico focus:border-azul-electrico transition-all duration-300"
                >
                  {brands.map((brand, index) => (
                    <option key={`brand-${index}-${brand}`} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Ordenar */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/70 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-azul-electrico focus:border-azul-electrico transition-all duration-300"
                >
                  <option value="name">Nombre A-Z</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                </select>
              </div>

              {/* Rango de precio mejorado */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Precio máximo</label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #00BFFF 0%, #00BFFF ${(priceRange[1] / 500000) * 100}%, #3f3f46 ${(priceRange[1] / 500000) * 100}%, #3f3f46 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>$0</span>
                    <span className="font-semibold text-azul-electrico">
                      ${priceRange[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                    <span>$500,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contador de resultados mejorado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-azul-electrico/10 to-cyan-500/10 border border-azul-electrico/20 rounded-full px-6 py-3 backdrop-blur-sm">
            <svg className="w-5 h-5 text-azul-electrico" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-white font-semibold">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        {/* Grid de productos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ProductGrid products={filteredProducts} />
        </motion.div>

        {/* Mensaje mejorado cuando no hay productos */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="text-8xl mb-6 opacity-50">🔍</div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                No encontramos productos
              </h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                No hay productos que coincidan con tus criterios de búsqueda. 
                Probá ajustando los filtros o buscando con otros términos.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                  setSelectedBrand('Todas');
                  setPriceRange([0, 500000]);
                  setSortBy('name');
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-azul-electrico to-cyan-500 text-black font-bold rounded-xl hover:from-cyan-500 hover:to-azul-electrico transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Limpiar todos los filtros
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}