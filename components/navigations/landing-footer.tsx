import React from 'react'
import Link from 'next/link'
import {SubterraLogoSm} from '@/components/branding/subterra-logo'

export default function LandingFooter() {
  return (
    <footer className="text-sm h-auto p-4 w-full bg-card flex flex-col justify-center items-center space-y-4">
      <div className="flex justify-center space-x-6 items-center">
        <ul className="flex flex-col justify-center items-end space-x-4">
          <li>
            <Link
              href="/privacy-policy"
              className="text-yellow-500"
            >
              Politica de privacidad
            </Link>
          </li>
          <li>
            <Link
              href="/terms-of-service"
              className="text-yellow-500"
            >
              Condiciones del servicio
            </Link>
          </li>
          <li>
            <Link
              href="/cookie-policy"
              className="text-yellow-500"
            >
              Politica de cookies
            </Link>
          </li>
        </ul>
        <SubterraLogoSm />
        <ul className="flex flex-col justify-center items-start">
          <li>
            <Link
              href="/user-guide"
              className="text-yellow-500"
            >
              Guía de uso
            </Link>
          </li>
          <li>
            <Link
              href="/versions"
              className="text-yellow-500"
            >
              Versiones y novedades
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-yellow-500"
            >
              Contacto
            </Link>
          </li>
        </ul>
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
