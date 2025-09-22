'use client'
import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'

import { Button } from '@/components/Atoms/button'
import { Badge } from '@/components/Atoms/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Atoms/popover'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Atoms/form'
import InfoBadge from '@/components/Molecules/badges/info-badge'

import { X as RemoveIcon } from 'lucide-react'
import { CalendarIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
/**
 * @version 1
 * @description Input de fecha multiple controlado por RHF. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 */

export default function MultiDateField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <FormItem className="space-y-1">
            <div className="flex gap-2">
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
              {description && <InfoBadge description={description} />}
            </div>
            <FormControl>
              <MultiDateInput
                value={field.value}
                onChange={(value) => field.onChange(value)}
                isDirty={fieldState.isDirty}
                error={!!fieldState.error}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  )
}

function MultiDateInput({
  value,
  onChange,
  isDirty,
  error,
}: {
  value: Date[]
  onChange: (value: Date[]) => void
  isDirty: boolean
  error: boolean
}) {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>(value || [])

  function handleSelect(dates: Date[] | undefined) {
    console.log(dates)
    console.log(selectedDates)

    setSelectedDates(dates || [])
    onChange(dates || [])
  }

  function handleDelete(date: Date) {
    setSelectedDates(selectedDates.filter((d) => d !== date))
    onChange(selectedDates.filter((d) => d !== date))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full bg-card h-10 pl-3 text-left font-normal',
            !value && 'text-muted-foreground',
            isDirty && !error && 'border-emphasis'
          )}
        >
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              {selectedDates.length}
            </span>
            Fechas seleccionadas
          </div>
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 flex flex-row "
        align="start"
      >
        <DayPicker
          className="p-3"
          locale={es}
          captionLayout='dropdown'
          classNames={{
            nav: 'hidden',
            caption_label: 'hidden',
            dropdown: 'p-1 bg-card',
            day_button: 'rounded-full flex-inline items-center justify-center p-1 w-8 h-8 m-[2px] bg-background',
            selected: 'bg-primary text-primary-foreground rounded-full',
          }}
          mode='multiple'
          selected={selectedDates}
          onSelect={(dates) => handleSelect(dates)}
        />
        <div className="flex flex-col max-h-80 flex-wrap gap-1 mt-2 p-2">
          {selectedDates.map((date, index) => (
            <Badge
              variant="secondary"
              key={index}
              className="flex flex-row-reverse justify-start gap-1"
            >
              <RemoveIcon
                className="ml-1 h-4 w-4 cursor-pointer"
                onClick={() => handleDelete(date)}
              />
              {format(date, 'dMMM', { locale: es })}
            </Badge>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
