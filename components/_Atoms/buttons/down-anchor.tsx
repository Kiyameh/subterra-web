//* Dependencias:
import Link, {LinkProps} from 'next/link'
import {MdAnchor} from 'react-icons/md'

/** Control para descender a diferentes secciones de la página */
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
