'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import logoSmallLight from '@/public/logos/logo_small_light.svg'
import logoMediumLight from '@/public/logos/logo_medium_light.svg'
import logoBigLight from '@/public/logos/logo_big_light.svg'
import logoSmallDark from '@/public/logos/logo_small_dark.svg'
import logoMediumDark from '@/public/logos/logo_medium_dark.svg'
import logoBigDark from '@/public/logos/logo_big_dark.svg'

/**
 * @version 1
 * @description Componente que renderiza el logo de Subterra
 * @param size Tamaño del logo ['small', 'medium', 'big']
 * @param customWidth Ancho personalizado del logo
 * @param href Enlace al que redirige el logo
 * @default
 * size 'medium' customWidth ["small":50, "medium":140, "big":220]
 * @ToDo Añadir interactividad con el thema si se añade modo claro
 */

export default function SubterraLogo({
  size = 'small',
  customWidth,
  href,
}: {
  size?: 'small' | 'medium' | 'big'
  customWidth?: number
  href?: string
}) {
  const isDarkMode = true // TODO: Añadir interactividad con el thema si se añade modo claro
  const getLogoSrc = () => {
    if (!isDarkMode) {
      switch (size) {
        case 'small':
          return logoSmallLight
        case 'medium':
          return logoMediumLight
        case 'big':
          return logoBigLight
        default:
          return logoMediumLight
      }
    } else {
      switch (size) {
        case 'small':
          return logoSmallDark
        case 'medium':
          return logoMediumDark
        case 'big':
          return logoBigDark
        default:
          return logoMediumDark
      }
    }
  }
  const logo = (
    <Image
      src={getLogoSrc()}
      alt="Subterra Logo"
      width={
        customWidth
          ? customWidth
          : size === 'small'
            ? 50
            : size === 'medium'
              ? 140
              : 220
      }
    />
  )

  return href ? <Link href={href}>{logo}</Link> : logo
}
