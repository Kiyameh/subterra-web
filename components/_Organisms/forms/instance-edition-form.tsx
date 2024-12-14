'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {PopulatedInstance} from '@/database/models/Instance.model'
import {
  UpdateInstanceFormValues,
  UpdateInstanceFormSchema,
} from '@/database/validation/instance.schemas'
import {updateInstance} from '@/database/services/instance.services'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import TextField from '@/components/_Atoms/fields/text-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'

/**
 * @version 1
 * @description Formulario para editar los datos de una instancia
 * @param initialData datos iniciales de la instancia
 * @param commanderId _id del usuario que edita la instancia
 */

export default function InstanceEditionForm({
  initialData,
  commanderId,
}: {
  initialData: PopulatedInstance
  commanderId: string
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const {fullname, territory, description, acronym} = initialData

  const form = useForm<UpdateInstanceFormValues>({
    resolver: zodResolver(UpdateInstanceFormSchema),
    defaultValues: {fullname, territory, description, acronym},
  })

  function onSubmit(values: UpdateInstanceFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await updateInstance(values, initialData._id, commanderId)
      setDbAnswer(answer)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <div className="text-xl">Editar instancia</div>
        <TextField
          control={form.control}
          name="acronym"
          label="Acrónimo"
          placeholder="IGA"
        />
        <TextField
          control={form.control}
          name="fullname"
          label="Nombre completo"
          placeholder="Instancia General de Albacete"
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Texto de presentación"
          placeholder="Describe brevemente la instancia"
        />
        <TextField
          control={form.control}
          name="territory"
          label="Extensión territorial"
          placeholder="Provincia de Albacete"
        />

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.redirect ? (
          <LinkButton
            href={dbAnswer.redirect}
            variant={'secondary'}
            label="Ir al panel de instancia"
          />
        ) : (
          <SubmitButton
            label="Actualizar datos"
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  )
}
