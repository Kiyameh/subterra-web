'use client'

import {useState} from 'react'
import Image from 'next/image'
import {format} from 'date-fns'
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageIcon,
  File,
} from 'lucide-react'
import {Button} from '@/components/Atoms/button'
import {Dialog, DialogContent, DialogTitle} from '@/components/Atoms/dialog'
import {Badge} from '@/components/Atoms/badge'
import {Topography} from '@/database/types/Topography'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {FaRegMap} from 'react-icons/fa'
import TopographyTypeBadge from '@/components/Molecules/badges/topography-type-badge'

// Función auxiliar para obtener el tipo de archivo basado en la URL
function getFileType(url: string): 'image' | 'pdf' | 'ai' | 'unknown' {
  const extension = url.split('.').pop()?.toLowerCase() || ''

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
    return 'image'
  } else if (extension === 'pdf') {
    return 'pdf'
  } else if (extension === 'ai') {
    return 'ai'
  } else {
    if (url.includes('image-placeholder.svg')) {
      return 'image'
    }
    return 'unknown'
  }
}

// Helper function to get file icon based on type
function FileTypeIcon({type}: {type: 'image' | 'pdf' | 'ai' | 'unknown'}) {
  switch (type) {
    case 'image':
      return <ImageIcon className="h-8 w-8" />
    case 'pdf':
      return <FileText className="h-8 w-8" />
    case 'ai':
    case 'unknown':
    default:
      return <File className="h-8 w-8" />
  }
}

export default function TopographiesCard({
  topographies,
}: {
  topographies: Topography[]
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedIndex(null)
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % topographies.length)
  }

  const goToPrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex(
      (selectedIndex - 1 + topographies.length) % topographies.length
    )
  }

  const selectedTopography =
    selectedIndex !== null ? topographies[selectedIndex] : null
  const selectedFileType = selectedTopography
    ? getFileType(selectedTopography.file_src)
    : 'unknown'

  return (
    <>
      <BasicCard
        key="cave_pictures_card"
        cardHeader={
          <CardTitle
            title={'Topografías'}
            icon={<FaRegMap />}
          />
        }
      >
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topographies.slice(0, 15).map((topography, index) => {
              const fileType = getFileType(topography.file_src)

              return (
                <div
                  key={topography.publicId || index}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity border border-border"
                  onClick={() => openModal(index)}
                >
                  {fileType === 'image' ? (
                    <Image
                      src={topography.file_src || '/image-placeholder.svg'}
                      alt={topography.description || 'Topography image'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-muted">
                      <FileTypeIcon type={fileType} />
                      <p className="text-sm text-muted-foreground mt-1">
                        Archivo {fileType.toUpperCase()}
                      </p>
                      {topography.type && (
                        <TopographyTypeBadge type={topography.type} />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </BasicCard>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 flex flex-col">
          <div className="relative flex-1 bg-black flex items-center justify-center">
            <DialogTitle className="sr-only">
              {selectedTopography?.description || 'Galeria de topografías'}
            </DialogTitle>
            {selectedTopography && (
              <>
                {selectedFileType === 'image' && (
                  <Image
                    src={
                      selectedTopography.file_src || '/image-placeholder.svg'
                    }
                    alt={selectedTopography.description || 'Topography image'}
                    fill
                    className="object-contain"
                  />
                )}

                {selectedFileType === 'pdf' && (
                  <iframe
                    src={selectedTopography.file_src}
                    className="w-full h-full"
                    title={selectedTopography.description || 'PDF Document'}
                  />
                )}

                {(selectedFileType === 'ai' ||
                  selectedFileType === 'unknown') && (
                  <div className="flex flex-col items-center justify-center text-white p-8 text-center">
                    <FileTypeIcon type={selectedFileType} />
                    <h3 className="text-xl font-bold mt-4">
                      {selectedFileType === 'ai'
                        ? 'Archivo Adobe Illustrator'
                        : 'Tipo de archivo desconocido'}
                    </h3>
                    <p className="mt-2">
                      {selectedFileType === 'ai'
                        ? 'Este archivo no se puede previsualizar en el navegador. Descarga el archivo para verlo.'
                        : 'Este archivo no se puede previsualizar en el navegador.'}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() =>
                        window.open(selectedTopography.file_src, '_blank')
                      }
                    >
                      Descargar archivo
                    </Button>
                  </div>
                )}
              </>
            )}

            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Anterior</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>

          {selectedTopography && (
            <div className="p-4 bg-background">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTopography.type && (
                  <TopographyTypeBadge type={selectedTopography.type} />
                )}
                {selectedFileType && (
                  <Badge variant="outline">
                    {selectedFileType.toUpperCase()}
                  </Badge>
                )}
              </div>

              {selectedTopography.author && (
                <p className="font-medium">
                  Autor/es: {selectedTopography.author}
                </p>
              )}

              {selectedTopography.groups && (
                <p className="text-sm">Grupo/s: {selectedTopography.groups}</p>
              )}

              {selectedTopography.date && (
                <p className="text-sm text-muted-foreground">
                  Fecha: {format(selectedTopography.date, 'MMMM d, yyyy')}
                </p>
              )}

              {selectedTopography.description && (
                <p className="mt-2">{selectedTopography.description}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
