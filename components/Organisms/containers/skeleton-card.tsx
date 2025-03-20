import React from 'react'
import BasicCard from '@/components/Molecules/boxes/basic-card'

/**
 * @version 1
 * @description Esqueleto de card
 * @param defaultWidth Ancho por defecto ["sm": 384, "md": 460, "lg": 600, "xl": 940, "xxl": 1220]
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Card
 */

export default function SkeletonCard({
  defaultWidth = 'md',
  glassmorphism,
  className,
}: {
  defaultWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  glassmorphism?: boolean
  className?: string
}) {
  return (
    <BasicCard
      className={className}
      glassmorphism={glassmorphism}
      defaultWidth={defaultWidth}
    >
      <div className="flex flex-row gap-4">
        <div className="h-8 bg-gray-600 rounded w-8 mb-6 animate-pulse" />
        <div className="h-8 bg-gray-600 rounded w-full mb-6 animate-pulse" />
      </div>
      <div className="animate-pulse flex flex-col gap-4">
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      </div>
    </BasicCard>
  )
}
