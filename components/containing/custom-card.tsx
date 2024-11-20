import React from 'react'
import Image from 'next/image'
import {StaticImport} from 'next/dist/shared/lib/get-img-props'
import {cn} from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface CustomCardProps {
  image?: StaticImport
  icon?: React.ReactNode
  title: string
  description?: string
  content?: React.ReactNode
  children?: React.ReactNode
  action1?: React.ReactNode
  action2?: React.ReactNode
  glassmorphism?: boolean
  className?: string
}
/**
 * Componente card personalizado
 * @param image Imagen superior
 * @param icon Icono
 * @param title Título de la card
 * @param description Descripción
 * @param content Contenido de la card
 * @param children Contenido de la card
 * @param action1 Acción 1 de la card
 * @param action2 Acción 2 de la card
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Card
 *
 */
export default function CustomCard({
  image,
  icon,
  title,
  description,
  content,
  children,
  action1,
  action2,
  glassmorphism = false,
  className,
}: CustomCardProps) {
  const solid = `max-w-md	 border border-gray-600`
  const glass = `max-w-md	 bg-black bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30`
  const background = glassmorphism ? glass : solid

  const style = className ? cn(background, className) : background

  return (
    <Card className={style}>
      {image && (
        <div className="flex items-center justify-center h-48 overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={title}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {icon}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
        {content}
      </CardContent>
      <CardFooter className="flex gap-2">
        {action1 && (
          <div className={action2 ? 'w-1/2' : 'w-full'}>{action1}</div>
        )}
        {action2 && <div className="w-1/2">{action2}</div>}
      </CardFooter>
    </Card>
  )
}
