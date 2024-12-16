'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/answer.type'
import {
  ExplorationFormValues,
  explorationMaxCharacters,
} from '@/database/validation/exploration.schemas'
import {ExplorationFormSchema} from '@/database/validation/exploration.schemas'
import {createExploration} from '@/database/services/exploration.services'
import {GroupIndex} from '@/database/models/Group.model'
import {CaveIndex} from '@/database/models/Cave.model'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import MultiRefSelectField from '@/components/_Atoms/fields/multi-ref-select-field'
import TextField from '@/components/_Atoms/fields/text-field'
import MultiTextField from '@/components/_Atoms/fields/multi-text-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import MultiDateField from '@/components/_Atoms/fields/multi-date-field'

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
 * @param instanceName Nombre de la instancia
 * @param commanderId Editor que crea la cavidad
 */

export default function ExplorationCreationForm({
  instanceName,
  commanderId,
  groupIndex,
  caveIndex,
}: {
  instanceName: string
  commanderId: string
  groupIndex: GroupIndex[] | undefined
  caveIndex: CaveIndex[] | undefined
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

        <TextField
          control={form.control}
          name="cave_time"
          label="Tiempo en cueva"
          description="Tiempo aproximado de trabajo dentro de cavidad"
          endContent="horas"
          type="number"
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

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <p>Informe creado</p>
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
