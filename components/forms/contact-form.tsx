'use client'
import React from 'react'
import {Session} from 'next-auth'

import {contactFormSchema} from '@/database/validation/platform.schemas'
import {ContactFormValues} from '@/database/validation/platform.schemas'
import {contactSubjects} from '@/database/models/Platform.enums'

import {Form} from '@/components/ui/form'
import TextField from '@/components/fields/text-field'
import TextAreaField from '@/components/fields/text-area-field'
import SelectionField from '@/components/fields/selection-field'
import UserCard from '@/components/account/user-card'
import DbAwnserBox from '@/components/forms/ui/db-answer-box'
import {maxCharacterLimit} from '@/components/forms/hooks/use-max-character-limit'
import SubmitButton from '@/components/forms/ui/submit-button'
import {addNewContactMessage} from '@/database/services/platform.services'
import {useFormsLogic} from './hooks/use-forms-logic'

export default function ContactForm({
  commander,
}: {
  commander: Session['user'] | undefined
}) {
  const EMPTY_FORM = {
    user: commander?._id || '',
    email: commander?.email || '',
    subject: 'Otro',
    message: '',
  } as ContactFormValues

  const {form, onSubmit, isPending, control, dbAnswer} = useFormsLogic(
    contactFormSchema,
    EMPTY_FORM,
    addNewContactMessage
  )

  const messageMax = maxCharacterLimit(contactFormSchema, 'message')
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {commander ? (
          <UserCard user={commander} />
        ) : (
          <TextField
            control={control}
            name="email"
            label="Correo electrónico"
            placeholder="arcaute@mail.com"
          />
        )}
        <SelectionField
          control={control}
          name="subject"
          label="Asunto"
          options={contactSubjects as unknown as string[]}
          placeholder="Selecciona un asunto"
        />
        <TextAreaField
          control={control}
          name="message"
          label="Mensaje"
          placeholder="Escribe tu mensaje aquí"
          maxCharacters={messageMax}
        />
        <SubmitButton isPending={isPending} />
        <DbAwnserBox answer={dbAnswer} />
      </form>
    </Form>
  )
}
