/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {cn} from '@/lib/utils'

import {uploadToCloudinary} from '@/upload/actions'
import {type Picture} from '@/database/types/Picture'
import {toast} from 'sonner'

import {Button} from '@/components/Atoms/button'
import {Input} from '@/components/Atoms/input'
import {Label} from '@/components/Atoms/label'
import {Textarea} from '@/components/Atoms/textarea'
import {Calendar} from '@/components/Atoms/calendar'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Atoms/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Atoms/popover'

import {
  CalendarIcon,
  File,
  ImageIcon,
  Loader2,
  UploadIcon,
  XIcon,
} from 'lucide-react'

/**
 * @version 1
 * @description Componente para subir imágenes. Permite incluir una imagen, añadir metadatos y subirla a Cloudinary. Devuelve un objeto de tipo Picture con los metadatos y la URL de la imagen subida.
 * @param isOpen Estado de apertura del formulario
 * @param setOpen Función para cambiar el estado de apertura del formulario
 * @param handleAddFile Función de añadir imagen al pool de pictures del componente superior
 */

export default function PictureUploadingForm({
  isOpen,
  setOpen,
  handleAddFile,
}: {
  isOpen: boolean
  setOpen: (open: boolean) => void
  handleAddFile: (newPicture: Picture) => Promise<void>
}) {
  const [author, setAuthor] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [isUploading, setIsUploading] = React.useState(false)

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

  // Subir archivo a Cloudinary:
  const handlUploadFile = async () => {
    if (!selectedFile) {
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

          handleAddFile(newPicture)

          // Reiniciar estados formulario de imagen:
          setSelectedFile(null)
          setAuthor('')
          setDescription('')
          setDate(new Date())
          setPreviewUrl(null)
          setOpen(false)
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

  return (
    isOpen && (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Añadir nueva imagen</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setOpen(false)}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Campo de archivo */}
            <div className="space-y-2">
              <Label htmlFor="file-upload">Archivo</Label>
              <div className="grid w-full gap-2">
                <div className="flex items-center justify-center w-full">
                  {previewUrl ? (
                    <div className="relative w-full h-48 rounded-md overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Archivo seleccionado"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : selectedFile ? (
                    <div className="flex flex-col items-center justify-center w-full h-48 border-1 rounded-md bg-muted border-muted-foreground text-muted-foreground">
                      <File size={48} />
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer bg-muted hover:bg-muted-foreground/30  border-muted-foreground text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-3" />
                        <p className="mb-2 text-sm ">
                          Selecciona una imagen para subir
                        </p>
                        <p className="text-xs">PNG,JPG,SVG o GIF</p>
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
                {selectedFile && (
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
                    Eliminar
                  </Button>
                )}
              </div>
            </div>

            {/* Campo de autor */}
            <div className="space-y-2">
              <Label htmlFor="author">Autor/es</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Félix Ruiz de Arcaute, Club alpino"
              />
            </div>

            {/* Campo de descripción */}
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

            {/* Campo de fecha */}
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
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-end space-x-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handlUploadFile}
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <UploadIcon className="mr-2 h-4 w-4" />
                Subir imagen
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    )
  )
}
