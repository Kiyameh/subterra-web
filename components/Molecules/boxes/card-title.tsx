import React from 'react'
import {cn} from '@/lib/utils'

/**
 * @version 1
 * @description Titulo para cards, tables, etc... (<h3>)
 * @param title texto del encabezado
 * @param subtitle icono del encabezado
 * @param icon icono del encabezado
 * @param className clases adicionales
 */

export default function CardTitle({
  title,
  subtitle,
  icon,
  className,
}: {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div>
      <div
        className={cn(
          'flex flex-row gap-2 items-center text-base flex-wrap',
          className
        )}
      >
        {icon}
        <h3 className="text-lg">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  )
}
