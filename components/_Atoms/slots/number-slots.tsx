'use client'
import React from 'react'

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
}: {
  label: string
  valueInMeters?: number
}) {
  const [unit, setUnit] = React.useState(1)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1">
        {valueInMeters && (
          <>
            <span className="text-sm">{Number(valueInMeters) * unit}</span>
            <select
              className="text-muted-foreground bg-transparent text-right rounded-md border-none"
              value={unit}
              onChange={(e) => setUnit(Number(e.target.value))}
            >
              <option
                className="bg-muted"
                value={10}
              >
                cm
              </option>
              <option
                className="bg-muted"
                value={1}
              >
                m
              </option>
              <option
                className="bg-muted"
                value={0.1}
              >
                km
              </option>
            </select>
          </>
        )}
      </div>
    </div>
  )
}

/**
 * @version 1
 * @description Slot de tiempo con label y valor
 * @param label Texto del slot
 * @param valueInMinutes Valor del tiempo en minutos
 */

export function TimeSlot({
  label,
  valueInMinutes,
}: {
  label: string
  valueInMinutes?: number
}) {
  const [unit, setUnit] = React.useState(1)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1">
        {valueInMinutes && (
          <>
            <span className="text-sm">{Number(valueInMinutes) * unit}</span>
            <select
              className="text-muted-foreground bg-transparent text-right rounded-md border-none"
              value={unit}
              onChange={(e) => setUnit(Number(e.target.value))}
            >
              <option
                className="bg-muted"
                value={1}
              >
                min
              </option>
              <option
                className="bg-muted"
                value={1 / 60}
              >
                horas
              </option>
              <option
                className="bg-muted"
                value={1 / 60 / 24}
              >
                dias
              </option>
            </select>
          </>
        )}
      </div>
    </div>
  )
}
