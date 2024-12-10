import {Control, FieldValues, Path} from 'react-hook-form'
import {FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form'
import InfoBadge from '@/components/displaying/info-badge'
import LabeledSwitch from '../ui/labeled-switch'

/**
 * @version 1
 * @description Input booleano controlado por RHF. Coloreado en [emphasis] si ha sido modificado.
 * @param control Controlador de RHF
 * @param name Path del campo
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 *
 */

export default function BooleanField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  description?: string
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
              <LabeledSwitch
                {...field}
                isDirty={fieldState.isDirty}
              />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  )
}
