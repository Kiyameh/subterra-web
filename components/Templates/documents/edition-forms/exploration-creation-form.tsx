'use client'
import React, { MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { type Answer } from '@/database/types/Answer'
import { type CaveIndex } from '@/database/services/Cave/getCaveIndex'
import { type GroupIndex } from '@/database/services/Group/getGroupsIndex'
import { type ExplorationFormValues } from '@/database/types/Exploration'
import { createExploration } from '@/database/services/Exploration/createExploration'
import { ExplorationSchema } from '@/database/types/Exploration'

import { Form } from '@/components/Atoms/form'
import { Button } from '@/components/Atoms/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Atoms/tabs'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import LinkButton from '@/components/Molecules/buttons/link-button'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import ReactHookFormErrorBox from '@/components/Molecules/boxes/rhf-error-box'
import { PictureUploader } from '@/components/Organisms/file-uploader/picture-uploader'

import { PiNumberCircleOneFill, PiNumberCircleTwoFill } from 'react-icons/pi'

import ExplorationGeneralFormFragment from './explo-form-fragment-general'

import { EMPTY_EXPLORATION } from './empty-exploration'

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
    resolver: zodResolver(ExplorationSchema),
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
              <PictureUploader
                control={form.control}
                name="pictures"
                maxImages={10}
              />            </TabsContent>
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
