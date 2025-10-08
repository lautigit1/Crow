// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer' // <-- 1. IMPORTAMOS EL FOOTER

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CrowRepuestos - Repuestos para Camiones',
  description: 'La mejor tienda de repuestos para camiones.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer /> {/* <-- 2. LO PONEMOS ACÁ, AL FINAL DE TODO */}
      </body>
    </html>
  )
}