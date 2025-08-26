import Link from 'next/link'
import {MdEmail, MdPhone, MdLink, MdOpenInNew} from 'react-icons/md'

/**
 * @version 1
 * @description Slot de enlace con label y valores
 * @param label Texto del slot
 * @param value Valor del enlace
 * @param type Tipo de enlace (email, phone, internal, external)
 * @param showText Texto a mostrar en el enlace
 */

export function LinkSlot({
  label,
  value,
  type,
  showText,
}: {
  label: string
  value?: string
  type?: 'email' | 'phone' | 'internal' | 'external'
  showText?: string
}) {
  const icon =
    type === 'email' ? (
      <MdEmail />
    ) : type === 'phone' ? (
      <MdPhone />
    ) : type === 'internal' ? (
      <MdLink />
    ) : type === 'external' ? (
      <MdOpenInNew />
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
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      {value && (
        <Link
          href={href || ''}
          className="flex gap-2 items-center"
        >
          <span className="hover:text-primary text-sm">
            {showText || value}
          </span>
          <span className="text-primary">{icon}</span>
        </Link>
      )}
    </div>
  )
}
