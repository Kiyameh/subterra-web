'use client'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import React from 'react'
import {MdOutlineAdd} from 'react-icons/md'

/**
 * @version 1
 * @description Componente que renderiza un botón flotante que redirige a la página de login
 */

export default function FloatingLoginButton() {
  const router = useRouter()
  const onClick = () => {
    router.push('/auth/login')
  }
  return (
    <Button
      onClick={onClick}
      className="rounded-full h-10 w-10 flex items-center justify-center"
    >
      <MdOutlineAdd className="scale-150" />
    </Button>
  )
}
