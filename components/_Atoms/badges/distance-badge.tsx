'use client'
import React from 'react'
import {Badge} from '@/components/ui/badge'
import {LuRuler} from 'react-icons/lu'

/**
 * @version 1
 * @description Badge que muestra una distancia
 * @param valueInMeters Valor de la distancia en centímetros
 */

export default function DistanceBadge({
  valueInMeters,
}: {
  valueInMeters: number | undefined
}) {
  const [distanceUnit, setDistanceUnit] = React.useState('m')
  const [divider, setDivider] = React.useState(1)

  const handleClick = () => {
    setDistanceUnit((prevUnit) => {
      switch (prevUnit) {
        case 'cm':
          return 'm'
        case 'm':
          return 'km'
        case 'km':
          return 'cm'
        default:
          return 'cm'
      }
    })
    setDivider((prevDivider) => {
      switch (prevDivider) {
        case 1:
          return 1000
        case 1000:
          return 1 / 100
        case 1 / 100:
          return 1
        default:
          return 1
      }
    })
  }

  return (
    valueInMeters && (
      <Badge
        onClick={handleClick}
        className="select-none flex flex-row gap-1 flex-nowrap rounded-full min-w-11 w-fit bg-muted hover:bg-muted-foreground/50 border border-muted-foreground text-xs font-normal text-foreground/80 cursor-pointer"
      >
        <span>{(valueInMeters / divider).toLocaleString()}</span>
        <span className="text-xs text-muted-foreground">{distanceUnit}</span>
        <span className="text-sm text-primary">
          <LuRuler />
        </span>
      </Badge>
    )
  )
}
