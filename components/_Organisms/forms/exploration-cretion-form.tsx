'use client'
import React, {MouseEvent} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/answer.type'
import {
  ExplorationFormValues,
  explorationMaxCharacters,
} from '@/database/validation/exploration.schemas'
import {ExplorationFormSchema} from '@/database/validation/exploration.schemas'
import {GroupIndex} from '@/database/services/group.actions'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import MultiRefSelectField from '@/components/_Atoms/fields/multi-ref-select-field'
import TextField from '@/components/_Atoms/fields/text-field'
import MultiTextField from '@/components/_Atoms/fields/multi-text-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import MultiDateField from '@/components/_Atoms/fields/multi-date-field'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {Button} from '@/components/ui/button'
import TimeField from '@/components/_Atoms/fields/time-field'
import {CaveIndex} from '@/database/services/cave.actions'
import {createExploration} from '@/database/services/exploration.actions'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'

const EMPTY_EXPLORATION: ExplorationFormValues = {
  instances: [],
  groups: [],
  caves: [],
  datatype: 'exploration',

  name: '',
  dates: [],
  cave_time: 0,
  participants: [],
  collaborators: [],

  description: '',
  incidents: '',
  inventory: '',
  pending_work: '',
}

/**
 * @version 1
 * @description Formulario para crear una cavidad
 * @param instanceId Id de la instancia
 * @param commanderId Editor que crea la cavidad
 * @param groupIndex Índice de grupos
 * @param caveIndex Índice de cavidades
 */

export default function ExplorationCreationForm({
  instanceId,
  commanderId,
  groupIndex,
  caveIndex,
}: {
  instanceId: string
  commanderId: string
  groupIndex: GroupIndex[] | undefined
  caveIndex: CaveIndex[] | undefined
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<ExplorationFormValues>({
    resolver: zodResolver(ExplorationFormSchema),
    defaultValues: {
      ...EMPTY_EXPLORATION,
      instances: [instanceId],
    },
  })

  function onSubmit(values: ExplorationFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createExploration(values, commanderId)
      setDbAnswer(answer)
    })
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    form.reset({
      ...EMPTY_EXPLORATION,
      instances: [instanceId],
    })
    window.scrollTo(0, 0)
    setDbAnswer(null)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <MultiRefSelectField
          control={form.control}
          name="groups"
          label="Grupos"
          index={groupIndex}
        />
        <MultiRefSelectField
          control={form.control}
          name="caves"
          label="Cavidades"
          index={caveIndex}
        />
        <TextField
          control={form.control}
          name="name"
          label="Titulo de la exploracion"
          maxCharacters={explorationMaxCharacters.name}
        />
        <MultiDateField
          control={form.control}
          name="dates"
          label="Fechas de la exploración"
        />

        <TimeField
          control={form.control}
          name="cave_time"
          label="Tiempo en cueva"
          description="Tiempo aproximado de trabajo dentro de cavidad"
        />

        <MultiTextField
          control={form.control}
          name="participants"
          label="Participantes"
          description="Introduce los participantes separados por enter"
        />
        <MultiTextField
          control={form.control}
          name="collaborators"
          label="Colaboradores"
          description="Introduce personas o entidades colaboradoras separadas por enter"
        />

        <TextAreaField
          control={form.control}
          name="description"
          label="Relato de la exploración"
          maxCharacters={explorationMaxCharacters.description}
        />

        <TextAreaField
          control={form.control}
          name="incidents"
          label="Incidentes ocurridos"
          maxCharacters={explorationMaxCharacters.incidents}
        />
        <TextAreaField
          control={form.control}
          name="inventory"
          label="Inventario de la exploración"
          maxCharacters={explorationMaxCharacters.inventory}
        />
        <TextAreaField
          control={form.control}
          name="pending_work"
          label="Trabajos pendientes"
          maxCharacters={explorationMaxCharacters.pending_work}
        />
        <ReactHookFormErrorBox errors={form.formState.errors} />

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <div className="flex flex-row gap-2">
            <LinkButton
              label="Ver informe"
              href={`${dbAnswer._id}`}
            />
            <Button
              variant="secondary"
              onClick={handleReset}
            >
              Crear otro informe
            </Button>
          </div>
        ) : (
          <SubmitButton
            label="Crear informe"
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  )
}
