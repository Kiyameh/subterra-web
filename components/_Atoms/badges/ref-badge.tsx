import React from 'react'
import {Badge} from '@/components/ui/badge'
import Link from 'next/link'
import {FaAnchor} from 'react-icons/fa'
import ResponsiveTooltip from './responsive-tooltip'

/**
 * @version 1
 * @description Badge para referencias a otros documentos de la plataforma
 * @param value Objeto con la información de la referencia {name, _id}
 * @param baseUrl URL base a la que redirigir
 * @param showText Texto a mostrar en el badge
 * @param type Tipo de referencia (cave, system, exploration, group)
 */

export default function RefBadge({
  value,
  baseUrl,
  showText,
  type,
}: {
  value: {name: string; _id: string} | undefined
  baseUrl: string
  showText?: string
  type?: 'cave' | 'system' | 'exploration' | 'group'
}) {
  const helperText =
    type === 'cave'
      ? 'Ir a cavidad'
      : type === 'system'
        ? 'Ir a sistema'
        : type === 'exploration'
          ? 'Ir a informe de exploración'
          : type === 'group'
            ? 'Ir a grupo'
            : 'Navegar'

  return (
    <>
      {value && (
        <Link
          href={baseUrl + value._id}
          className="w-fit"
        >
          <ResponsiveTooltip content={helperText}>
            <Badge
              role="badge"
              className="max-h-5 select-none rounded-full min-w-11 shrink-0 whitespace-nowrap bg-muted hover:bg-emphasis/30 border border-emphasis cursor-pointer space-x-1 text-emphasis"
            >
              <span className="text-xs font-normal">
                {showText || value.name}
              </span>
              <span className="text-sm">{<FaAnchor />}</span>
            </Badge>
          </ResponsiveTooltip>
        </Link>
      )}
    </>
  )
}
