import {CaveFormValues} from '@/database/validation/cave.schemas'
import {UseFormReturn} from 'react-hook-form'
import {TopographyUploader} from './file-uploader/topography-uploader'

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
  return (
    <TopographyUploader
      control={form.control}
      name="topographies"
      maxFiles={10}
    />
  )
}
