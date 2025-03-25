import React from 'react'

import {Button} from '@/components/Atoms/button'
import {BiMessageDetail} from 'react-icons/bi'

/**
 * @version 1
 * @description Componente que renderiza un enlace flotante al formulario de contacto
 */

export default function FloatingContactButton({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <Button
      onClick={onClick}
      className="rounded-full h-10 w-10 flex items-center justify-center"
    >
      <BiMessageDetail className="scale-150" />
    </Button>
  )
}
