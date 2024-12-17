import React from 'react'
import {Badge} from '@/components/ui/badge'
import {cn} from '@/lib/utils'

/**
 * @version 1
 * @description Badge que muestra un valor booleano
 * @param value Valor booleano
 * @param invertedColor Color invertido
 */

export default function BooleanBadge({
  value,
  invertedColor,
}: {
  value: boolean | undefined
  invertedColor?: boolean
}) {
  const color =
    value != invertedColor
      ? 'text-success-foreground border-success-foreground hover:bg-success'
      : 'text-destructive-foreground border-destructive-foreground hover:bg-destructive '
  return (
    <>
      {value && (
        <Badge
          className={cn(
            'select-none rounded-full justify-center min-w-14 w-fit bg-card border font-normal',
            color
          )}
        >
          {value ? 'Si' : 'No'}
        </Badge>
      )}
    </>
  )
}
