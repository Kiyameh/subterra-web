import {Picture} from '@/database/types/picture.type'
import UploadedFileCard from './uploaded-file-card'
import {Topography} from '@/database/types/topography.type'

/**
 * @version 1
 * @description Componente que muestra una lista de archivos subidos.
 * @param onRemove - Función para eliminar un archivo.
 * @param removingIndex - Índice del archivo en proceso de eliminación.
 * @param files - Lista de archivos subidos.
 */

export default function UploadedFilesBoard({
  onRemove,
  removingIndex,
  files,
}: {
  onRemove: (index: number) => Promise<void>
  removingIndex: number | null
  files?: (Picture | Topography)[]
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {files?.map((file, index) => (
        <UploadedFileCard
          key={index}
          file={file}
          index={index}
          deleting={removingIndex === index}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
