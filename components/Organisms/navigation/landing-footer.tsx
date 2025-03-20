import React from 'react'
import Link from 'next/link'
import {SubterraLogoSm} from '@/components/Organisms/theme/subterra-logo'

export default function LandingFooter() {
  return (
    <footer className="w-full h-auto p-4 bg-card flex flex-col justify-center items-center space-y-4 text-sm">
      <div className="w-full flex flex-col items-center justify-center md:flex-row  md:justify-center md:space-x-6 text-yellow-500">
        <div className="order-2 md:order-1">
          <ul className="flex flex-col items-center md:items-end text-center">
            <li>
              <Link href="/privacy-policy">Politica de privacidad</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Condiciones del servicio</Link>
            </li>
            <li>
              <Link href="/cookie-policy">Politica de cookies</Link>
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2 my-4">
          <SubterraLogoSm />
        </div>
        <div className="order-3">
          <ul className="flex flex-col items-center md:items-start text-center">
            <li>
              <Link href="/user-guide">Guía de uso</Link>
            </li>
            <li>
              <Link href="/versions">Versiones y novedades</Link>
            </li>
            <li>
              <Link href="/contact">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <span>Creado por @andoni.abarzuza con 💜 </span>
        <Link
          href="/behind-the-scenes"
          className="text-yellow-500"
        >
          verComo( )
        </Link>
      </div>
    </footer>
  )
}
