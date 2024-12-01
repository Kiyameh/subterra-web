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

/**
 * Componente card personalizado
 * @default width 'max-w-md'
 * @param image Imagen superior
 * @param icon Icono
 * @param title Título de la card
 * @param code Código que aparece a la derecha del título
 * @param description Descripción
 * @param content Contenido de la card
 * @param children Contenido de la card
 * @param action1 Acción 1 de la card
 * @param action2 Acción 2 de la card
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Card
 *
 */
export default function SimpleCard({
  image,
  icon,
  title,
  code,
  description,
  content,
  children,
  action1,
  action2,
  glassmorphism = false,
  className,
}: {
  image?: StaticImport
  icon?: React.ReactNode
  title: string
  code?: string
  description?: string
  content?: React.ReactNode
  children?: React.ReactNode
  action1?: React.ReactNode
  action2?: React.ReactNode
  glassmorphism?: boolean
  className?: string
}) {
  const solid = `max-w-md	border border-muted-foreground flex flex-col justify-between`
  const glass = `max-w-md	bg-black bg-opacity-20 backdrop-blur-sm border border-muted-foreground flex flex-col justify-between`
  const background = glassmorphism ? glass : solid
  const style = className ? cn(background, className) : background

  return (
    <Card className={style}>
      <div>
        {image && (
          <div className="flex items-center justify-center h-48 overflow-hidden rounded-t-xl">
            <Image
              src={image}
              alt={title}
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xl">
              {icon}
              {title}
            </div>
            {code && (
              <a
                href={`https://http.cat/status/${code}`}
                target="_blank"
                className="text-2xl text-foreground/20"
              >
                {code}
              </a>
            )}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {children}
          {content}
        </CardContent>
      </div>
      <CardFooter className="flex gap-2">
        {action1 && (
          <div className={action2 ? 'w-1/2' : 'w-full'}>{action1}</div>
        )}
        {action2 && <div className="w-1/2">{action2}</div>}
      </CardFooter>
    </Card>
  )
}
