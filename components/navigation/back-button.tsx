'use client'
import React from 'react'
import {Button, ButtonProps} from '../ui/button'
import {useRouter} from 'next/navigation'

export default function BackButton({...props}: ButtonProps) {
  const router = useRouter()
  return (
    <Button
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
