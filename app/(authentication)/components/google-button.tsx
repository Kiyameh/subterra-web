'use client'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {Button} from '@/components/ui/button'

interface GoogleButtonProps {
  onClick?: () => void
}

export default function GoogleButton({onClick}: GoogleButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full text-gray-600 font-bold bg-white hover:bg-blue-200"
    >
      Continua con
      <FcGoogle className="h-8 w-8" />
      Google
    </Button>
  )
}
