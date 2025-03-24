'use client'

import {useState} from 'react'
import Image from 'next/image'
import {format} from 'date-fns'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {Button} from '@/components/Atoms/button'
import {Dialog, DialogContent, DialogTitle} from '@/components/Atoms/dialog'
import {Picture} from '@/database/types/Picture'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import {FaImage} from 'react-icons/fa'
import {es} from 'date-fns/locale'

export default function PicturesCard({pictures}: {pictures: Picture[]}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedIndex(null)
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % pictures.length)
  }

  const goToPrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + pictures.length) % pictures.length)
  }

  const selectedPicture =
    selectedIndex !== null ? pictures[selectedIndex] : null

  if (pictures.length === 0) return null

  return (
    <>
      <BasicCard
        className="w-full"
        key="cave_pictures_card"
        cardHeader={
          <CardTitle
            title={'Imágenes'}
            icon={<FaImage />}
          />
        }
      >
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pictures.slice(0, 15).map((picture, index) => (
              <div
                key={picture.publicId || index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(index)}
              >
                <Image
                  src={picture.file_src || '/image-placeholder.svg'}
                  alt={picture.description || 'Gallery image'}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
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
              {selectedPicture?.description || 'Galeria de imágenes'}
            </DialogTitle>
            {selectedPicture && (
              <Image
                src={selectedPicture.file_src || '/image-placeholder.svg'}
                alt={selectedPicture.description || 'Imagen'}
                fill
                className="object-contain"
              />
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

          {selectedPicture && (
            <div className="p-4 bg-background">
              {selectedPicture.author && (
                <p className="font-medium">Por: {selectedPicture.author}</p>
              )}
              {selectedPicture.date && (
                <p className="text-sm text-muted-foreground">
                  Fecha:{' '}
                  {format(selectedPicture.date, 'dd MMMM yyyy', {locale: es})}
                </p>
              )}
              {selectedPicture.description && (
                <p className="mt-2">{selectedPicture.description}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
