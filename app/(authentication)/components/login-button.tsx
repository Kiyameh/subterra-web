'use client'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import React from 'react'
import {MdOutlineAdd} from 'react-icons/md'

export default function LoginButton() {
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
