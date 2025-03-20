/* eslint-disable @next/next/no-img-element */
import React from 'react'

/**
 * @version 1
 * @description Card para la imagen de cabecera
 * @param src Ruta de la imagen
 * @param alt Texto alternativo de la imagen
 */

export default function MainPictureCard({
  src,
  alt,
}: {
  src: string | null | undefined
  alt?: string
}) {
  if (!src) {
    return null
  }

  return (
    <div className="w-full h-[200px] hover:h-[400px] transition-all duration-1000 rounded-lg rounded-b-n border border-muted-foreground overflow-hidden">
      <img
        src={src}
        className="w-full object-cover h-full"
        alt={alt || 'Imagen de cabecera'}
      />
    </div>
  )
}
