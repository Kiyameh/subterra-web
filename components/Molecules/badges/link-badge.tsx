import React from 'react'
import {Badge} from '@/components/Atoms/badge'
import ResponsiveTooltip from './responsive-tooltip'
import Link from 'next/link'
import {MdEmail, MdPhone, MdLink, MdOpenInNew} from 'react-icons/md'

/**
 * @version 1
 * @description Badge que muestra un Link con un icono y un Tooltip
 * @param value Valor del enlace
 * @param showText Texto a mostrar en el enlace
 * @param type Tipo de enlace (email, phone, internal, external)
 */

export default function LinkBadge({
  value,
  showText,
  type,
}: {
  value: string | undefined
  showText?: string
  type?: 'email' | 'phone' | 'internal' | 'external'
}) {
  const icon =
    type === 'email' ? (
      <MdEmail role="icon" />
    ) : type === 'phone' ? (
      <MdPhone role="icon" />
    ) : type === 'internal' ? (
      <MdLink role="icon" />
    ) : type === 'external' ? (
      <MdOpenInNew role="icon" />
    ) : null

  const protocolPattern = /^(?:f|ht)tps?:\/\//i

  let href = value
  switch (type) {
    case 'email':
      href = `mailto:${value}`
      break
    case 'phone':
      href = `tel:${value}`
      break
    case 'internal':
      href = value
      break
    case 'external':
      href = value && !protocolPattern.test(value) ? `https://${value}` : value
      break
  }

  return (
    <>
      {href && (
        <Link
          href={href}
          className="w-fit"
        >
          <ResponsiveTooltip content={href}>
            <Badge
              className="select-none rounded-full min-w-28 w-fit bg-muted hover:bg-muted-foreground/50 border border-muted-foreground cursor-pointer space-x-1"
              role="badge"
            >
              <span className="hover:text-primary text-xs font-normal text-foreground/80 ">
                {showText || value}
              </span>
              <span className="text-primary text-sm">{icon}</span>
            </Badge>
          </ResponsiveTooltip>
        </Link>
      )}
    </>
  )
}
