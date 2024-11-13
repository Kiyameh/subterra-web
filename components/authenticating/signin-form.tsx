'use client'
import React from 'react'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {SigninSchema} from '@/schemas/auth.schemas'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '../ui/input'
import {Button} from '../ui/button'
import DbAnswerBox from '../displaying/db-answer-box'
import Answer from '@/database/tools/Answer'

export default function SignInForm() {
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof SigninSchema>) => {
    console.log(values)
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
                  placeholder="******"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DbAnswerBox answer={new Answer(400, 'Contraseña incorrecta')} />
        <Button
          className="w-full"
          type="submit"
        >
          Iniciar sesión
        </Button>
      </form>
    </Form>
  )
}
