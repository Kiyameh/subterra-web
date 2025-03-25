'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {signIn} from 'next-auth/react'

import {type User} from 'next-auth'
import {type Answer} from '@/database/types/Answer'
import {updateUser} from '@/database/services/User/updateUser'
import {ProfileEditValues} from '@/database/validation/auth.schemas'
import {ProfileEditSchema} from '@/database/validation/auth.schemas'

import {Form} from '@/components/Atoms/form'
import {Button} from '@/components/Atoms/button'
import TextField from '@/components/Molecules/fields/text-field'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import BackButton from '@/components/Molecules/buttons/back-button'
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
