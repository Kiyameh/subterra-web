/* eslint-disable @next/next/no-img-element */
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardFooter} from '@/components/ui/card'
import {Picture} from '@/database/types/picture.type'
import {Topography} from '@/database/types/topography.type'
import {Loader2, TrashIcon} from 'lucide-react'
import {PiFilePdfThin} from 'react-icons/pi'
import {DiIllustrator} from 'react-icons/di'
import TopographyTypeBadge from '@/components/_Atoms/badges/topography-type-badge'

/**
 * @version 1
 * @description Componente que muestra una tarjeta con la información de un archivo subido.
 * @param file - Archivo subido.
 * @param index - Índice del archivo en la lista de archivos subidos.
 * @param deleting - Archivo en proceso de eliminación.
 * @param onRemove - Función para eliminar el archivo.
 */

export default function UploadedFileCard({
  file,
  index,
  deleting,
  onRemove,
}: {
  file: Picture | Topography
  index: number
  deleting: boolean
  onRemove: (index: number) => Promise<void>
}) {
  return (
    <Card className="overflow-hidden group relative">
      <div className="aspect-video w-full overflow-hidden">
        {file.file_src.includes('.pdf') ? (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <PiFilePdfThin className="h-32 w-32" />
          </div>
        ) : file.file_src.includes('.ai') ? (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <DiIllustrator className="h-28 w-28" />
          </div>
        ) : (
          <img
            src={file.file_src || '/placeholder.svg'}
            alt={file.description || `Archivo ${index + 1}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <CardContent className="p-4 space-y-1">
        {'type' in file && <TopographyTypeBadge type={file.type} />}
        {'groups' in file && <p>{file.groups}</p>}

        {file.description && (
          <p className="text-sm line-clamp-2">{file.description}</p>
        )}
        {file.author && (
          <p className="text-xs text-muted-foreground text-right">
            {file.author}
          </p>
        )}
        {file.date && (
          <p className="text-xs text-muted-foreground text-right">
            {new Date(file.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onRemove(index)}
          disabled={deleting}
        >
          {deleting ? (
            <Loader2
              className="animate-spin"
              size={24}
            />
          ) : (
            <>
              <TrashIcon className="h-4 w-4 mr-2" />
              Eliminar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
