'use client'
import React from 'react'
import Image from 'next/image'

/**
 * @version 1
 * @description Logo de Subterra en 20x20px
 */

export function SubterraLogoIcon() {
  return (
    <Image
      src="/logos/logo_small_dark.svg"
      alt="Subterra Logo"
      width="20"
      height="20"
    />
  )
}

/**
 * @version 1
 * @description Logo de Subterra en 50x50px
 */
export function SubterraLogoSm() {
  return (
    <Image
      src="/logos/logo_small_dark.svg"
      alt="Subterra Logo"
      width="50"
      height="50"
    />
  )
}

/**
 * @version 1
 * @description Logo de Subterra en 140x26px
 */
export function SubterraLogoMd() {
  return (
    <Image
      src="/logos/logo_medium_dark.svg"
      alt="Subterra Logo"
      width="140"
      height="26"
    />
  )
}

/**
 * @version 1
 * @description Logo de Subterra en 300x142px
 */

export function SubterraLogoLg() {
  return (
    <Image
      src="/logos/logo_big_dark.svg"
      alt="Subterra Logo"
      width="300"
      height="142"
    />
  )
}
