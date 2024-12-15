import {Control, FieldValues, Path} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import InfoBadge from '@/components/_Atoms/indicators/info-badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {GroupIndex} from '@/database/models/Group.model'
import {CaveIndex} from '@/database/models/Cave.model'
import {SystemIndex} from '@/database/models/System.model'
import {ExplorationIndex} from '@/database/models/Exploration.model'

/**
 * @version 1
 * @description Select sencillo controlado por RHF. Opción de start adornment. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 * @param placeholder Placeholder del campo
 * @param startContent Contenido al inicio del campo
 * @param index Opciones del campo
 * @default type = 'text'
 */

export default function RefSelectionField<T extends FieldValues>({
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
  if (!index) return <div>Algo ha ido mal al cargar las opciones...</div> //TODO: Mejorar el mensaje de error

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
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  )
}
