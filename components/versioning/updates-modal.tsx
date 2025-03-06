'use client'

import {useEffect, useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {ExternalLink} from 'lucide-react'
import type {Version} from './versions'
import {SubterraLogoMd} from '../branding/subterra-logo'
import {ScrollArea} from '../ui/scroll-area'

// Claves de almacenamiento local
const STORAGE_VERSION_KEY = 'app_version'
const STORAGE_HIDE_MODAL_KEY = 'hide_updates_modal'

export function UpdatesModal({
  versionData,
  onClose,
}: {
  versionData: Version
  onClose?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    // Comprobar si debemos mostrar el modal
    const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY)
    const hideModal = localStorage.getItem(STORAGE_HIDE_MODAL_KEY) === 'true'

    // Mostrar modal si:
    // 1. Esta es la primera visita (sin versión almacenada)
    // 2. La versión de la app ha cambiado
    // 3. El usuario no ha elegido ocultar el modal para esta versión
    const shouldShowModal =
      !storedVersion || storedVersion !== versionData.version || !hideModal

    if (shouldShowModal) {
      setOpen(true)
      // Siempre actualizar la versión almacenada a la actual
      localStorage.setItem(STORAGE_VERSION_KEY, versionData.version)
    }
  }, [versionData.version])

  const handleClose = () => {
    // Guardar preferencia del usuario
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_HIDE_MODAL_KEY, 'true')
    } else {
      localStorage.setItem(STORAGE_HIDE_MODAL_KEY, 'false')
    }

    setOpen(false)

    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none bg-muted flex flex-col justify-between h-[650px]">
        {/* Sección de logo y encabezado */}
        <DialogHeader className="flex flex-col items-center text-center p-6">
          <DialogTitle className="flex flex-col items-center space-y-4 text-xl">
            <SubterraLogoMd width="180" />
            <p>{`Novedades de la versión ${versionData.version} ${versionData.name}`}</p>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {versionData.date.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            • {versionData.resume}
          </DialogDescription>
        </DialogHeader>

        {/* Área de contenido principal */}
        <ScrollArea className="bg-card max-h-[500px]">
          <ul className="flex flex-col gap-4 p-6">
            {versionData.updates.map((update, index) => (
              <li
                key={index}
                className="p-4 rounded-lg border border-border hover:border-muted-foreground transition-all flex gap-4 group"
              >
                <div className="mt-1 p-2 rounded-full bg-muted text-primary h-10 w-10 flex items-center justify-center flex-shrink-0 group-hover:text-primary/90">
                  {update.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{update.title}</h3>
                  <p className="text-muted-foreground">{update.description}</p>
                  {update.learnMoreUrl && (
                    <a
                      href={update.learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                    >
                      Más información
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>

        {/* Pie de página */}
        <DialogFooter>
          <div className="w-full p-6 flex items-center justify-between gap-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
              <Checkbox
                id="dont-show"
                className="border-muted-foreground"
                checked={dontShowAgain}
                onCheckedChange={(checked) =>
                  setDontShowAgain(checked as boolean)
                }
              />
              <label htmlFor="dont-show">
                No mostrar de nuevo para esta versión
              </label>
            </div>

            <Button onClick={handleClose}>Entendido</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
