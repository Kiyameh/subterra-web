'use client'
import React from 'react'
import {Session} from 'next-auth'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {contactFormSchema} from '@/database/validation/platform.schemas'
import {ContactFormValues} from '@/database/validation/platform.schemas'
import {contactSubjects} from '@/database/models/Platform.enums'
import {addContactMessage} from '@/database/services/platform.services'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import TextField from '@/components/fields/text-field'
import TextAreaField from '@/components/fields/text-area-field'
import SelectionField from '@/components/fields/selection-field'
import UserCard from '@/components/account/user-card'
import DbAwnserBox from '@/components/forms/ui/db-answer-box'
import SubmitButton from '@/components/forms/ui/submit-button'
import {maxCharacterLimits} from './hooks/use-max-character-limits'

/**
 * @version 1
 * @description Formulario de contacto
 * @param commander usuario que envía el mensaje (si existe)
 */

export default function ContactForm({
  commander,
}: {
  commander: Session['user'] | undefined
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(values: ContactFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await addContactMessage(values)
      setDbAnswer(answer)
    })
  }

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      user: commander?._id || '',
      email: commander?.email || '',
      subject: 'Otro',
      message: '',
    } as ContactFormValues,
  })

  const maxCharacters = maxCharacterLimits(contactFormSchema)
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {commander ? (
          <UserCard user={commander} />
        ) : (
          <TextField
            control={form.control}
            name="email"
            label="Correo electrónico"
            placeholder="arcaute@mail.com"
          />
        )}
        <SelectionField
          control={form.control}
          name="subject"
          label="Asunto"
          options={contactSubjects as unknown as string[]}
          placeholder="Selecciona un asunto"
        />
        <TextAreaField
          control={form.control}
          name="message"
          label="Mensaje"
          placeholder="Escribe tu mensaje aquí"
          maxCharacters={maxCharacters.message}
        />
        <DbAwnserBox answer={dbAnswer} />
        <SubmitButton isPending={isPending} />
      </form>
    </Form>
  )
}
