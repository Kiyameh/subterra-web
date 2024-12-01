import React, {HTMLAttributes} from 'react'
import {cn} from '@/lib/utils'

/**
 * @version 1
 * @description Componente para envolver las páginas con el patrón de curvas de nivel y un flex vertical
 * @param className Clases adicionales para el contenedor
 * @param withPattern Indica si se debe mostrar el patrón de curvas de nivel
 * @param children Contenido de la página
 * @default withPattern true
 */
export default function PageContainer({
  className,
  children,
  withPattern = true,
  ...props
}: {
  className?: string
  withPattern?: boolean
  children: React.ReactNode
} & HTMLAttributes<HTMLElement>) {
  const style = withPattern
    ? {backgroundImage: 'url(/backgrounds/topography.svg)'}
    : {}

  return (
    <main
      className={cn(
        'flex min-h-screen w-full flex-col items-center justify-center gap-4 p-4',
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </main>
  )
}
