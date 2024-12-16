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
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from '@/components/ui/multi-select'
import InfoBadge from '@/components/_Atoms/indicators/info-badge'

/**
 * @version 1
 * @description Campo de selección múltiple controlado por RHF. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param options Opciones del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 */

export default function MultiSelectField<T extends FieldValues>({
  control,
  name,
  options,
  label,
  description,
  placeholder,
}: {
  control: Control<T>
  name: Path<T>
  options: string[]
  label?: string
  description?: string
  placeholder?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field, fieldState}) => (
        <FormItem>
          <div className="flex gap-2">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            {description && <InfoBadge description={description} />}
          </div>
          <FormControl>
            <MultiSelector
              values={field.value as string[]}
              onValuesChange={field.onChange}
              loop
            >
              <MultiSelectorTrigger
                ref={field.ref}
                onBlur={field.onBlur}
                className={
                  fieldState.isDirty && !fieldState.error
                    ? 'border border-emphasis'
                    : ''
                }
              >
                <MultiSelectorInput placeholder={placeholder} />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {options.map((item) => (
                    <MultiSelectorItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
