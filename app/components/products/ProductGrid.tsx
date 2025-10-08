// app/components/products/ProductGrid.tsx
'use client'

import { products } from '@/app/data/product' // Importamos nuestra data de prueba
import ProductCard from './ProductCard'       // Importamos la ficha que ya creamos

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {/* Acá está la magia: .map() recorre nuestra lista de productos 
        y por cada 'product' en la lista, crea un componente ProductCard.
      */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}