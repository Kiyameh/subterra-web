'use client'
import React from 'react'
import {Control, FieldValues, Path} from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import InfoBadge from '@/components/_Atoms/indicators/info-badge'

import {GroupIndex} from '@/database/models/Group.model'
import {CaveIndex} from '@/database/models/Cave.model'
import {SystemIndex} from '@/database/models/System.model'
import {ExplorationIndex} from '@/database/models/Exploration.model'

/**
 * @version 1
 * @description Campo de selección de REF controlado por RHF. Opción de start adornment. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @param startContent Contenido al inicio del campo
 * @param index Opciones del campo
 * @default type = 'text'
 */

export default function RefSelectField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  startContent,
  index,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  placeholder?: string
  startContent?: React.ReactNode
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
        <>
          <FormItem className="space-y-1">
            <div className="flex gap-2">
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
              {description && <InfoBadge description={description} />}
            </div>
            <FormControl>
              {!index ? (
                <div className="h-10 w-full rounded-md border border-muted flex items-center justify-center text-xs text-destructive-foreground/80 px-2 py-1 ">
                  Algo ha ido mal al cargar las opciones, puedes añadir este
                  dato más tarde
                </div>
              ) : (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={field.disabled}
                  name={field.name}
                >
                  <SelectTrigger
                    startContent={startContent}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className={
                      fieldState.isDirty && !fieldState.error
                        ? 'border border-emphasis'
                        : ''
                    }
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {index.map((option) => (
                      <SelectItem
                        key={option._id}
                        value={option._id}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  )
}
