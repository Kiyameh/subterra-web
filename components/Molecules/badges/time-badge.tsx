'use client'
import React from 'react'

import {Badge} from '@/components/Atoms/badge'

import {FaClockRotateLeft} from 'react-icons/fa6'

/**
 * @version 1
 * @description Badge que muestra un tiempo
 * @param value Valor de la fecha
 */

export default function TimeBadge({
  valueInSeconds,
}: {
  valueInSeconds: number | undefined
}) {
  const [timeUnit, setTimeUnit] = React.useState('mins')
  const [divider, setDivider] = React.useState(60)
  const handleClick = () => {
    setTimeUnit((prevUnit) => {
      switch (prevUnit) {
        case 'sec':
          return 'mins'
        case 'mins':
          return 'hrs'
        case 'hrs':
          return 'sec'
        default:
          return 'sec'
      }
    })
    setDivider((prevDivider) => {
      switch (prevDivider) {
        case 1:
          return 60
        case 60:
          return 3600
        case 3600:
          return 1
        default:
          return 1
      }
    })
  }

  return (
    <>
      {valueInSeconds && (
        <Badge
          role="badge"
          onClick={handleClick}
          className="select-none flex flex-row gap-1 flex-nowrap rounded-full min-w-11 w-fit bg-muted hover:bg-muted-foreground/50 border border-muted-foreground text-xs font-normal text-foreground/80 cursor-pointer"
        >
          <span>{valueInSeconds / divider}</span>
          <span className="text-xs text-muted-foreground">{timeUnit}</span>
          <span className="text-sm text-primary">
            <FaClockRotateLeft />
          </span>
        </Badge>
      )}
    </>
  )
}
