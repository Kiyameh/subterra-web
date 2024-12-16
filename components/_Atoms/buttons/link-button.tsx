import Link from 'next/link'
import {Button, ButtonProps} from '@/components/ui/button'

/**
 * @version 1
 * @description Componente que muestra un botón envuelto en un Link de Next.js
 * @param label Texto del botón
 * @param href Ruta a la que se desplazará el usuario al hacer click en el botón.
 * @param disabled Indica si el botón está deshabilitado
 * @param props Propiedades adicionales del botón
 */

export default function LinkButton({
  label,
  href,
  disabled,
  ...props
}: {
  label: string
  href: string
  disabled?: boolean
} & ButtonProps) {
  return (
    <Button
      asChild
      disabled={disabled}
      {...props}
    >
      <Link
        href={href}
        className={disabled ? 'pointer-events-none w-full' : 'w-full'}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {label}
      </Link>
    </Button>
  )
}
