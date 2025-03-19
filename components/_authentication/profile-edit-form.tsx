'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {updateUser} from '@/database/services/user.actions'
import {Answer} from '@/database/types/Answer.type'
import {signIn} from 'next-auth/react'

import {Form} from '@/components/ui/form'
import TextField from '@/components/_Atoms/fields/text-field'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import BackButton from '@/components/_Atoms/buttons/back-button'
import {User} from 'next-auth'
import {
  ProfileEditSchema,
  ProfileEditValues,
} from '@/database/validation/auth.schemas'
import {Button} from '@/components/ui/button'
import DeleteUserDialog from './delete-user-dialog'

interface UserWithFullname extends User {
  fullname: string | undefined
}

/**
 * @version 1
 * @description Formulario de editar perfil de usuario
 */

export default function ProfileEditForm({user}: {user: UserWithFullname}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(ProfileEditSchema),
    defaultValues: user as ProfileEditValues,
  })

  const onSubmit = (values: ProfileEditValues) => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await updateUser(values)
      setDbAnswer(answer)
    })
  }

  if (!user.email) return null

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
            <BackButton />
          ) : (
            <SubmitButton isPending={isPending} />
          )}
        </form>

        <Button
          type="reset"
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
          Solicitar reinicio de contraseña
        </Button>
        <Button
          type="reset"
          className="w-full"
          variant="ghost"
          onClick={() => setDialogOpen(true)}
        >
          Eliminar perfil
        </Button>
      </Form>
      <DeleteUserDialog
        userEmail={user.email}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
