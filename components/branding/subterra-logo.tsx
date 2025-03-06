'use client'
import React from 'react'
import Image from 'next/image'

/**
 * @version 1
 * @description Logo de Subterra en 20x20px
 */

export function SubterraLogoIcon({...props}) {
  return (
    <Image
      src="/logos/logo_small_dark.svg"
      alt="Subterra Logo"
      width="20"
      height="20"
      {...props}
    />
  )
}

/**
 * @version 1
 * @description Logo de Subterra en 50x50px
 */
export function SubterraLogoSm({...props}) {
  return (
    <Image
      src="/logos/logo_small_dark.svg"
      alt="Subterra Logo"
      width="50"
      height="50"
      {...props}
    />
  )
}

/**
 * @version 1
 * @description Logo de Subterra en 140x26px
 */
export function SubterraLogoMd({...props}) {
  return (
    <Image
      src="/logos/logo_medium_dark.svg"
      alt="Subterra Logo"
      width="140"
      height="26"
      {...props}
    />
  )
}

/**
 * @version 1
 * @description Logo de Subterra en 300x142px
 */

export function SubterraLogoLg({...props}) {
  return (
    <Image
      src="/logos/logo_big_dark.svg"
      alt="Subterra Logo"
      width="300"
      height="142"
      {...props}
    />
  )
}
