'use client'
import React from 'react'
import TimeBadge from '../badges/time-badge'
import DistanceBadge from '../badges/distance-badge'

/**
 * @version 1
 * @description Slot de número con label y valor
 * @param label Texto del slot
 * @param value Valor del slot
 * @param withMillarDots Mostrar valor con puntos millares
 * @param endAdornment Adorno al final del slot
 */

export function NumberSlot({
  label,
  value,
  withMillarDots,
  endAdornment,
}: {
  label: string
  value?: number
  withMillarDots?: boolean
  endAdornment?: React.ReactNode
}) {
  const withDots = value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') || ''

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1 items-center">
        <span className="text-sm">{withMillarDots ? withDots : value}</span>
        <span>{endAdornment}</span>
      </div>
    </div>
  )
}

/**
 * @version 1
 * @description Slot de distancia con label y valor
 * @param label Texto del slot
 * @param valueInMeters Valor de la distancia en metros
 */

export function DistanceSlot({
  label,
  valueInMeters,
  fixedUnits,
}: {
  label: string
  valueInMeters?: number
  fixedUnits?: boolean
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1">
        {valueInMeters && (
          <DistanceBadge
            fixedUnits={fixedUnits}
            valueInMeters={valueInMeters}
          />
        )}
      </div>
    </div>
  )
}

/**
 * @version 1
 * @description Slot de tiempo con label y valor
 * @param label Texto del slot
 * @param valueInSeconds Valor del tiempo en minutos
 */

export function TimeSlot({
  label,
  valueInSeconds,
}: {
  label: string
  valueInSeconds?: number
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1">
        {valueInSeconds && <TimeBadge valueInSeconds={valueInSeconds} />}
      </div>
    </div>
  )
}
