// app/types/product.d.ts

// Definimos la estructura (o "forma") que tendrá cada repuesto.
export type Product = {
  id: string; // SKU único del producto
  nombre: string;
  marca: string;
  modeloCompatible: string; // Ej: "Serie 4 / 113", "Cummins ISX"
  precio: number; // Siempre en número, para poder hacer cálculos
  stock: number;
  etiqueta?: 'Oferta' | 'Más Vendido' | 'Novedad' | 'Pocas Unidades' | null; // Opcional, para destacar
  imagenUrl: string; // Ruta a la imagen del repuesto
  descripcionCorta: string; // Un resumen de 1-2 líneas
};