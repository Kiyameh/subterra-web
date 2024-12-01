import React from 'react'
import {cn} from '@/lib/utils'

/**
 * Componente Box personalizado
 * @default width 'max-w-md'
 * @param children Contenido de la card
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Card
 *
 */
export default function SimpleBox({
  children,
  glassmorphism = false,
  className,
}: {
  children?: React.ReactNode
  glassmorphism?: boolean
  className?: string
}) {
  const solid = `max-w-md border border-muted-foreground p-6 rounded-xl`
  const glass = `max-w-md	bg-black bg-opacity-20 backdrop-blur-sm border border-muted-foreground p-6 rounded-xl`
  const background = glassmorphism ? glass : solid

  const style = className ? cn(background, className) : background

  return <div className={style}>{children}</div>
}
