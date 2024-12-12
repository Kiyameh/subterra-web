'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'next/navigation'

import {SignUpSchema, SignUpValues} from '@/database/validation/auth.schemas'
import {signUp} from '@/database/services/user.services'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import TextField from '@/components/_Atoms/fields/text-field'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'

const EMPTY_USER: SignUpValues = {
  email: '',
  name: '',
  fullname: '',
  password: '',
  passwordConfirmation: '',
}

/**
 * @version 1
 * @description Formulario de registro
 */

export default function RegisterForm() {
  const router = useRouter()
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: EMPTY_USER,
  })

  const onSubmit = (values: SignUpValues) => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await signUp(values)
      setDbAnswer(answer)
      if (answer.ok) {
        setTimeout(() => {
          // Redirigir a login
          router.replace('/auth/login')
        }, 500)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <TextField
          control={form.control}
          name="email"
          label="Correo electrónico"
          placeholder="arcaute@mail.com"
          type="email"
        />
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
        <SubmitButton isPending={isPending} />
      </form>
    </Form>
  )
}
