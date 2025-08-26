'use client'
import React from 'react'
import {signIn} from 'next-auth/react'

import {type Answer} from '@/database/types/Answer'

import {Input} from '@/components/Atoms/input'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'

/**
 * @version 1
 * @description Formulario para reenviar el email de inicio de sesión
 * @param emailCallbackUrl  URL a la que se redirige al usuario al hacer clic en el enlace del email
 */

export default function ResendSigninForm({
  emailCallbackUrl,
}: {
  emailCallbackUrl: string
}) {
  const [isPending, startTransition] = React.useTransition()
  const [answer, setAnswer] = React.useState<Answer | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    startTransition(async () => {
      setAnswer(null)
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const result = await signIn('resend', {
        email: formData.get('email') as string,
        redirect: false,
        redirectTo: emailCallbackUrl,
      })
      if (result?.error)
        setAnswer({ok: false, message: 'Algo salió mal, intentalo de nuevo'})
      else if (result?.ok) setAnswer({ok: true, message: 'Email enviado'})
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        name="email"
        type="email"
        placeholder="arcaute@mail.com"
      />
      <DbAwnserBox answer={answer} />
      {!answer?.ok && <SubmitButton isPending={isPending} />}
    </form>
  )
}
