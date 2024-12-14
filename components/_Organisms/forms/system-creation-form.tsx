'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/answer.type'
import {SystemFormValues} from '@/database/validation/system.schemas'
import {SystemFormSchema} from '@/database/validation/system.schemas'
import {createSystem} from '@/database/services/system.services'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'

const EMPTY_SYSTEM: SystemFormValues = {
  name: '',
  datatype: 'system',
  instances: [''],
}

/**
 * @version 1
 * @description Formulario para crear una cavidad
 * @param instanceName Nombre de la instancia
 * @param commanderId Editor que crea la cavidad
 */

export default function SystemCreationForm({
  instanceName,
  commanderId,
}: {
  instanceName: string
  commanderId: string
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SystemFormValues>({
    resolver: zodResolver(SystemFormSchema),
    defaultValues: EMPTY_SYSTEM,
  })

  function onSubmit(values: SystemFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createSystem(values, instanceName, commanderId)
      setDbAnswer(answer)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <p>AÑADIR FIELDS</p>

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <p>Sistema creadad</p>
        ) : (
          <SubmitButton
            label="Crear sistema"
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  )
}
