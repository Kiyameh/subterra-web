import {SystemFormValues} from '@/database/types/System'
import {UseFormReturn} from 'react-hook-form'
import {TopographyUploader} from '@/components/Templates/file-uploader/topography-uploader'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de sistemas para la sección de topografías.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function SystemTopographyFormFragment({
  form,
}: {
  form: UseFormReturn<SystemFormValues>
}) {
  return (
    <TopographyUploader
      control={form.control}
      name="topographies"
      maxFiles={10}
    />
  )
}
