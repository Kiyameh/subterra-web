'use client'
import React from 'react'
import {Control, FieldValues, Path} from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import InfoBadge from '@/components/_Atoms/badges/info-badge'
import {PhoneInput} from '@/components/ui/phone-input'

/**
 * @version 1
 * @description Campo de teléfono controlado por RHF. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 */

export default function PhoneField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  placeholder?: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field, fieldState}) => (
        <FormItem className="flex flex-col items-start">
          <div className="flex gap-2">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            {description && <InfoBadge description={description} />}
          </div>
          <FormControl className="w-full">
            <PhoneInput
              className={
                fieldState.isDirty && !fieldState.error
                  ? 'border border-emphasis rounded-md'
                  : ''
              }
              placeholder={placeholder}
              {...field}
              defaultCountry="ES"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
