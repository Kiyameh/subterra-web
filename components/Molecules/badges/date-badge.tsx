import React from 'react'
import {Badge} from '@/components/Atoms/badge'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'
import ResponsiveTooltip from './responsive-tooltip'

/**
 * @version 1
 * @description Badge que muestra una fecha con un tooltip
 * @param value Valor de la fecha
 */

export default function DateBadge({value}: {value: Date | undefined}) {
  return (
    <>
      {value && (
        <ResponsiveTooltip
          content={format(value, 'd MMMM y, EEEE', {locale: es})}
        >
          <Badge className="select-none rounded-full justify-center min-w-11 w-fit bg-muted hover:bg-muted-foreground/50 border border-muted-foreground text-xs font-normal text-foreground/80 cursor-help">
            {format(value, 'd MMM yy', {locale: es})}
          </Badge>
        </ResponsiveTooltip>
      )}
    </>
  )
}
