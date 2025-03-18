'use client'
import React, {RefCallback} from 'react'
import {Switch} from './switch'

export default function LabeledSwitch({
  falsyLabel = 'No',
  truthyLabel = 'Si',
  isDirty,
  value,
  onChange,
  onBlur,
  disabled,
  name,
  ref,
}: {
  falsyLabel?: string
  truthyLabel?: string
  isDirty: boolean
  value: boolean
  onChange: (value: boolean) => void
  onBlur?: () => void
  disabled?: boolean
  name?: string
  ref?: RefCallback<HTMLButtonElement>
}) {
  const [checked, setChecked] = React.useState<boolean>(value)

  function handleChange() {
    const newValue = !checked
    setChecked(newValue)
    onChange(newValue)
  }

  return (
    <div
      className={
        isDirty
          ? 'w-fit border rounded-xl border-emphasis p-1'
          : 'w-fit border rounded-xl border-transparent p-1'
      }
    >
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium bg-card rounded-lg">
        <Switch
          checked={checked}
          onCheckedChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          name={name}
          ref={ref}
          className="peer absolute inset-0 h-[inherit] w-auto rounded-lg data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
        />
        <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
          <span className="text-[10px] font-medium uppercase">
            {falsyLabel}
          </span>
        </span>
        <span className="min-w-78flex pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full ">
          <span className="text-[10px] text-primary-foreground font-medium uppercase">
            {truthyLabel}
          </span>
        </span>
      </div>
    </div>
  )
}
