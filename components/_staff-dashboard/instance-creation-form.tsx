'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/Answer.type'
import {
  InstanceFormValues,
  instanceMaxCharacters,
} from '@/database/validation/instance.schemas'
import {InstanceFormSchema} from '@/database/validation/instance.schemas'

import {Form} from '@/components/ui/form'
import TextField from '@/components/_Atoms/fields/text-field'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import BooleanField from '@/components/_Atoms/fields/boolean-field'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'
import {Button} from '@/components/ui/button'
import Divider from '@/components/_Atoms/boxes/divider'
import {createInstance} from '@/database/services/Instance/createInstance'

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
  master_instance: '',
}

/**
 * @version 1
 * @description Formulario para crear una instancia
 * @param commanderId Staff que crea la instancia
 */

export default function InstanceCreationForm({
  commanderId,
}: {
  commanderId: string
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<InstanceFormValues>({
    resolver: zodResolver(InstanceFormSchema),
    defaultValues: EMPTY_INSTANCE,
  })

  function onSubmit(values: InstanceFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createInstance(values, commanderId)
      setDbAnswer(answer)
    })
  }

  function handleReset(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    form.reset()
    setDbAnswer(null)
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
          maxCharacters={instanceMaxCharacters.name}
        />
        <TextField
          control={form.control}
          name="fullname"
          label="Nombre completo"
          maxCharacters={instanceMaxCharacters.fullname}
        />
        <TextField
          control={form.control}
          name="acronym"
          label="Siglas"
          maxCharacters={instanceMaxCharacters.acronym}
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Descripción"
          maxCharacters={instanceMaxCharacters.description}
        />
        <TextField
          control={form.control}
          name="territory"
          label="Territorio"
          maxCharacters={instanceMaxCharacters.territory}
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
        <BooleanField
          control={form.control}
          name="public_visibility"
          label="Visibilidad pública"
        />
        <BooleanField
          control={form.control}
          name="public_edition"
          label="Edición pública"
        />
        <Divider text="Instancia Maestra" />
        <TextField
          control={form.control}
          name="master_instance"
          label="Instancia Maestra"
        />

        <ReactHookFormErrorBox errors={form.formState.errors} />
        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <Button
            variant="secondary"
            onClick={handleReset}
          >
            Crear otra instancia
          </Button>
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
