import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'

export default function SkeletonCard() {
  return (
    <BasicCard defaultWidth="xl">
      <div className="animate-pulse flex flex-col gap-4">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </BasicCard>
  )
}
