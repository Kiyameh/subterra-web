import {UseFormReturn} from 'react-hook-form'

import {type ExplorationFormValues} from '@/database/types/Exploration'

import {PictureUploader} from '@/components/Organisms/file-uploader/picture-uploader'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de exploraciones para la sección de imágenes.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function ExplorationPicturesFormFragment({
  form,
}: {
  form: UseFormReturn<ExplorationFormValues>
}) {
  return (
    <PictureUploader
      control={form.control}
      name="pictures"
      maxImages={10}
    />
  )
}
