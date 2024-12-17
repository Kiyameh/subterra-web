import {cn} from '@/lib/utils'
import React from 'react'

/**
 * @version 1
 * @description Caja de titulo para separar secciones (<h2>)
 * @param text texto del encabezado
 * @param icon icono del encabezado
 * @param className clases adicionales
 */

export default function HeaderBox({
  text,
  icon,
  className,
}: {
  text: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-7xl w-full px-2 py-1 mb-4 mt-6  bg-gradient-to-tl from-muted to-card rounded-lg flex gap-2 items-center justify-center text-card-foreground border border-muted-foreground',
        className
      )}
    >
      {icon}
      <h2 className="text-lg">{text}</h2>
    </div>
  )
}
