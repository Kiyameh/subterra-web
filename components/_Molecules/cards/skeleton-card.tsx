import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'

export default function SkeletonCard({
  defaultWidth = 'md',
  className,
}: {
  defaultWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  className?: string
}) {
  return (
    <BasicCard
      className={className}
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
