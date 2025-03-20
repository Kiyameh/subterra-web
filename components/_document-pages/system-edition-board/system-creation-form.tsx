'use client'
import React, {MouseEvent} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/Answer'
import {SystemFormValues, SystemSchema} from '@/database/types/System'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {Button} from '@/components/ui/button'
import {createSystem} from '@/database/services/system.actions'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'
import {EMPTY_SYSTEM} from './empty-system'
import {
  PiNumberCircleFourFill,
  PiNumberCircleOneFill,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoFill,
} from 'react-icons/pi'
import SystemGeneralFormFragment from './1-general'
import SystemScienceFormFragment from './2-sciences'
import SystemTopographyFormFragment from './4-topography'
import SystemPicturesFormFragment from './3-pictures'

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
              <SystemTopographyFormFragment form={form} />
            </TabsContent>
            <TabsContent value="pictures">
              <SystemPicturesFormFragment form={form} />
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
