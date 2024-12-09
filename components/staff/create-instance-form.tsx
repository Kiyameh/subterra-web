'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import DbAwnserBox from '@/components/forms/ui/db-answer-box'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import TextField from '@/components/fields/text-field'
import SubmitButton from '@/components/forms/ui/submit-button'

import {
  InstanceFormSchema,
  InstanceFormValues,
} from '@/database/validation/instance.schemas'
import {createOneInstance} from '@/database/services/instance.services'
import TextAreaField from '../fields/text-area-field'

const EMPTY_INSTANCE: InstanceFormValues = {
  name: '',
  fullname: '',
  acronym: '',
  description: '',
  territory: '',
  owner: '',
  coordinator: '',
  public_visibility: true,
  public_edition: false,
}

/**
 * @version 1
 * @description Formulario para crear una instancia
 * @param commander Staff que crea la instancia
 */

export default function CreateInstanceForm({commander}: {commander: string}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<InstanceFormValues>({
    resolver: zodResolver(InstanceFormSchema),
    defaultValues: EMPTY_INSTANCE,
  })

  function onSubmit(values: InstanceFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createOneInstance(values, commander)
      setDbAnswer(answer)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <TextField
          control={form.control}
          name="name"
          label="Nombre corto"
        />
        <TextField
          control={form.control}
          name="fullname"
          label="Nombre completo"
        />
        <TextField
          control={form.control}
          name="acronym"
          label="Siglas"
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Descripción"
        />
        <TextField
          control={form.control}
          name="territory"
          label="Territorio"
        />
        <TextField
          control={form.control}
          name="owner"
          label="Grupo propietario"
        />
        <TextField
          control={form.control}
          name="coordinator"
          label="Usuario coordinador"
        />
        {/* //TODO: Añadir campos de visibilidad
         */}
        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <p>Instancia creadad</p>
        ) : (
          <SubmitButton
            label="Crear instancia"
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  )
}
