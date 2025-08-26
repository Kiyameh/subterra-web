import {Button} from '@/components/Atoms/button'
import {Loader2} from 'lucide-react'

/**
 * @version 1
 * @description Botón de envío de formulario con loader
 * @param isPending Estado de envío del formulario
 * @param label Texto del botón
 * @default label 'Enviar'
 */

export default function SubmitButton({
  isPending,
  label = 'Enviar',
}: {
  isPending: boolean
  label?: string
}) {
  return (
    <Button
      aria-label={label}
      type="submit"
      className="w-full"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2
          className="animate-spin"
          aria-label="Cargando"
          role="img"
        />
      ) : (
        label
      )}
    </Button>
  )
}
