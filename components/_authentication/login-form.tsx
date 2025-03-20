'use client'
import React from 'react'
import {useSearchParams} from 'next/navigation'

import {Answer} from '@/database/types/Answer'

import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import {Input} from '@/components/ui/input'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {loginUser} from '@/database/services/User/loginUser'

/**
 * @version 1
 * @description Formulario de inicio de sesión
 */

export default function LoginForm() {
  // Página de la que proviene el usuario:
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/'

  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    startTransition(async () => {
      setDbAnswer(null)
      event.preventDefault()
      const formData = new FormData(event.currentTarget)

      const success = await loginUser(formData, callbackUrl)

      if (!success) {
        setDbAnswer({ok: false, message: 'Credenciales incorrectas'})
      }
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6"
      >
        <label htmlFor="email">
          Email
          <Input
            name="email"
            type="email"
            placeholder="arcaute@mail.com"
          />
        </label>
        <label htmlFor="password">
          Contraseña
          <Input
            name="password"
            type="password"
            placeholder="******"
          />
        </label>

        <DbAwnserBox answer={dbAnswer} />
        <SubmitButton isPending={isPending} />
      </form>
      {dbAnswer?.message === 'Credenciales incorrectas' && (
        <LinkButton
          href="/auth/forgot-password"
          label="Recuperar contraseña"
          variant="ghost"
          className="w-full"
        />
      )}
    </>
  )
}
