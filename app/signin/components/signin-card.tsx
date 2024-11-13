import React from 'react'
import {MdLogin} from 'react-icons/md'
import {FcGoogle} from 'react-icons/fc'
import SolidCard from '@/components/containing/solid-card'
import Divider from '@/components/displaying/divider'
import LinkButton from '@/components/navigation/link-button'
import {Button} from '@/components/ui/button'
import SignInForm from './signin-form'

export default function SignInCard() {
  return (
    <SolidCard
      className="w-[420px] max-w-[90%]"
      title="Iniciar sesión"
      icon={<MdLogin className="w-6 h-6" />}
      content={
        <div className="flex flex-col gap-2">
          <SignInForm />
          <LinkButton
            className="text-slate-300"
            label="¿No tienes cuenta?"
            href="/signup"
            variant="link"
          />
        </div>
      }
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
