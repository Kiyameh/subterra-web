'use client'

import React from 'react'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import {Input} from '../ui/input'
import {signIn} from 'next-auth/react'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import {Answer} from '@/database/types/Answer.type'

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
