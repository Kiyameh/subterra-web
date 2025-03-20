'use client'

import {useEffect, useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Atoms/dialog'
import {Button} from '@/components/Atoms/button'
import {Checkbox} from '@/components/Atoms/checkbox'
import {ExternalLink} from 'lucide-react'
import type {Version} from './versions'
import {SubterraLogoMd} from '@/components/Organisms/theme/subterra-logo'
import {ScrollArea} from '@/components/Atoms/scroll-area'
import {Feature} from './features'
import Link from 'next/link'

// Claves de almacenamiento local
const STORAGE_VERSION_KEY = 'app_version'
const STORAGE_HIDE_MODAL_KEY = 'hide_updates_modal'

/**
 * @version 1
 * @description Modal de actualizaciones para mostrar las novedades de la versión actual
 * @param versionData Datos de la versión actual
 * @param onClose Función a ejecutar al cerrar el modal
 */

export function UpdatesModal({
  versions,
  features,
  onClose,
}: {
  versions: Version[]
  features: Feature[]
  onClose?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const currentVersion = versions[0]
  const currentFeatures = features.filter(
    (feature) => feature.version === currentVersion.version
  )

  useEffect(() => {
    // Comprobar si debemos mostrar el modal
    const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY)
    const hideModal = localStorage.getItem(STORAGE_HIDE_MODAL_KEY) === 'true'

    // Mostrar modal si:
    // 1. Esta es la primera visita (sin versión almacenada)
    // 2. La versión de la app ha cambiado
    // 3. El usuario no ha elegido ocultar el modal para esta versión
    const shouldShowModal =
      !storedVersion || storedVersion !== currentVersion.version || !hideModal

    if (shouldShowModal) {
      setOpen(true)
      // Siempre actualizar la versión almacenada a la actual
      localStorage.setItem(STORAGE_VERSION_KEY, currentVersion.version)
    }
  }, [currentVersion.version])

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
      <DialogContent className="sm:max-w-[650px] p-0 border-none bg-muted flex flex-col h-[90vh]">
        {/* Sección de logo y encabezado */}
        <DialogHeader className="flex flex-col items-center text-center p-6">
          <DialogTitle className="flex flex-col items-center space-y-4 text-xl">
            <SubterraLogoMd width="180" />
            <p>{`Novedades de la versión ${currentVersion.version} ${currentVersion.name}`}</p>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {currentVersion.date.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            • {currentVersion.resume}
          </DialogDescription>
        </DialogHeader>

        {/* Área de contenido principal */}
        <ScrollArea className="bg-card flex-grow">
          <ul className="flex flex-col gap-4 p-6">
            {currentFeatures.map((feature, index) => (
              <li
                key={index}
                className="p-4 rounded-lg border border-border hover:border-muted-foreground transition-all flex gap-4 group"
              >
                <div className="mt-1 p-2 rounded-full bg-muted text-primary h-10 w-10 flex items-center justify-center flex-shrink-0 group-hover:text-primary/90">
                  <div className="scale-125">{feature.icon}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  {feature.docs && (
                    <a
                      href={feature.docs}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                    >
                      Ver en la guía de uso
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                  {feature.url && (
                    <a
                      href={feature.url}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                    >
                      Acceder
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>

        {/* Pie de página */}
        <DialogFooter className="p-6">
          <div className="flex flex-col items-center gap-2 w-full">
            <Link href="/versions">
              <span
                className="break-words text-sm text-primary hover:underline"
                onClick={handleClose}
              >
                Puedes ver todos los lanzamientos en la página de versiones
              </span>
            </Link>

            <div className="w-full flex items-center justify-between gap-6">
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
