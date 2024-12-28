'use client'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {Button} from '@/components/ui/button'
import {signIn} from 'next-auth/react'
import {useSearchParams} from 'next/navigation'

/**
 * @version 1
 * @description Botón de inicio de sesión con Google
 */
export default function GoogleButton() {
  const searchParams = useSearchParams()
  const src = searchParams.get('src')

  function handleSignIn() {
    signIn('google', {
      redirectTo: src || '/',
    })
  }
  return (
    <Button
      className="w-full text-gray-600 font-bold bg-white hover:bg-blue-200"
      onClick={handleSignIn}
    >
      Continua con
      <FcGoogle className="h-8 w-8" />
      Google
    </Button>
  )
}
