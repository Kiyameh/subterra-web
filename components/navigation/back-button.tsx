'use client'
import React from 'react'
import {Button, ButtonProps} from '../ui/button'
import {useRouter} from 'next/navigation'
import {TiBackspaceOutline} from 'react-icons/ti'
import {cn} from '@/lib/utils'

/**
 * Botón para volver a la página anterior mediante router de next
 * @param className Clases adicionales para componente Button
 * @param size Tamaño del botón [icon, sm, lg, default]
 */
export default function BackButton({
  className,
  size = 'default',
  ...props
}: ButtonProps) {
  const router = useRouter()
  let style = ''
  let ghost = false
  switch (size) {
    case 'icon':
      style = 'w-10 h-10 rounded-full'
      ghost = true

      break
    case 'sm':
      style = 'w-20'
      ghost = true
      break
    default:
      style = 'w-full'
  }

  const classes = cn(style, className)

  return (
    <Button
      className={classes}
      size={size}
      variant={ghost ? 'ghost' : 'secondary'}
      onClick={() => {
        router.back()
      }}
      {...props}
    >
      <TiBackspaceOutline className="scale-125" />
      {size !== 'icon' && <span>Volver</span>}
    </Button>
  )
}
