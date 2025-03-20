//* Dependencias:
import Link, {LinkProps} from 'next/link'
import {MdAnchor} from 'react-icons/md'

/**
 * @version 1
 * @description Componente que muestra un icono de ancla para descender en la página.
 * @param href Ruta a la que se desplazará el usuario al hacer click en el icono.
 */

export default function DownAnchor({href, ...props}: LinkProps) {
  return (
    <div className="m-5">
      <Link
        {...props}
        href={href}
      >
        <MdAnchor
          size={48}
          className="text-muted-foreground active:text-primary "
        />
      </Link>
    </div>
  )
}
