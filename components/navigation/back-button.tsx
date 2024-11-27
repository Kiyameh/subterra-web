'use client'
import React from 'react'
import {Button, ButtonProps} from '../ui/button'
import {useRouter} from 'next/navigation'

/**
 * Botón para volver a la página anterior mediante router de next
 * @param classname Clases adicionales para el botón
 * @default 'w-full'
 */
export default function BackButton({
  className = 'w-full',
  ...props
}: ButtonProps) {
  const router = useRouter()
  return (
    <Button
      className={className}
      variant={'secondary'}
      onClick={() => {
        router.back()
      }}
      {...props}
    >
      Volver
    </Button>
  )
}
