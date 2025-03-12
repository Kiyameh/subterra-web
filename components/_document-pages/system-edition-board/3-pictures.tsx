import {UseFormReturn} from 'react-hook-form'
import {PictureUploader} from '../file-uploader/picture-uploader'
import {SystemFormValues} from '@/database/validation/system.schemas'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de sistemas para la sección de imágenes.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function SystemPicturesFormFragment({
  form,
}: {
  form: UseFormReturn<SystemFormValues>
}) {
  return (
    <PictureUploader
      control={form.control}
      name="pictures"
      maxImages={10}
    />
  )
}
