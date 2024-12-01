import React from 'react'
import Image from 'next/image'
import {cn} from '@/lib/utils'
import {StaticImport} from 'next/dist/shared/lib/get-img-props'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import {DialogDescription} from '@radix-ui/react-dialog'

/**
 * @version 1
 * @description Dialog con slots para imagen, header, footer y content. Opción glassmorphism.
 * @param defaultWidth Ancho por defecto ["md": 460, "lg": 600, "xl": 800, "xxl": 1024]
 * @param image Imagen superior
 * @param dialogTrigger Trigger del dialog
 * @param dialogHeader Cabecera del dialog
 * @param dialogFooter Pie del dialog
 * @param children Contenido del dialog
 * @param glassmorphism Añadir efecto Glassmorphism
 * @param className Clases adicionales para componente Dialog
 * @default defaultWidth "md"
 */

export default function BasicDialog({
  defaultWidth = 'md',
  image,
  dialogTrigger,
  dialogHeader,
  dialogFooter,
  children,
  glassmorphism = false,
  className,
}: {
  defaultWidth?: 'md' | 'lg' | 'xl' | 'xxl'
  image?: StaticImport
  dialogTrigger: React.ReactNode
  dialogHeader?: React.ReactNode
  dialogFooter?: React.ReactNode
  children: React.ReactNode
  glassmorphism?: boolean
  className?: string
}) {
  const sizeMap = {
    md: 'w-[460px]',
    lg: 'w-[600px]',
    xl: 'w-[800px]',
    xxl: 'w-[1024px]',
  }
  const width = sizeMap[defaultWidth]
  const glass = glassmorphism ? 'bg-black bg-opacity-20 backdrop-blur-sm' : ''

  const style = cn(
    'max-w-[90%] bg-card flex flex-col justify-between rounded-xl p-0',
    glass,
    width,
    className
  )

  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className={style}>
        {image && (
          <div className="flex items-center justify-center h-48 overflow-hidden rounded-t-xl">
            <Image
              src={image}
              alt="Imagen decorativa del dialog"
            />
          </div>
        )}
        <div className="space-y-6 p-6">
          <DialogHeader>
            {dialogHeader}
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">{children}</div>
        </div>
        <DialogFooter className="flex gap-2">{dialogFooter}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
