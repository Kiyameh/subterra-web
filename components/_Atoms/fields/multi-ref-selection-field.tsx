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
import {CaveIndex} from '@/database/models/Cave.model'
import {ExplorationIndex} from '@/database/models/Exploration.model'
import {GroupIndex} from '@/database/models/Group.model'
import {SystemIndex} from '@/database/models/System.model'

/**
 * @version 1
 * @description Campo de selección múltiple de refs controlado por RHF.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @param index Opciones del campo
 */

export default function MultiRefSelectionField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  index,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  placeholder?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  index:
    | GroupIndex[]
    | CaveIndex[]
    | SystemIndex[]
    | ExplorationIndex[]
    | undefined
}) {
  if (!index) return <div>Algo ha ido mal al cargar las opciones...</div> //TODO: Mejorar el mensaje de error

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
              values={field.value as string[]} // Asegúrate de que los valores sean compatibles
              onValuesChange={(newValues) => {
                const selectedOptions = index.filter((option) =>
                  newValues.includes(option._id)
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
                      key={item._id}
                      value={item._id}
                    >
                      {item.name}
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
