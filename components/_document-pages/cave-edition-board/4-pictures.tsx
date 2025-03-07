import {CaveFormValues} from '@/database/validation/cave.schemas'
import {UseFormReturn} from 'react-hook-form'
import {PictureUploader} from './file-uploader/picture-uploader'

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
    <PictureUploader
      control={form.control}
      name="pictures"
      maxImages={10}
    />
  )
}
