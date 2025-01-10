'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter, useSearchParams} from 'next/navigation'

import {SignInSchema, SignInValues} from '@/database/validation/auth.schemas'
import {signIn} from 'next-auth/react'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import TextField from '@/components/_Atoms/fields/text-field'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import {Button} from '@/components/ui/button'

/**
 * @version 1
 * @description Formulario de inicio de sesión
 */

export default function LoginForm() {
  // Página de la que proviene el usuario:
  const searchParams = useSearchParams()
  const router = useRouter()
  const src = searchParams.get('src')

  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    } as SignInValues,
  })

  const onSubmit = (values: SignInValues) => {
    // Vaciar el mensaje de error
    setDbAnswer(null)
    // Iniciar el inicio de sesión con next-auth
    startTransition(async () => {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (response?.error && response.code === 'not_verified') {
        setDbAnswer({
          ok: false,
          message: 'Email no verificado',
        })
      } else if (response?.error) {
        setDbAnswer({
          ok: false,
          message: 'Credenciales incorrectas',
        })
      } else {
        setDbAnswer({
          ok: true,
          message: 'Sesión iniciada',
        })

        // Redirigir a la página de origen
        router.push(src || '/')
      }
    })
  }

  return (
    <>
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

          <DbAwnserBox answer={dbAnswer} />
          <SubmitButton isPending={isPending} />
        </form>

        {dbAnswer?.message === 'Email no verificado' && (
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => {
              setDbAnswer({
                ok: true,
                message:
                  'Email de confirmación reenviado, revisa tu bandeja de entrada',
              })
              signIn('resend', {
                email: form.getValues('email'),
                redirect: false, // no redirigir actualmente
                redirectTo: '/auth/verify-email', // url de redirección enviada en el email
              })
            }}
          >
            Reenviar email de confirmación
          </Button>
        )}
        {dbAnswer?.message === 'Credenciales incorrectas' && (
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => {
              setDbAnswer({
                ok: true,
                message:
                  'Email de recuperación enviado, revisa tu bandeja de entrada',
              })
              signIn('resend', {
                email: form.getValues('email'),
                redirect: false, // no redirigir actualmente
                redirectTo: '/auth/reset-pass', // url de redirección enviada en el email
              })
            }}
          >
            Recuperar contraseña
          </Button>
        )}
      </Form>
    </>
  )
}
