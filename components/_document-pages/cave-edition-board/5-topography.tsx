import {CaveFormValues} from '@/database/validation/cave.schemas'
import {UseFormReturn} from 'react-hook-form'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de cuevas para la sección de topografías.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function CaveTopographyFormFragment({
  form,
}: {
  form: UseFormReturn<CaveFormValues>
}) {
  console.log(form)
  return <div className="space-y-6 p-2 py-6">IMPUT DE TOPOGRAFÍA</div>
}
