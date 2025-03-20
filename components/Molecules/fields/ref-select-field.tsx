'use client'
import React from 'react'
import {Control, FieldValues, Path} from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Atoms/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Atoms/select'
import InfoBadge from '@/components/Molecules/badges/info-badge'

import {GroupIndex} from '@/database/services/Group/getGroupsIndex'
import {ExplorationIndex} from '@/database/services/Exploration/getExplorationIndex'
import {SystemIndex} from '@/database/services/System/getSystemIndex'

import {InstanceIndex} from '@/database/services/Instance/getInstancesIndex'
import {CaveIndex} from '@/database/services/Cave/getCaveIndex'

/**
 * @version 2
 * @description Campo de selección de REF controlado por RHF. Opción de start adornment. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @param startContent Contenido al inicio del campo
 * @param fetchingErrorText Texto de error al cargar opciones
 * @param noOptionsText Texto de error al no haber opciones
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
  fetchingErrorText = 'Error al cargar opciones, puedes editar este dato más tarde',
  noOptionsText = 'Todavía no hay opciones disponibles',
  index,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  placeholder?: string
  startContent?: React.ReactNode
  fetchingErrorText?: string
  noOptionsText?: string
  index:
    | GroupIndex[]
    | CaveIndex[]
    | SystemIndex[]
    | ExplorationIndex[]
    | InstanceIndex[]
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
                <div className="h-10 w-full rounded-md border border-muted flex items-center justify-start text-xs text-destructive-foreground/80 px-2 py-1 ">
                  {fetchingErrorText}
                </div>
              ) : index.length === 0 ? (
                <div className="h-10 w-full rounded-md border border-muted flex items-center justify-start text-xs text-destructive-foreground/80 px-2 py-1 ">
                  {noOptionsText}
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
                        ? 'border border-emphasis bg-card'
                        : 'bg-card'
                    }
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {index.map((option) => (
                      <SelectItem
                        key={option._id as string}
                        value={option._id as string}
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
