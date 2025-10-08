// app/page.tsx

import Hero from './components/home/Hero'
import ProductGrid from './components/products/ProductGrid' // <--- 1. IMPORTAMOS LA GRILLA DE PRODUCTOS

export default function Home() {
  return (
    <main>
      {/* Sección 1: La presentación épica que ya tenemos */}
      <Hero />

      {/* Sección 2: ¡La nueva sección de Productos Destacados! */}
      <section className="bg-zinc-950 text-white py-24">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Una selección de nuestros repuestos más vendidos y confiables. La calidad que tu camión necesita, al alcance de tu mano.
          </p>
          
          {/* Reutilizamos la grilla de productos que ya creamos. ¡Esta es la magia de los componentes! */}
          <ProductGrid />
        </div>
      </section>
    </main>
  )
}