import {CaveFormValues} from '@/database/validation/cave.schemas'
import {UseFormReturn} from 'react-hook-form'
import {ImageUploader} from './image-uploader'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de cuevas para la sección de imágenes.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function CavePicturesFormFragment({
  form,
}: {
  form: UseFormReturn<CaveFormValues>
}) {
  return (
    <ImageUploader
      control={form.control}
      name="pictures"
      maxImages={10}
    />
  )
}
