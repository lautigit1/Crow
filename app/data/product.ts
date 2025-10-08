// app/data/product.ts

import { Product } from '@/app/types/product';

// ¡Nuestra base de datos de repuestos de mentirita!
export const products: Product[] = [
  {
    id: 'FIL-AIR-SC113',
    nombre: 'Filtro de Aire Competición',
    marca: 'Scania',
    modeloCompatible: 'Serie 4 / R113 / P113',
    precio: 85000.00,
    stock: 120,
    etiqueta: 'Más Vendido',
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Optimiza el rendimiento del motor con máxima filtración.',
  },
  {
    id: 'DISC-FRE-VOLFH',
    nombre: 'Kit Discos de Freno Ventilados (Eje Delantero)',
    marca: 'Volvo',
    modeloCompatible: 'FH16 / FH12 / FM',
    precio: 250000.00,
    stock: 35,
    etiqueta: 'Oferta',
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Máxima seguridad y durabilidad para tu sistema de frenos.',
  },
  {
    id: 'BOM-AGUA-CUMISX',
    nombre: 'Bomba de Agua Reforzada',
    marca: 'Cummins',
    modeloCompatible: 'ISX15 / ISX12',
    precio: 140000.00,
    stock: 80,
    etiqueta: 'Novedad',
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Mantiene la temperatura ideal del motor bajo cualquier condición.',
  },
  {
    id: 'AMOR-TRAS-MBAXR',
    nombre: 'Amortiguador Trasero de Gas',
    marca: 'Mercedes-Benz',
    modeloCompatible: 'Actros / Axor',
    precio: 98000.00,
    stock: 50,
    etiqueta: null,
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Confort y estabilidad en los terrenos más exigentes.',
  },
  {
    id: 'CORREA-ALT-IVECO',
    nombre: 'Correa de Distribución Reforzada',
    marca: 'Iveco',
    modeloCompatible: 'Stralis / Trakker',
    precio: 45000.00,
    stock: 15,
    etiqueta: 'Pocas Unidades',
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Componente esencial para el correcto funcionamiento del motor.',
  },
  {
    id: 'TURBO-MAN-SCA4',
    nombre: 'Turbo Compresor de Alto Rendimiento',
    marca: 'Garrett',
    modeloCompatible: 'Scania Serie 4 / R124',
    precio: 450000.00,
    stock: 5,
    etiqueta: 'Oferta',
    imagenUrl: '/images/camion-hero.png',
    descripcionCorta: 'Incrementa la potencia y eficiencia de tu motor.',
  },
  // Puedes agregar más productos aquí siguiendo la misma estructura
];