'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

import {Loader2} from 'lucide-react'
import {zodResolver} from '@hookform/resolvers/zod'

import {useForm} from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import DbAnswerBox from '@/components/forms/ui/db-answer-box'

import {SignInSchema, SignInValues} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/answer.type'
import {signIn} from 'next-auth/react'

export default function LoginForm() {
  const router = useRouter()
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: SignInValues) => {
    console.log(values)
    // Vaciar el mensaje de error
    setDbAnswer(null)
    // Iniciar el inicio de sesión con next-auth
    startTransition(async () => {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (res?.error) {
        setDbAnswer({
          ok: false,
          code: 401,
          message: 'Credenciales incorrectas',
        })
      } else {
        setDbAnswer({
          ok: true,
          code: 200,
          message: 'Sesión iniciada',
        })
        // Redirigir a la página anterior con un retraso de un segundo
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="arcaute@mail.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="******"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DbAnswerBox answer={dbAnswer} />

        <Button
          disabled={isPending}
          className="w-full"
          type="submit"
        >
          {isPending && <Loader2 className="animate-spin" />}
          Iniciar sesión
        </Button>
      </form>
    </Form>
  )
}
