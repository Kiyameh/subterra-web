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
import InfoBadge from '@/components/_Atoms/badges/info-badge'

import {GroupIndex} from '@/database/models/Group.model'
import {CaveIndex} from '@/database/services/cave.actions'
import {ExplorationIndex} from '@/database/services/exploration.actions'
import {SystemIndex} from '@/database/services/system.actions'

/**
 * @version 1
 * @description Campo de selección múltiple de REFs controlado por RHF. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @param index Opciones del campo
 */

export default function MultiRefSelectField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  fetchingErrorText = 'Error al cargar opciones, puedes editar este dato más tarde',
  noOptionsText = 'Todavía no hay opciones disponibles',

  index,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  placeholder?: string
  fetchingErrorText?: string
  noOptionsText?: string
  index:
    | GroupIndex[]
    | CaveIndex[]
    | SystemIndex[]
    | ExplorationIndex[]
    | undefined
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
            {!index ? (
              <div className="h-10 w-full rounded-md border border-muted flex items-center justify-start text-xs text-destructive-foreground/80 px-2 py-1 ">
                {fetchingErrorText}
              </div>
            ) : index.length === 0 ? (
              <div className="h-10 w-full rounded-md border border-muted flex items-center justify-start text-xs text-destructive-foreground/80 px-2 py-1 ">
                {noOptionsText}
              </div>
            ) : (
              <MultiSelector
                values={field.value as string[]} // Asegúrate de que los valores sean compatibles
                onValuesChange={(newValues) => {
                  const selectedOptions = index.filter((option) =>
                    newValues.includes(option._id as string)
                  )
                  field.onChange(selectedOptions.map((option) => option._id))
                }}
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
                    {index.map((item) => (
                      <MultiSelectorItem
                        key={item._id as string}
                        value={item._id as string}
                      >
                        {item.name}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
