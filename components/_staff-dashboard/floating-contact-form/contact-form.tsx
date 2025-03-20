'use client'
import React from 'react'
import {Session} from 'next-auth'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {contactMaxCharacters} from '@/database/validation/platform.schemas'
import {contactFormSchema} from '@/database/validation/platform.schemas'
import {ContactFormValues} from '@/database/validation/platform.schemas'
import {contactSubjects} from '@/database/models/Platform.model'
import {Answer} from '@/database/types/Answer'
import {addContactMessage} from '@/database/services/Platform/addContactMessage'

import {Form} from '@/components/ui/form'
import TextField from '@/components/_Atoms/fields/text-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import SelectField from '@/components/_Atoms/fields/select-field'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import {UserProfileCard} from '@/components/_Atoms/slots/user-slots'
import BackButton from '@/components/_Atoms/buttons/back-button'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'

import {BiSolidMessage} from 'react-icons/bi'

/**
 * @version 1
 * @description Formulario de contacto
 * @param commander usuario que envía el mensaje (si existe)
 */

export default function ContactForm({
  commander,
}: {
  commander?: Session['user'] | undefined
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
      user: commander?._id || undefined,
      email: commander?.email || '',
      subject: 'Otro',
      message: '',
    } as ContactFormValues,
  })

  return (
    <>
      <CollapsibleBox
        title="Contacto"
        icon={<BiSolidMessage />}
        color="info"
        className="mb-4"
      >
        <p>● Envía un mensaje a los administradores de la plataforma.</p>
        <p>● Ten paciencia, responderán lo antes posible.</p>
        <p>
          ● También puedes enviar un correo a:{' '}
          <a
            href="mailto:info@subterra.app"
            className="text-emphasis"
          >
            info@subterra.app
          </a>
        </p>
      </CollapsibleBox>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {commander ? (
            <UserProfileCard user={commander} />
          ) : (
            <TextField
              control={form.control}
              name="email"
              label="Correo electrónico"
              placeholder="arcaute@mail.com"
            />
          )}
          <SelectField
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
            maxCharacters={contactMaxCharacters.message}
          />
          <DbAwnserBox answer={dbAnswer} />
          {dbAnswer?.ok ? (
            <BackButton />
          ) : (
            <SubmitButton isPending={isPending} />
          )}
        </form>
      </Form>
    </>
  )
}
