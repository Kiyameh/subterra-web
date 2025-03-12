'use client'
import React, {MouseEvent} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/answer.type'
import {ExplorationFormValues} from '@/database/validation/exploration.schemas'
import {ExplorationFormSchema} from '@/database/validation/exploration.schemas'
import {GroupIndex} from '@/database/services/group.actions'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

import LinkButton from '@/components/_Atoms/buttons/link-button'
import {Button} from '@/components/ui/button'
import {CaveIndex} from '@/database/services/cave.actions'
import {createExploration} from '@/database/services/exploration.actions'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'
import {PiNumberCircleOneFill, PiNumberCircleTwoFill} from 'react-icons/pi'
import ExplorationGeneralFormFragment from './1-general'
import ExplorationPicturesFormFragment from './2-pictures'
import {EMPTY_EXPLORATION} from './empty-exploration'

/**
 * @version 1
 * @description Formulario para crear una exploración
 * @param instanceId Id de la instancia
 * @param commanderId Editor que crea la exploración
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
        {!form.formState.isSubmitSuccessful && (
          <Tabs defaultValue="general">
            <TabsList className="mx-auto h-auto mb-2 flex flex-wrap bg-transparent">
              <TabsTrigger
                value="general"
                className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
              >
                <PiNumberCircleOneFill className="group data-[state=active]:text-primary text-2xl rounded-full" />
                General
              </TabsTrigger>

              <TabsTrigger
                value="pictures"
                className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
              >
                <PiNumberCircleTwoFill className="text-2xl rounded-full" />
                Imagenes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <ExplorationGeneralFormFragment
                form={form}
                caveIndex={caveIndex}
                groupIndex={groupIndex}
              />
            </TabsContent>

            <TabsContent value="pictures">
              <ExplorationPicturesFormFragment form={form} />
            </TabsContent>
          </Tabs>
        )}
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
