'use client'
import React from 'react'
import {Control, FieldValues, Path} from 'react-hook-form'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'
import {cn} from '@/lib/utils'

import InfoBadge from '@/components/_Atoms/indicators/info-badge'
import {Calendar} from '@/components/ui/calendar'
import {Button} from '@/components/ui/button'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {CalendarIcon} from 'lucide-react'

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
      render={({field, fieldState}) => (
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
                      format(field.value, 'PPP', {locale: es})
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
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
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
