'use client'
import React, {useState} from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import {cn} from '@/lib/utils'

interface ResponsiveTooltipProps {
  content: string
  className?: string
  children: React.ReactNode
}
export default function ResponsiveTooltip({
  content,
  className,
  children,
}: ResponsiveTooltipProps) {
  const [visible, setVisible] = useState(false)

  function handleTouch() {
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 2000)
  }

  return (
    <TooltipProvider>
      <Tooltip open={visible}>
        <TooltipTrigger
          asChild
          onTouchStart={handleTouch}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            'bg-slate-900 font-bold border border-white border-opacity-30',
            className
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
