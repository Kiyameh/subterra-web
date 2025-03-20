import React from 'react'
import {Badge} from '@/components/Atoms/badge'

/**
 * @version 1
 * @description Badge que muestra un número con sus unidades
 * @param value Valor de la fecha
 */

export default function NumberBadge({
  value,
  units,
}: {
  value: number | string | undefined
  units?: string
}) {
  return (
    <>
      {value && (
        <Badge className="select-none flex flex-row gap-1 flex-nowrap rounded-full min-w-11 w-fit bg-muted hover:bg-muted-foreground/50 border border-muted-foreground text-xs font-normal text-foreground/80">
          <span>{value}</span>
          <span className="text-xs text-muted-foreground">{units}</span>
        </Badge>
      )}
    </>
  )
}
