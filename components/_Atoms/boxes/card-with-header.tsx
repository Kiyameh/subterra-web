import React from 'react'
import {cn} from '@/lib/utils'
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'
import {SubterraLogoMd} from '@/components/branding/subterra-logo'
import BackButton from '@/components/_Atoms/buttons/back-button'

/**
 * @version 1
 * @description Componente card personalizado con cabecera de navegación y branding
 * @param defaultWidth Ancho por defecto ["sm": 384, "md": 460, "lg": 600, "xl": 940, "xxl": 1220]
 * @param cardSubHeader Cabecera de la card
 * @param cardFooter Pie de la card
 * @param children Contenido de la card
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Card
 * @default defaultWidth "md"
 */
export default function CardWithHeader({
  defaultWidth = 'md',
  cardSubHeader,
  cardFooter,
  children,
  glassmorphism = false,
  className,
}: {
  defaultWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  cardSubHeader?: React.ReactNode
  cardFooter?: React.ReactNode
  children?: React.ReactNode
  glassmorphism?: boolean
  className?: string
}) {
  const sizeMap = {
    sm: 'w-[384px] max-w-[90vw]',
    md: 'w-[460px] max-w-[90vw]',
    lg: 'w-[600px] max-w-[90vw]',
    xl: 'w-[940px] max-w-[90vw]',
    xxl: 'w-[1220px] max-w-[90vw]',
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
        <CardHeader>
          <div className="flex justify-between items-center">
            <SubterraLogoMd />
            <BackButton size="sm" />
          </div>
        </CardHeader>
        <CardHeader>{cardSubHeader}</CardHeader>
        {children && (
          <CardContent className="flex flex-col gap-2">{children}</CardContent>
        )}
      </div>
      <CardFooter className="flex gap-2">{cardFooter}</CardFooter>
    </Card>
  )
}
