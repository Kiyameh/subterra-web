import {Control, FieldValues, Path} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import InfoBadge from '@/components/_Atoms/indicators/info-badge'
import {Textarea} from '@/components/ui/textarea'

/**
 * @version 1
 * @description Input de texto grande controlado por RHF. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @param maxCharacters Número máximo de caracteres
 */

export default function TextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  maxCharacters,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
  placeholder?: string
  maxCharacters?: number | null
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
              <Textarea
                className={
                  fieldState.isDirty && !fieldState.error
                    ? 'border border-emphasis'
                    : ''
                }
                id={name}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <div className="flex flex-row-reverse justify-between">
              <span className="text-muted-foreground text-xs">
                {maxCharacters &&
                  control._getWatch(name).length + '/' + maxCharacters}
              </span>
              <FormMessage />
            </div>
          </FormItem>
        </>
      )}
    />
  )
}
