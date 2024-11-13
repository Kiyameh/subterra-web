'use client'
import React from 'react'
import {Loader2} from 'lucide-react'

import {useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {SignInSchema, SignInValues} from '@/database/validation/auth.schemas'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import signIn from '@/database/actions/auth/signin'
import {Answer} from '@/database/types/answer.type'
import DbAnswerBox from '@/components/displaying/db-answer-box'
import LinkButton from '@/components/navigation/link-button'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

export default function SignInForm() {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: SignInValues) => {
    // Vaciar el mensaje de la base de datos
    setDbAnswer(null)
    // Iniciar la transmisión a la base de datos
    startTransition(async () => {
      const answer = await signIn(values)
      setDbAnswer(answer)
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
        {dbAnswer?.code === 401 && (
          <LinkButton
            label="¿Olvidaste tu contraseña?"
            href="/forgot-password"
            variant="link"
          />
        )}

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
