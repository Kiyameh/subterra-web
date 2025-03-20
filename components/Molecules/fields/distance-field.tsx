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
import {Input} from '@/components/Atoms/input'
import InfoBadge from '@/components/Molecules/badges/info-badge'
import {Button} from '@/components/Atoms/button'
import {LuRuler} from 'react-icons/lu'

/**
 * @version 1
 * @description Input de distancia controlado por RHF. Opciones de end y start adornment. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * Valor por defecto almacenado en metros
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @param startContent Contenido al inicio del campo
 * @default type 'text'
 *
 */

export default function DistanceField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  startContent,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  placeholder?: string
  startContent?: React.ReactNode
}) {
  const [timeUnit, setTimeUnit] = React.useState('m')
  const [divider, setDivider] = React.useState(1)

  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    setTimeUnit((prevUnit: string) => {
      switch (prevUnit) {
        case 'm':
          return 'km'
        case 'km':
          return 'cm'
        case 'cm':
          return 'm'
        default:
          return 'm'
      }
    })
    setDivider((prevDivider: number) => {
      switch (prevDivider) {
        case 1:
          return 1000
        case 1000:
          return 1 / 100
        case 1 / 100:
          return 1
        default:
          return 1
      }
    })
  }

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
              <div className="flex gap-2">
                <Input
                  className={
                    fieldState.isDirty && !fieldState.error
                      ? 'border border-emphasis'
                      : ''
                  }
                  id={name}
                  endContent={<span>{timeUnit}</span>}
                  type="number"
                  startContent={startContent}
                  placeholder={placeholder}
                  value={field.value / divider}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value) * divider)
                  }}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  name={field.name}
                  ref={field.ref}
                />
                <Button
                  onClick={handleClick}
                  variant="ghost"
                  className="select-none flex flex-row rounded-full"
                >
                  <LuRuler />
                </Button>
              </div>
            </FormControl>
            <div className="flex flex-row-reverse justify-between">
              <FormMessage />
            </div>
          </FormItem>
        </>
      )}
    />
  )
}
