import {UseFormReturn} from 'react-hook-form'

import {type SystemFormValues} from '@/database/types/System'

import {PictureUploader} from '@/components/Organisms/file-uploader/picture-uploader'

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
