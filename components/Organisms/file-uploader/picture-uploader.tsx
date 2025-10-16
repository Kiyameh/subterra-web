/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'

import { type Picture } from '@/database/types/Picture'
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  type Control,
} from 'react-hook-form'

import { deleteFromCloudinary } from '@/upload/actions'
import { extractPublicIdFromUrl } from '@/upload/utils'

import { toast } from 'sonner'
import { Button } from '@/components/Atoms/button'
import UploadedFilesBoard from './uploaded-files-board'
import PictureUploadingForm from './picture-uploading-form'

import { PlusIcon, TrashIcon } from 'lucide-react'

/**
 * @version 1
 * @description Componente para subir imágenes. Permite subir imágenes, añadir metadatos y eliminarlas. Envía las imágenes a Cloudinary y almacena los datos en el campo del formulario que necesariamente ha de envolver este componente.
 * @param control Controlador de RHF
 * @param name Path del campo de formulario
 * @param maxImages Número máximo de imágenes permitidas
 */

export function PictureUploader<T extends FieldValues>({
  control,
  name,
  maxImages = 10,
}: {
  control: Control<T>
  name: Path<T>
  maxImages?: number
}) {
  // Estados del formulario:
  const [showForm, setShowForm] = React.useState<boolean>(false)
  const [deletingIndex, setDeletingIndex] = React.useState<number | null>(null)

  // Conectar componente con el formulario superior
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: [] as unknown as PathValue<T, Path<T>>,
  })

  // Valor actual del campo:
  const pictures: Picture[] = field.value || []

  // Añadir imagen al pool de imágenes:
  const handleAddImage = async (newPicture: Picture) => {
    if (!field.value || !newPicture) {
      return
    }

    if (field.value.length >= maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas`)
      return
    }

    // Actualizad campo de formulario con la imagen:
    field.onChange([...pictures, newPicture])
    fieldState.isDirty = true
  }

  const handleRemoveImage = async (index: number) => {
    setDeletingIndex(index)

    try {
      const picture = pictures[index]

      // Eliminar de Cloudinary:
      if (picture.publicId) {
        await deleteFromCloudinary(picture.publicId)
      } else if (picture.file_src) {
        const extractedPublicId = extractPublicIdFromUrl(picture.file_src)
        if (extractedPublicId) {
          await deleteFromCloudinary(extractedPublicId)
        }
      }

      // Eliminar del pool de imágenes:
      const newPictures = [...pictures]
      newPictures.splice(index, 1)
      field.onChange(newPictures)
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Error al eliminar la imagen', {
        description: 'Intentalo de nuevo más tarde',
      })
    } finally {
      setDeletingIndex(null)
    }
  }

  const handleClearAll = async () => {
    if (pictures.length === 0) return

    if (confirm('¿Estás seguro de que quieres eliminar todas las imágenes?')) {
      // Eliminar todas de cloudinary
      for (const picture of pictures) {
        try {
          if (picture.publicId) {
            await deleteFromCloudinary(picture.publicId)
          } else if (picture.file_src) {
            const extractedPublicId = extractPublicIdFromUrl(picture.file_src)
            if (extractedPublicId) {
              await deleteFromCloudinary(extractedPublicId)
            }
          }
        } catch (error) {
          console.error('Error deleting image during clear all:', error)
        }
      }

      field.onChange([])
    }
  }

  return (
    /* Cabecera del componente */

    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between">
        <p>
          Imagenes ({pictures.length}/{maxImages})
        </p>
        <div className="flex gap-2">
          {pictures.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearAll}
            >
              <TrashIcon className="h-4 w-4 mr-1" />
              Borrar todas
            </Button>
          )}
          {!showForm && pictures.length < maxImages && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowForm(true)}
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Añadir imagen
            </Button>
          )}
        </div>
      </div>

      {/* Formulario de insertar imagen */}
      <PictureUploadingForm
        isOpen={showForm}
        setOpen={setShowForm}
        handleAddFile={handleAddImage}
      />

      {/* Previsualización de las imágenes */}
      {pictures.length > 0 ? (
        <UploadedFilesBoard
          files={pictures}
          onRemove={handleRemoveImage}
          removingIndex={deletingIndex}
        />
      ) : (
        <div className="text-center py-8 border rounded-md bg-gray-50 dark:bg-gray-800">
          <p className="text-muted-foreground">No hay imágenes todavía</p>
        </div>
      )}
    </div>
  )
}
