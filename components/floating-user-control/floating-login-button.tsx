'use client'
import {Button} from '@/components/ui/button'
import React from 'react'
import {MdOutlineAdd} from 'react-icons/md'
import LoginWrapper from '../_Molecules/auth/login-wrapper'

/**
 * @version 1
 * @description Componente que renderiza un botón flotante que redirige a la página de login
 */

export default function FloatingLoginButton() {
  return (
    <LoginWrapper>
      <Button className="rounded-full h-10 w-10 flex items-center justify-center">
        <MdOutlineAdd className="scale-150" />
      </Button>
    </LoginWrapper>
  )
}
