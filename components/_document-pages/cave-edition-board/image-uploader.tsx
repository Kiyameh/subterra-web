/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'

import {Picture} from '@/database/types/picture.type'
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  type Control,
} from 'react-hook-form'

import {deleteFromCloudinary, uploadToCloudinary} from '@/upload/actions'
import {extractPublicIdFromUrl} from '@/upload/utils'
import {cn} from '@/lib/utils'

import {toast} from 'sonner'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  CalendarIcon,
  ImageIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
  XIcon,
} from 'lucide-react'

/**
 * @version 1
 * @description Componente para subir imágenes. Permite subir imágenes, añadir metadatos y eliminarlas. Envía las imágenes a Cloudinary y almacena los datos en el campo del formulario que necesariamente ha de envolver este componente.
 * @param control Controlador de RHF
 * @param name Path del campo de formulario
 * @param maxImages Número máximo de imágenes permitidas
 */

export function ImageUploader<T extends FieldValues>({
  control,
  name,
  maxImages = 10,
}: {
  control: Control<T>
  name: Path<T>
  maxImages?: number
}) {
  // Form data:
  const [author, setAuthor] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  // Provisionales:
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  // Estados del formulario:
  const [showForm, setShowForm] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [deletingIndex, setDeletingIndex] = React.useState<number | null>(null)

  // Conectar componente con el formulario superior
  const {field} = useController({
    name,
    control,
    defaultValue: [] as unknown as PathValue<T, Path<T>>,
  })

  // Valor actual del campo:
  const pictures: Picture[] = field.value || []

  // Actualización del campo de archivo:
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // URL de previsualización de la imagen:
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  // Añadir imagen al pool de imágenes:
  const handleAddImage = async () => {
    if (!selectedFile || !field.value) {
      return
    }

    if (field.value.length >= maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas`)
      return
    }

    setIsUploading(true)

    try {
      // Convertir archivo a string base64 para usar en server action:
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)

      reader.onload = async () => {
        const base64data = reader.result as string

        // Subir a Cloudinary
        const uploadResult = await uploadToCloudinary(base64data)

        if (uploadResult.success && uploadResult.url) {
          // Crear objeto de Picture para la base de datos:
          const newPicture: Picture = {
            file_src: uploadResult.url,
            publicId: uploadResult.publicId,
            author: author || undefined,
            description: description || undefined,
            date: date || undefined,
          }

          // Actualizad campo de formulario con la imagen:
          field.onChange([...pictures, newPicture])

          // Reiniciar estados formulario de imagen:
          setSelectedFile(null)
          setAuthor('')
          setDescription('')
          setDate(new Date())
          setPreviewUrl(null)
          setShowForm(false)
          const fileInput = document.getElementById(
            'file-upload'
          ) as HTMLInputElement
          if (fileInput) {
            fileInput.value = ''
          }
        } else {
          console.error(
            `Upload failed: ${uploadResult.error || 'Unknown error'}`
          )
          toast.error('Algo ha ido mal', {
            description: 'Intentalo de nuevo más tarde',
          })
        }

        setIsUploading(false)
      }

      reader.onerror = (error) => {
        console.error('Error reading file:', error)
        toast.error('Algo ha ido mal', {
          description: 'Intentalo de nuevo más tarde',
        })
        setIsUploading(false)
      }
    } catch (error) {
      console.error('Error in upload process:', error)
      toast.error('Algo ha ido mal', {
        description: 'Intentalo de nuevo más tarde',
      })
      setIsUploading(false)
    }
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
      <div className="flex items-center justify-between">
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

      {showForm && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Añadir nueva imagen</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setShowForm(false)}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Archivo</Label>
                <div className="grid w-full gap-2">
                  <div className="flex items-center justify-center w-full">
                    {previewUrl ? (
                      <div className="relative w-full h-48 rounded-md overflow-hidden">
                        <img
                          src={previewUrl || '/placeholder.svg'}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer bg-muted hover:bg-muted-foreground/30  border-muted-foreground text-muted-foreground"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-8 h-8 mb-3" />
                          <p className="mb-2 text-sm ">
                            Arrastra una imagen para subir
                          </p>
                          <p className="text-xs">PNG, JPG or GIF (MAX. 5MB)</p>
                        </div>
                      </label>
                    )}
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  {previewUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewUrl(null)
                        const fileInput = document.getElementById(
                          'file-upload'
                        ) as HTMLInputElement
                        if (fileInput) {
                          fileInput.value = ''
                        }
                      }}
                    >
                      Eliminar imagen
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Autor/es</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Félix Ruiz de Arcaute, Club alpino"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Fotografía de la entrada"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      type="button"
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        date.toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      lang="es-ES"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleAddImage}
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cargando...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Subir Imagen
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previsualización de las imágenes */}
      {pictures.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pictures.map((picture, index) => (
            <Card
              key={index}
              className="overflow-hidden group relative"
            >
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                  disabled={deletingIndex === index}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={picture.file_src || '/image-placeholder.svg'}
                  alt={picture.description || `Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4 space-y-1">
                <div>
                  {picture.author && (
                    <div>
                      <span className="text-sm">{picture.author}</span>
                    </div>
                  )}
                  {picture.date && (
                    <div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(picture.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>
                {picture.description && (
                  <div>
                    <span className="text-sm">Descripción:</span>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {picture.description}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveImage(index)}
                  disabled={deletingIndex === index}
                >
                  {deletingIndex === index ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Eliminar
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md bg-gray-50 dark:bg-gray-800">
          <p className="text-muted-foreground">No hay imágenes todavía</p>
        </div>
      )}
    </div>
  )
}
