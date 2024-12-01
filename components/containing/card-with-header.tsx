import React from 'react'
import {cn} from '@/lib/utils'
import {Card, CardContent, CardFooter, CardHeader} from '../ui/card'
import SubterraLogo from '../branding/subterra-logo'
import BackButton from '../navigation/back-button'

/**
 * Componente card personalizado con cabecera de navegación y branding
 * @param defaultWidth Ancho por defecto [md: 460, lg: 600, xl: 800, xxl: 1024]
 * @param cardSubHeader Cabecera de la card
 * @param cardFooter Pie de la card
 * @param children Contenido de la card
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Card
 */
export default function CardWithHeader({
  defaultWidth = 'md',
  cardSubHeader,
  cardFooter,
  children,
  glassmorphism = false,
  className,
}: {
  defaultWidth?: 'md' | 'lg' | 'xl' | 'xxl'
  cardSubHeader?: React.ReactNode
  cardFooter?: React.ReactNode
  children: React.ReactNode
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
    'max-w-[90%]	border border-muted-foreground flex flex-col justify-between',
    glass,
    width,
    className
  )

  return (
    <Card className={style}>
      <div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <SubterraLogo size="medium" />
            <BackButton size="sm" />
          </div>
        </CardHeader>
        <CardHeader>{cardSubHeader}</CardHeader>
        <CardContent className="flex flex-col gap-2">{children}</CardContent>
      </div>
      <CardFooter className="flex gap-2">{cardFooter}</CardFooter>
    </Card>
  )
}
