// app/components/products/ProductCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/app/types/product';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // Función para formatear el precio a moneda argentina
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Animación de aparición para cada tarjeta
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col h-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-zinc-900 transition-all duration-300 ease-in-out
                 hover:shadow-neon-blue hover:scale-[1.02] hover:border-azul-electrico group" // Efecto de brillo al pasar el mouse
    >
      {/* Etiqueta de Producto (ej: Oferta, Más Vendido) */}
      {product.etiqueta && (
        <span className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs font-bold rounded-full 
                          ${product.etiqueta === 'Oferta' && 'bg-rojo-potente text-white'}
                          ${product.etiqueta === 'Más Vendido' && 'bg-azul-electrico text-black'}
                          ${product.etiqueta === 'Novedad' && 'bg-green-500 text-white'}
                          ${product.etiqueta === 'Pocas Unidades' && 'bg-yellow-500 text-black'}
                          `}>
          {product.etiqueta}
        </span>
      )}

      {/* Imagen del Producto */}
      <div className="relative w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
        <Image
          src={product.imagenUrl}
          alt={product.nombre}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-110" // Zoom sutil en la imagen al hover
        />
      </div>

      {/* Detalles del Producto */}
      <div className="flex flex-col p-5 flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
          {product.nombre}
        </h3>
        <p className="text-gray-400 text-sm mb-1">{product.marca} - {product.modeloCompatible}</p>
        <p className="text-gray-500 text-xs mb-3 truncate">{product.descripcionCorta}</p> {/* Truncate para que no se pase de largo */}

        <div className="mt-auto flex items-end justify-between pt-4 border-t border-white/5">
          <span className="text-2xl font-extrabold text-azul-electrico">
            {formatPrice(product.precio)}
          </span>
          <Link 
            href={`/productos/${product.id}`} // Link a la página de detalle del producto
            className="bg-rojo-potente text-white px-5 py-2 rounded-full font-bold text-sm
                       transition-all duration-300 hover:scale-105 hover:bg-red-700 shadow-md"
          >
            Ver Más
          </Link>
        </div>
      </div>
    </motion.div>
  );
}