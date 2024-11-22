'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import {useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Loader2} from 'lucide-react'
import {SignUpSchema, SignUpValues} from '@/database/validation/auth.schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Answer} from '@/database/types/answer.type'
import DbAnswerBox from '@/components/displaying/db-answer-box'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import signUp from '@/database/actions/auth/signup'

const EMPTY_USER = {
  email: '',
  name: '',
  fullname: '',
  password: '',
  passwordConfirmation: '',
}

export default function RegisterForm() {
  const router = useRouter()
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: EMPTY_USER,
  })

  const onSubmit = (values: SignUpValues) => {
    // Vaciar el mensaje de la base de datos
    setDbAnswer(null)
    // Iniciar la transmisión a la base de datos
    startTransition(async () => {
      const answer = await signUp(values)
      setDbAnswer(answer)
      if (answer?.code === 200) {
        setTimeout(() => {
          router.push('/auth/login')
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
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({field}) => (
            <FormItem>
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
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Arcaute"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Félix Ruiz de Arcaute"
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
          Crear usuario
        </Button>
      </form>
    </Form>
  )
}
