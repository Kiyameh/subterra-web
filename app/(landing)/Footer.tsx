import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="h-24 w-full bg-gray-900 text-white flex flex-col justify-center items-center">
      <p>Creado por @andoni.abarzuza con 💜 </p>
      <Link
        href="/behind-the-scenes"
        className="text-yellow-500"
      >
        verComo( )
      </Link>
    </footer>
  )
}
