'use client'
import React from 'react'
import {cn} from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Atoms/tooltip'

/**
 * @version 1
 * @description Tooltip responsivo (onTouch en mobile se muestra por 2 segundos)
 * @param content Contenido del tooltip
 * @param className Clases adicionales
 * @param color Color del tooltip ['info', 'success', 'warning', 'destructive']
 * @param children Elemento que activa el tooltip
 * @default color: 'info'
 */
export default function ResponsiveTooltip({
  content,
  className,
  color = 'info',
  children,
}: {
  content: string
  className?: string
  color?: 'info' | 'success' | 'warning' | 'destructive'
  children: React.ReactNode
}) {
  const [visible, setVisible] = React.useState(false)

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
          role="tooltip-trigger"
          asChild
          onTouchStart={handleTouch}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          role="tooltip-content"
          className={cn(
            'font-bold border border-muted-foreground',
            bgColor,
            className
          )}
        >
          <div>{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
