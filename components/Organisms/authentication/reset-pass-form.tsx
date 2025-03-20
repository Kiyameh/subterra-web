'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {updatePassword} from '@/database/services/User/updatePassword'

import {
  ResetPassSchema,
  ResetPassValues,
} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/Answer'

import TextField from '@/components/Molecules/fields/text-field'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import {User} from 'next-auth'
import {UserProfileCard} from '@/components/Molecules/slots/user-slots'

import LinkButton from '@/components/Molecules/buttons/link-button'
import {Form} from '@/components/Atoms/form'

/**
 * @version 1
 * @description Formulario de actualización de contraseña
 */

export default function ResetPassForm({user}: {user: User}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      email: user.email,
      password: '',
      passwordConfirmation: '',
    } as ResetPassValues,
  })

  const onSubmit = (values: ResetPassValues) => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await updatePassword(values)
      setDbAnswer(answer)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <UserProfileCard user={user} />
        <TextField
          control={form.control}
          name="password"
          label="Contraseña"
          placeholder="******"
          type="password"
        />
        <TextField
          control={form.control}
          name="passwordConfirmation"
          placeholder="******"
          type="password"
        />

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <LinkButton
            label="Volver"
            href="/"
          />
        ) : (
          <SubmitButton isPending={isPending} />
        )}
      </form>
    </Form>
  )
}
