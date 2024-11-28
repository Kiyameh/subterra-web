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
  color?: 'info' | 'success' | 'warning' | 'destructive'
  children: React.ReactNode
}
export default function ResponsiveTooltip({
  content,
  className,
  color = 'info',
  children,
}: ResponsiveTooltipProps) {
  const [visible, setVisible] = useState(false)

  let bgColor = 'bg-info'
  switch (color) {
    case 'success':
      bgColor = 'bg-success'
      break
    case 'warning':
      bgColor = 'bg-warning'
      break
    case 'destructive':
      bgColor = 'bg-destructive'
      break
  }

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
            ' font-bold border border-white border-opacity-30',
            bgColor,
            className
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
