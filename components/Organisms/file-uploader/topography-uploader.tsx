/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'

import {
  FieldValues,
  Path,
  PathValue,
  useController,
  type Control,
} from 'react-hook-form'

import { type Topography } from '@/database/types/Topography'
import { deleteFromCloudinary } from '@/upload/actions'
import { extractPublicIdFromUrl } from '@/upload/utils'

import { toast } from 'sonner'
import { Button } from '@/components/Atoms/button'
import { PlusIcon, TrashIcon } from 'lucide-react'
import UploadedFilesBoard from './uploaded-files-board'
import TopographyUploadingForm from './topography-uploading-form'

/**
 * @version 1
 * @description Componente para subir topografias. Permite subir topografias, añadir metadatos y eliminarlas. Envía las topografias a Cloudinary y almacena los datos en el campo del formulario que necesariamente ha de envolver este componente.
 * @param control Controlador de RHF
 * @param name Path del campo de formulario
 * @param maxFiles Número máximo de topografias permitidas
 */

export function TopographyUploader<T extends FieldValues>({
  control,
  name,
  maxFiles = 10,
}: {
  control: Control<T>
  name: Path<T>
  maxFiles?: number
}) {
  // Estados del formulario:
  const [showForm, setShowForm] = React.useState<boolean>(false)
  const [deletingIndex, setDeletingIndex] = React.useState<number | null>(null)

  // Conectar componente con el formulario superior
  const { field } = useController({
    name,
    control,
    defaultValue: [] as unknown as PathValue<T, Path<T>>,
  })

  // Valor actual del campo:
  const topographies: Topography[] = field.value || []

  // Añadir topografía al pool de topografias:
  const handleAddTopography = async (newTopography: Topography) => {
    if (!field.value || !newTopography) {
      return
    }

    if (field.value.length >= maxFiles) {
      alert(`Máximo ${maxFiles} topografias permitidas`)
      return
    }

    // Actualizad campo de formulario con la topografía:
    field.onChange([...topographies, newTopography], { shouldDirty: true })
  }

  const handleRemoveTopography = async (index: number) => {
    setDeletingIndex(index)

    try {
      const topography = topographies[index]

      // Eliminar de Cloudinary:
      if (topography.publicId) {
        await deleteFromCloudinary(topography.publicId)
      } else if (topography.file_src) {
        const extractedPublicId = extractPublicIdFromUrl(topography.file_src)
        if (extractedPublicId) {
          await deleteFromCloudinary(extractedPublicId)
        }
      }

      // Eliminar del pool de topografias:
      const newTopographies = [...topographies]
      newTopographies.splice(index, 1)
      field.onChange(newTopographies)
    } catch (error) {
      console.error('Error deleting topography:', error)
      toast.error('Error al eliminar la topografía', {
        description: 'Intentalo de nuevo más tarde',
      })
    } finally {
      setDeletingIndex(null)
    }
  }

  const handleClearAll = async () => {
    if (topographies.length === 0) return

    if (
      confirm('¿Estás seguro de que quieres eliminar todas las topografias?')
    ) {
      // Eliminar todas de cloudinary
      for (const topography of topographies) {
        try {
          if (topography.publicId) {
            await deleteFromCloudinary(topography.publicId)
          } else if (topography.file_src) {
            const extractedPublicId = extractPublicIdFromUrl(
              topography.file_src
            )
            if (extractedPublicId) {
              await deleteFromCloudinary(extractedPublicId)
            }
          }
        } catch (error) {
          console.error('Error deleting topography during clear all:', error)
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
          Topografias ({topographies.length}/{maxFiles})
        </p>
        <div className="flex gap-2">
          {topographies.length > 0 && (
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
          {!showForm && topographies.length < maxFiles && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowForm(true)}
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Añadir topografía
            </Button>
          )}
        </div>
      </div>

      {/* Formulario de insertar topografía */}
      <TopographyUploadingForm
        isOpen={showForm}
        setOpen={setShowForm}
        handleAddFile={handleAddTopography}
      />

      {/* Previsualización de las topografias */}
      {topographies.length > 0 ? (
        <UploadedFilesBoard
          files={topographies}
          onRemove={handleRemoveTopography}
          removingIndex={deletingIndex}
        />
      ) : (
        <div className="text-center py-8 border rounded-md bg-gray-50 dark:bg-gray-800">
          <p className="text-muted-foreground">No hay topografias todavía</p>
        </div>
      )}
    </div>
  )
}
