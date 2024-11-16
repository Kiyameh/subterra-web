import React from 'react'
import {FaUserPlus} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import SolidCard from '@/components/containing/solid-card'
import Divider from '@/components/displaying/divider'
import {Button} from '@/components/ui/button'
import SignUpForm from './signup-form'

export default function SignUpCard() {
  return (
    <SolidCard
      className="w-[420px] max-w-[90%]"
      title="Registrarse"
      icon={<FaUserPlus className="w-6 h-6" />}
      content={
        <div className="flex flex-col gap-2">
          <SignUpForm />
        </div>
      }
      footer={
        <div className="w-full flex flex-col gap-3">
          <Divider text="o" />
          <Button className="w-full text-gray-600 font-bold bg-white hover:bg-blue-200">
            Continua con
            <FcGoogle className="h-8 w-8" />
            Google
          </Button>
        </div>
      }
    />
  )
}
