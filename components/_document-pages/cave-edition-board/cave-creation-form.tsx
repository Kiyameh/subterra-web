'use client'
import React, {MouseEvent} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/answer.type'
import {CaveFormValues} from '@/database/validation/cave.schemas'
import {CaveFormSchema} from '@/database/validation/cave.schemas'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {Button} from '@/components/ui/button'
import {createCave} from '@/database/services/cave.actions'
import {SystemIndex} from '@/database/services/system.actions'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'
import {EMPTY_CAVE} from './empty-cave'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import CaveGeneralFormFragment from './1-general'
import CaveLocationFormFragment from './2-location'
import CaveScienceFormFragment from './3-sciences'
import CavePicturesFormFragment from './4-pictures'
import CaveTopographyFormFragment from './5-topography'
import {
  PiNumberCircleFiveFill,
  PiNumberCircleFourFill,
  PiNumberCircleOneFill,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoFill,
} from 'react-icons/pi'

/**
 * @version 2
 * @description Formulario para crear una cavidad
 * @param instanceId Id de la instancia
 * @param commanderId Editor que crea la cavidad
 * @param systemIndex Índice de los sistemas
 */

export default function CaveCreationForm({
  instanceId,
  commanderId,
  systemIndex,
}: {
  instanceId: string
  commanderId: string
  systemIndex: SystemIndex[] | undefined
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<CaveFormValues>({
    resolver: zodResolver(CaveFormSchema),
    defaultValues: {
      ...EMPTY_CAVE,
      instances: [instanceId],
    },
  })

  function onSubmit(values: CaveFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createCave(values, commanderId)
      setDbAnswer(answer)
    })
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    form.reset({
      ...EMPTY_CAVE,
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
        <Tabs defaultValue="general">
          <TabsList className="mx-auto h-auto mb-2 flex bg-transparent">
            <TabsTrigger
              value="general"
              className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
            >
              <PiNumberCircleOneFill className="group data-[state=active]:text-primary text-2xl rounded-full" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
            >
              <PiNumberCircleTwoFill className="text-2xl rounded-full" />
              Localización
            </TabsTrigger>
            <TabsTrigger
              value="science"
              className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
            >
              <PiNumberCircleThreeFill className="text-2xl rounded-full" />
              Ciencias
            </TabsTrigger>
            <TabsTrigger
              value="topography"
              className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
            >
              <PiNumberCircleFourFill className="text-2xl rounded-full" />
              Topografía
            </TabsTrigger>
            <TabsTrigger
              value="pictures"
              className="group data-[state=active]:bg-muted flex-1 flex-col p-3"
            >
              <PiNumberCircleFiveFill className="text-2xl rounded-full" />
              Imagenes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <CaveGeneralFormFragment
              form={form}
              systemIndex={systemIndex}
            />
          </TabsContent>
          <TabsContent value="location">
            <CaveLocationFormFragment form={form} />
          </TabsContent>
          <TabsContent value="science">
            <CaveScienceFormFragment form={form} />
          </TabsContent>
          <TabsContent value="topography">
            <CaveTopographyFormFragment form={form} />
          </TabsContent>
          <TabsContent value="pictures">
            <CavePicturesFormFragment form={form} />
          </TabsContent>
        </Tabs>
        <ReactHookFormErrorBox errors={form.formState.errors} />

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <div className="flex flex-row gap-2">
            <LinkButton
              label="Ver cavidad"
              href={`${dbAnswer._id}`}
            />
            <Button
              variant="secondary"
              onClick={handleReset}
            >
              Crear otra cavidad
            </Button>
          </div>
        ) : (
          <SubmitButton
            label="Crear cavidad"
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  )
}
