'use client'
import {Control, FieldValues, Path} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import InfoBadge from '@/components/_Atoms/badges/info-badge'

/**
 * @version 1
 * @description Input de texto sencillo controlado por RHF. Opciones de end y start adornment. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param type Tipo de input
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @param startContent Contenido al inicio del campo
 * @param endContent Contenido al final del campo
 * @param maxCharacters Número máximo de caracteres+
 * @param hidden Campo oculto
 * @default type 'text'
 *
 */

export default function TextField<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  description,
  placeholder,
  startContent,
  endContent,
  maxCharacters,
  hidden,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  type?: HTMLInputElement['type']
  description?: string
  placeholder?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  maxCharacters?: number | null
  hidden?: boolean
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
              <Input
                hidden={hidden}
                className={
                  fieldState.isDirty && !fieldState.error
                    ? 'border border-emphasis'
                    : ''
                }
                id={name}
                endContent={endContent}
                type={type}
                startContent={startContent}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <div className="flex flex-row-reverse justify-between">
              <span className="text-muted-foreground text-xs">
                {maxCharacters &&
                  control?._getWatch(name)?.length + '/' + maxCharacters}
              </span>
              <FormMessage />
            </div>
          </FormItem>
        </>
      )}
    />
  )
}
