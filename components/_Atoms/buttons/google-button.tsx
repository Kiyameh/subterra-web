'use client'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {Button} from '@/components/ui/button'

/**
 * @version 1
 * @description Botón de inicio de sesión con Google
 */
export default function GoogleButton() {
  const [text, setText] = React.useState('')

  return (
    <>
      <p className="text-center text-gray-600">{text}</p>
      <Button
        type="submit"
        className="w-full text-gray-600 font-bold bg-white hover:bg-blue-200"
        onClick={() =>
          setText('Funcionalidad en desarrollo. Disponible próximamente.')
        }
      >
        Continua con
        <FcGoogle className="h-8 w-8" />
        Google
      </Button>
    </>
  )
}
