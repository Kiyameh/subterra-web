import React from 'react'
import Image from 'next/image'
import {cn} from '@/lib/utils'
import {StaticImport} from 'next/dist/shared/lib/get-img-props'
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'

/**
 * @version 1
 * @description Card con slots para imagen, heaedr, footer y children. Opción glassmorphism.
 * @param defaultWidth Ancho por defecto ["md": 460, "lg": 600, "xl": 800, "xxl": 1024]
 * @param image Imagen superior
 * @param cardHeader Cabecera de la card
 * @param cardFooter Pie de la card
 * @param children Contenido de la card
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Card
 * @default defaultWidth "md"
 */

export default function BasicCard({
  defaultWidth = 'md',
  image,
  cardHeader,
  cardFooter,
  children,
  glassmorphism = false,
  className,
}: {
  defaultWidth?: 'md' | 'lg' | 'xl' | 'xxl'
  image?: StaticImport
  cardHeader?: React.ReactNode
  cardFooter?: React.ReactNode
  children: React.ReactNode
  glassmorphism?: boolean
  className?: string
}) {
  const sizeMap = {
    md: 'w-[460px] max-w-[90vw]',
    lg: 'w-[600px] max-w-[90vw]',
    xl: 'w-[800px] max-w-[90vw]',
    xxl: 'w-[1024px] max-w-[90vw]',
  }
  const width = sizeMap[defaultWidth]
  const glass = glassmorphism ? 'bg-black bg-opacity-50 backdrop-blur-sm' : ''

  const style = cn(
    'border border-muted-foreground flex flex-col justify-between',
    glass,
    width,
    className
  )

  return (
    <Card className={style}>
      <div>
        {image && (
          <div className="flex items-center justify-center h-48 overflow-hidden rounded-t-xl">
            <Image
              src={image}
              alt="Imagen decorativa de la card"
            />
          </div>
        )}
        <CardHeader>{cardHeader}</CardHeader>
        <CardContent className="flex flex-col gap-2">{children}</CardContent>
      </div>
      <CardFooter className="flex gap-2">{cardFooter}</CardFooter>
    </Card>
  )
}
