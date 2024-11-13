import React from 'react'
import SolidCard from '../containing/solid-card'
import {MdLogin} from 'react-icons/md'
import {Button} from '../ui/button'
import {FcGoogle} from 'react-icons/fc'
import Divider from '../displaying/divider'
import SignInForm from './signin-form'

export default function SignInCard() {
  return (
    <SolidCard
      className="w-[420px] max-w-[90%]"
      title="Iniciar sesión"
      icon={<MdLogin />}
      content={<SignInForm />}
      footer={
        <div className="w-full flex flex-col gap-3">
          <Divider text="o" />
          <Button className="w-full text-gray-600 font-bold bg-white hover:bg-blue-200">
            <FcGoogle className="h-8 w-8" />
            Google
          </Button>
        </div>
      }
    />
  )
}
