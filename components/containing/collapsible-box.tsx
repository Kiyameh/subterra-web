import React from 'react'
import {cn} from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {BsQuestionCircleFill} from 'react-icons/bs'

interface CollapsibleBoxProps {
  title: string
  color?: 'info' | 'success' | 'warning' | 'destructive'
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}
/**
 * Componente que muestra un contenido colapsable con un título y un icono.
 * @param title Título del contenido colapsable.
 * @param color Color del icono <info | success | warning | destructive> default: info
 * @param icon Icono a mostrar. default: <BsQuestionCircleFill />
 * @param children Contenido del componente.
 * @param className Clases adicionales para el componente.
 */
export default function CollapsibleBox({
  title,
  color = 'info',
  icon = <BsQuestionCircleFill />,
  children,
  className,
}: CollapsibleBoxProps) {
  let iconColor = 'text-info-foreground'
  switch (color) {
    case 'success':
      iconColor = 'text-success-foreground'
      break
    case 'warning':
      iconColor = 'text-warning-foreground'
      break
    case 'destructive':
      iconColor = 'text-destructive-foreground'
      break
  }

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className={cn(
          'w-[640px] max-w-[90vw] m-auto bg-muted text-muted-foreground px-4  rounded-lg',
          className
        )}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex gap-2">
              <span className={cn('text-lg', iconColor)}>{icon}</span>
              <span>{title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
