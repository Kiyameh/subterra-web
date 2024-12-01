import React from 'react'
import {cn} from '@/lib/utils'

/**
 * @version 1
 * @description Componente básico de caja con opciones de glassmorphism
 * @param defaultWidth Ancho por defecto ["md": 460, "lg": 600, "xl": 800, "xxl": 1024]
 * @param children Contenido de la card
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Card
 * @default defaultWidth "md"
 */
export default function SimpleBox({
  defaultWidth = 'md',
  children,
  glassmorphism = false,
  className,
}: {
  defaultWidth?: 'md' | 'lg' | 'xl' | 'xxl'
  children?: React.ReactNode
  glassmorphism?: boolean
  className?: string
}) {
  const sizeMap = {
    md: 'w-[460px]',
    lg: 'w-[600px]',
    xl: 'w-[800px]',
    xxl: 'w-[1024px]',
  }
  const width = sizeMap[defaultWidth]
  const glass = glassmorphism ? 'bg-black bg-opacity-20 backdrop-blur-sm' : ''

  const style = cn(
    'max-w-[90%]	border border-muted-foreground flex flex-col justify-between p-6 rounded-xl',
    glass,
    width,
    className
  )
  return <div className={style}>{children}</div>
}
