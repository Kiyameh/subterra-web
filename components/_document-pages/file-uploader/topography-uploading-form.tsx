/* eslint-disable @next/next/no-img-element */
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'

import {
  CalendarIcon,
  File,
  ImageIcon,
  Loader2,
  UploadIcon,
  XIcon,
} from 'lucide-react'
import React from 'react'
import {cn} from '@/lib/utils'
import {uploadToCloudinary} from '@/upload/actions'
import {toast} from 'sonner'
import {Topography} from '@/database/types/topography.type'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {PiFilePdfDuotone} from 'react-icons/pi'

/**
 * @version 1
 * @description Componente para subir topografias. Permite incluir una imagen o pdf, añadir metadatos y subirla a Cloudinary. Devuelve un objeto de tipo Topography con los metadatos y la URL del archivo subido subida.
 * @param isOpen Estado de apertura del formulario
 * @param setOpen Función para cambiar el estado de apertura del formulario
 * @param handleAddFile Función para añadir una nueva topografía al pool de topographies del componente superior
 */

export default function TopographyUploadingForm({
  isOpen,
  setOpen,
  handleAddFile,
}: {
  isOpen: boolean
  setOpen: (open: boolean) => void
  handleAddFile: (newTopography: Topography) => Promise<void>
}) {
  const [author, setAuthor] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [groups, setGroups] = React.useState('')
  const [type, setType] = React.useState<Topography['type']>('other')
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [isUploading, setIsUploading] = React.useState(false)

  // Actualización del campo de archivo:
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Crear URL de previsualización para el archivo:
      if (file.type.startsWith('image/')) {
        const fileUrl = URL.createObjectURL(file)
        setPreviewUrl(fileUrl)
      } else {
        // Para PDFs, solo mostraremos un icono de PDF
        setPreviewUrl(null)
      }
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
          // Crear objeto de Topography para la base de datos:
          const newTopography: Topography = {
            file_src: uploadResult.url,
            publicId: uploadResult.publicId,
            author: author || undefined,
            groups: groups || undefined,
            description: description || undefined,
            date: date || undefined,
            type: type || undefined,
          }

          handleAddFile(newTopography)

          // Reiniciar estados formulario de imagen:
          setSelectedFile(null)
          setAuthor('')
          setGroups('')
          setDescription('')
          setDate(new Date())
          setType('other')
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
            <CardTitle>Añadir nueva topografía</CardTitle>
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
                      {selectedFile.name}
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer bg-muted hover:bg-muted-foreground/30  border-muted-foreground text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="flex flex-row items-center justify-center gap-1">
                          <ImageIcon className="w-8 h-8" />
                          <PiFilePdfDuotone className="w-10 h-10" />
                        </div>

                        <p className="mb-2 text-sm ">
                          Selecciona un archivo para subir
                        </p>
                        <p className="text-xs">PNG,JPG,SVG o PDF</p>
                      </div>
                    </label>
                  )}
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*,.pdf"
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
                placeholder="Félix Ruiz de Arcaute"
              />
            </div>

            {/* Campo de grupos */}
            <div className="space-y-2">
              <Label htmlFor="author">Grupos</Label>
              <Input
                id="groups"
                value={groups}
                onChange={(e) => setGroups(e.target.value)}
                placeholder="I.P.V., Club alpino"
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

            {/* Campo de tipo */}
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={type}
                onValueChange={(value: string) =>
                  setType(value as Topography['type'])
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plan">Planta</SelectItem>
                  <SelectItem value="proyected">Alzado Proyectado</SelectItem>
                  <SelectItem value="developed">Alzado Desarrollado</SelectItem>
                  <SelectItem value="3D">3D</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
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
                Subir topografía
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    )
  )
}
