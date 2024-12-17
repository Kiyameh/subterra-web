import React from 'react'
import {Badge} from '@/components/ui/badge'
import Link from 'next/link'
import {FaAnchor} from 'react-icons/fa'
import ResponsiveTooltip from './responsive-tooltip'

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
            <Badge className="select-none rounded-full min-w-11 w-fit bg-muted hover:bg-emphasis/30 border border-emphasis cursor-pointer space-x-1 text-emphasis">
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
