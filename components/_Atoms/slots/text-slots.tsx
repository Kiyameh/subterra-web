import React from 'react'

/**
 * @version 1
 * @description Slot de texto con label y valor
 * @param label Texto del slot
 * @param value Valor del slot
 * @param endAdornment Adorno al final del slot
 */

export function TextSlot({
  label,
  value,
  endAdornment,
}: {
  label: string
  value?: string | number | undefined
  endAdornment?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1 items-center">
        <span className="text-sm">{value}</span>
        <span>{endAdornment}</span>
      </div>
    </div>
  )
}

/**
 * @version 1
 * @description Slot de textos multiples con label y valores
 * @param label Texto del slot
 * @param values Valores del slot
 * @param endAdornment Adorno al final del slot
 */

export function MultiTextSlot({
  label,
  values,
  endAdornment,
}: {
  label: string
  values?: string[] | number[] | undefined
  endAdornment?: React.ReactNode
}) {
  const chainedValues = values?.map((value: string | number, i: number) => (
    <span key={i}>
      {value}
      {i < values.length - 1 ? ', ' : ''}
    </span>
  ))

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1 items-center">
        <span className="text-sm">{chainedValues}</span>
        <span>{endAdornment}</span>
      </div>
    </div>
  )
}
