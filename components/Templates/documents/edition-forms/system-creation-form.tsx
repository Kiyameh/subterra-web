'use client'
import React, { MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { type Answer } from '@/database/types/Answer'
import { type SystemFormValues } from '@/database/types/System'
import { SystemSchema } from '@/database/types/System'
import { createSystem } from '@/database/services/System/createSystem'

import { Form } from '@/components/Atoms/form'
import { Button } from '@/components/Atoms/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Atoms/tabs'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import LinkButton from '@/components/Molecules/buttons/link-button'
import ReactHookFormErrorBox from '@/components/Molecules/boxes/rhf-error-box'

import { EMPTY_SYSTEM } from './empty-system'

import {
  PiNumberCircleFourFill,
  PiNumberCircleOneFill,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoFill,
} from 'react-icons/pi'

import SystemGeneralFormFragment from './system-form-fragment-general'
import SystemScienceFormFragment from './system-form-fragment-sciences'
import { TopographyUploader } from '@/components/Organisms/file-uploader/topography-uploader'
import { PictureUploader } from '@/components/Organisms/file-uploader/picture-uploader'

/**
 * @version 2
 * @description Formulario para crear un sistema
 * @param instanceId Id de la instancia
 * @param commanderId Editor que crea el sistema
 */

export default function SystemCreationForm({
  instanceId,
  commanderId,
}: {
  instanceId: string
  commanderId: string
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SystemFormValues>({
    resolver: zodResolver(SystemSchema),
    defaultValues: {
      ...EMPTY_SYSTEM,
      instances: [instanceId],
    },
  })

  function onSubmit(values: SystemFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createSystem(values, commanderId)
      setDbAnswer(answer)
    })
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    form.reset({
      ...EMPTY_SYSTEM,
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
                value="science"
                className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
              >
                <PiNumberCircleTwoFill className="text-2xl rounded-full" />
                Ciencias
              </TabsTrigger>
              <TabsTrigger
                value="topography"
                className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
              >
                <PiNumberCircleThreeFill className="text-2xl rounded-full" />
                Topografía
              </TabsTrigger>
              <TabsTrigger
                value="pictures"
                className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
              >
                <PiNumberCircleFourFill className="text-2xl rounded-full" />
                Imagenes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <SystemGeneralFormFragment form={form} />
            </TabsContent>

            <TabsContent value="science">
              <SystemScienceFormFragment form={form} />
            </TabsContent>
            <TabsContent value="topography">
              <TopographyUploader
                control={form.control}
                name="topographies"
                maxFiles={10}
              />
            </TabsContent>
            <TabsContent value="pictures">
              <PictureUploader
                control={form.control}
                name="pictures"
                maxImages={10}
              />
            </TabsContent>
          </Tabs>
        )}

        <ReactHookFormErrorBox errors={form.formState.errors} />

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <div className="flex flex-row gap-2">
            <LinkButton
              label="Ver sistema"
              href={`${dbAnswer._id}`}
            />
            <Button
              variant="secondary"
              onClick={handleReset}
            >
              Crear otro sistema
            </Button>
          </div>
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
