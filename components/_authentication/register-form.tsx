'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {SignUpSchema, SignUpValues} from '@/database/validation/auth.schemas'
import {signUp} from '@/database/services/user.actions'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import TextField from '@/components/_Atoms/fields/text-field'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import {User} from 'next-auth'
import {UserProfileCard} from '../_Atoms/slots/user-slots'
import {signIn, signOut} from 'next-auth/react'
import {Button} from '../ui/button'

/**
 * @version 1
 * @description Formulario de registro
 * @param user User - Usuario autenticado
 */

export default function RegisterForm({user}: {user: User}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: user.email as string,
      password: '',
      passwordConfirmation: '',
      name: '',
      fullname: '',
    },
  })

  const onSubmit = (values: SignUpValues) => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await signUp(values)
      setDbAnswer(answer)
    })
  }

  const handleReSignin = async () => {
    await signOut({
      redirect: false,
    })
    await signIn('credentials', {
      email: user.email as string,
      password: form.getValues('password') as string,
      redirect: true,
      redirectTo: '/',
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
        <TextField
          control={form.control}
          name="name"
          label="Nombre de usuario"
          placeholder="Arcaute"
        />
        <TextField
          control={form.control}
          name="fullname"
          label="Nombre completo"
          placeholder="Félix Ruiz de Arcaute"
        />

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <Button
            variant="secondary"
            onClick={handleReSignin}
          >
            Ir a Subterra
          </Button>
        ) : (
          <SubmitButton isPending={isPending} />
        )}
      </form>
    </Form>
  )
}
