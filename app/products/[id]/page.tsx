'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { notFound } from 'next/navigation';
import { products } from '../../data/product';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/product';
import { formatPrice } from '../../lib/formatPrice';

// Componente de galería de imágenes
function ImageGallery({ product }: { product: Product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const images = product.imagenes || [product.imagenUrl];

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative w-full h-96 bg-zinc-800 rounded-xl overflow-hidden group">
        <Image
          src={images[selectedImageIndex]}
          alt={product.nombre}
          fill
          style={{ objectFit: 'cover' }}
          className={`transition-transform duration-300 cursor-pointer ${
            isZoomed ? 'scale-150' : 'group-hover:scale-110'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        {/* Overlay de zoom */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {isZoomed ? 'Click para alejar' : 'Click para zoom'}
          </span>
        </div>
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? 'border-azul-electrico shadow-neon-blue'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <Image
                src={image}
                alt={`${product.nombre} ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Componente selector de cantidad
function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  stock, 
  disabled 
}: {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  stock: number;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-white font-medium">Cantidad:</span>
      <div className="flex items-center border border-zinc-700 rounded-lg">
        <button
          onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
          disabled={disabled || quantity <= 1}
          className="px-3 py-2 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          -
        </button>
        <span className="px-4 py-2 text-white bg-zinc-800 min-w-[3rem] text-center">
          {quantity}
        </span>
        <button
          onClick={() => quantity < stock && onQuantityChange(quantity + 1)}
          disabled={disabled || quantity >= stock}
          className="px-3 py-2 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
      <span className="text-gray-400 text-sm">
        ({stock} disponibles)
      </span>
    </div>
  );
}

// Componente estado de stock
function StockStatus({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="text-red-400 font-medium">Agotado</span>
      </div>
    );
  }
  
  if (stock < 10) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
        <span className="text-yellow-400 font-medium">Pocas Unidades ({stock})</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <span className="text-green-400 font-medium">En Stock ({stock})</span>
    </div>
  );
}

// Componente de pestañas de información
function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'faq'>('description');

  const tabs = [
    { id: 'description', label: 'Descripción' },
    { id: 'specs', label: 'Especificaciones' },
    { id: 'faq', label: 'Preguntas Frecuentes' }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-zinc-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === tab.id
                ? 'text-azul-electrico border-b-2 border-azul-electrico'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="text-gray-300 space-y-4"
        >
          {activeTab === 'description' && (
            <div>
              <p className="text-lg leading-relaxed">
                {product.descripcionCompleta || product.descripcionCorta}
              </p>
              {product.categoria && (
                <div className="mt-4 p-4 bg-zinc-800/50 rounded-lg">
                  <p><strong>Categoría:</strong> {product.categoria}</p>
                  {product.subcategoria && (
                    <p><strong>Subcategoría:</strong> {product.subcategoria}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-3">
              {product.especificaciones ? (
                <>
                  {product.especificaciones.dimensiones && (
                    <div className="flex justify-between py-2 border-b border-zinc-700">
                      <span className="font-medium">Dimensiones:</span>
                      <span>{product.especificaciones.dimensiones}</span>
                    </div>
                  )}
                  {product.especificaciones.peso && (
                    <div className="flex justify-between py-2 border-b border-zinc-700">
                      <span className="font-medium">Peso:</span>
                      <span>{product.especificaciones.peso}</span>
                    </div>
                  )}
                  {product.especificaciones.material && (
                    <div className="flex justify-between py-2 border-b border-zinc-700">
                      <span className="font-medium">Material:</span>
                      <span>{product.especificaciones.material}</span>
                    </div>
                  )}
                  {product.especificaciones.garantia && (
                    <div className="flex justify-between py-2 border-b border-zinc-700">
                      <span className="font-medium">Garantía:</span>
                      <span>{product.especificaciones.garantia}</span>
                    </div>
                  )}
                  {product.especificaciones.numerosParte && (
                    <div className="py-2">
                      <span className="font-medium">Números de Parte Compatibles:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.especificaciones.numerosParte.map((numero, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-zinc-700 rounded text-sm"
                          >
                            {numero}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p>No hay especificaciones técnicas disponibles.</p>
              )}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800/50 rounded-lg">
                <h4 className="font-semibold text-white mb-2">¿Este producto es compatible con mi camión?</h4>
                <p>Verificá la compatibilidad en la descripción del producto. Modelos compatibles: {product.modeloCompatible}</p>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-lg">
                <h4 className="font-semibold text-white mb-2">¿Incluye garantía?</h4>
                <p>Sí, todos nuestros productos incluyen garantía del fabricante. Consulta los detalles en las especificaciones.</p>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-lg">
                <h4 className="font-semibold text-white mb-2">¿Realizan envíos?</h4>
                <p>Realizamos envíos a todo el país. El costo se calcula según tu ubicación durante el proceso de compra.</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Componente principal de la página
export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  // Función formatPrice importada desde lib/formatPrice.ts

  const handleAddToCart = async () => {
    if (product.stock === 0) return;
    
    setIsAddingToCart(true);
    
    // Simular un pequeño delay para el feedback
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product, quantity);
    setIsAddingToCart(false);
    setShowSuccess(true);
    
    // Ocultar mensaje de éxito después de 2 segundos
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div>
            <ImageGallery product={product} />
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Etiqueta si existe */}
            {product.etiqueta && (
              <span className={`inline-block px-4 py-2 text-sm font-bold rounded-full ${
                product.etiqueta === 'Oferta' && 'bg-rojo-potente text-white'
              } ${
                product.etiqueta === 'Más Vendido' && 'bg-azul-electrico text-black'
              } ${
                product.etiqueta === 'Novedad' && 'bg-green-500 text-white'
              } ${
                product.etiqueta === 'Pocas Unidades' && 'bg-yellow-500 text-black'
              }`}>
                {product.etiqueta}
              </span>
            )}

            {/* Título y marca */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {product.nombre}
              </h1>
              <p className="text-xl text-gray-400">
                {product.marca} - {product.modeloCompatible}
              </p>
            </div>

            {/* Estado de stock */}
            <StockStatus stock={product.stock} />

            {/* Precio */}
            <div className="text-4xl font-extrabold text-azul-electrico">
              {formatPrice(product.precio)}
            </div>

            {/* Selector de cantidad */}
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              stock={product.stock}
              disabled={product.stock === 0}
            />

            {/* Botón añadir al carrito */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className="w-full bg-rojo-potente text-white px-8 py-4 rounded-xl font-bold text-lg
                         transition-all duration-300 hover:scale-105 hover:bg-red-700 
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                         shadow-lg hover:shadow-neon-red flex items-center justify-center space-x-2"
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Añadiendo...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <div className="w-5 h-5 text-green-400">✓</div>
                    <span>¡Añadido al carrito!</span>
                  </>
                ) : product.stock === 0 ? (
                  'Producto Agotado'
                ) : (
                  'Añadir al Carrito'
                )}
              </button>

              {/* Información adicional */}
              <div className="text-sm text-gray-400 space-y-1">
                <p>• Envío gratis en compras superiores a $200.000</p>
                <p>• Garantía del fabricante incluida</p>
                <p>• Soporte técnico especializado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de información */}
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
}