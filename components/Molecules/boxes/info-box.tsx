import React from 'react'
import {cn} from '@/lib/utils'
import {BsQuestionCircleFill} from 'react-icons/bs'

/**
 * @version 1
 * @description Componente que muestra un contenido con un título y un icono.
 * @param title Título del contenido.
 * @param color Color del icono <"info" | "success" | "warning" | "destructive">
 * @param icon Icono a mostrar.
 * @param children Contenido del componente.
 * @param className Clases adicionales para el componente.
 * @default
 * color "info" icon-Icono de interrogación
 */
export default function InfoBox({
  title,
  color = 'info',
  icon = <BsQuestionCircleFill />,
  children,
  className,
}: {
  title?: React.ReactNode
  color?: 'info' | 'success' | 'warning' | 'destructive'
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  let iconColor = 'text-info-foreground'
  switch (color) {
    case 'success':
      iconColor = 'text-success-foreground'
      break
    case 'warning':
      iconColor = 'text-warning-foreground'
      break
    case 'destructive':
      iconColor = 'text-destructive-foreground'
      break
  }

  return (
    <>
      <div
        className={cn(
          'w-full m-auto bg-muted text-muted-foreground px-4 py-3 rounded-lg space-y-2',
          className
        )}
      >
        <div className="flex gap-2 items-center">
          <span className={cn('text-lg', iconColor)}>{icon}</span>
          <div>{title}</div>
        </div>
        <div>{children}</div>
      </div>
    </>
  )
}
