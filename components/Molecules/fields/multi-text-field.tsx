'use client'
import {Control, FieldValues, Path} from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Atoms/form'
import InfoBadge from '@/components/Molecules/badges/info-badge'
import {TagsInput} from '@/components/Atoms/tags-input'

/**
 * @version 1
 * @description Input de texto multiple (TAGS) controlado por RHF. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @default type 'text'
 */

export default function MultiTextField<T extends FieldValues>({
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
        <>
          <FormItem className="space-y-1">
            <div className="flex gap-2">
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
              {description && <InfoBadge description={description} />}
            </div>
            <FormControl>
              <TagsInput
                className={
                  fieldState.isDirty && !fieldState.error
                    ? 'border border-emphasis'
                    : ''
                }
                id={name}
                value={field.value}
                onValueChange={field.onChange}
                placeholder={placeholder}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  )
}
