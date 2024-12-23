import {cn} from '@/lib/utils'
import React from 'react'

export default function SkeletonHeader({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'max-w-7xl h-10 w-full mb-4 mt-6 bg-gradient-to-tl from-muted to-card rounded-lg flex gap-2 items-center justify-center border border-muted-foreground',
        className
      )}
    >
      <div className="h-5 bg-gray-600 rounded w-5 animate-pulse" />
      <div className="h-5 bg-gray-600 rounded w-36 animate-pulse" />
    </div>
  )
}
