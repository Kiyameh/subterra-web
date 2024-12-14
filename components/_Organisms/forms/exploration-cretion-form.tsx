'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/answer.type'
import {ExplorationFormValues} from '@/database/validation/exploration.schemas'
import {ExplorationFormSchema} from '@/database/validation/exploration.schemas'
import {createExploration} from '@/database/services/exploration.services'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'

const EMPTY_EXPLORATION: ExplorationFormValues = {
  name: '',
  datatype: 'exploration',
  instances: [''],
  groups: [''],
}

/**
 * @version 1
 * @description Formulario para crear una cavidad
 * @param instanceName Nombre de la instancia
 * @param commanderId Editor que crea la cavidad
 */

export default function ExplorationCreationForm({
  instanceName,
  commanderId,
}: {
  instanceName: string
  commanderId: string
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<ExplorationFormValues>({
    resolver: zodResolver(ExplorationFormSchema),
    defaultValues: EMPTY_EXPLORATION,
  })

  function onSubmit(values: ExplorationFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createExploration(values, instanceName, commanderId)
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
