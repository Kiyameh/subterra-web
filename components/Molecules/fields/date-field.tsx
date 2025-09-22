'use client'
import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'

import { DayPicker } from 'react-day-picker'
import { Button } from '@/components/Atoms/button'
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
import { CalendarIcon } from 'lucide-react'


/**
 * @version 1
 * @description Input de fecha controlado por RHF. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 */

export default function DateField<T extends FieldValues>({
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full bg-card h-10 pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                      fieldState.isDirty &&
                      !fieldState.error &&
                      'border-emphasis'
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP', { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <DayPicker
                    className="p-3"
                    locale={es}
                    captionLayout='dropdown'
                    mode="single"
                    classNames={{
                      nav: 'hidden',
                      caption_label: 'hidden',
                      dropdown: 'p-1 bg-card',
                      day_button: 'rounded-full flex-inline items-center justify-center p-1 w-8 h-8 m-[2px] bg-background',
                      selected: 'bg-primary text-primary-foreground rounded-full',
                    }}
                    selected={field.value}
                    onSelect={field.onChange}
                  />

                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  )
}
