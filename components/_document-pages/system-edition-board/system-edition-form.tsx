'use client'
import React, {MouseEvent} from 'react'
import {useParams} from 'next/navigation'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/Answer.type'
import {SystemFormValues, SystemSchema} from '@/database/types/System.type'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {Button} from '@/components/ui/button'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {PlainSystem, updateSystem} from '@/database/services/system.actions'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'
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
 * @version 1
 * @description Formulario para editar un sistema
 * @param commanderId Editor que crea el sistema
 * @param system Sistema a editar
 */

export default function SystemEditionForm({
  commanderId,
  system,
}: {
  commanderId: string
  system: PlainSystem
}) {
  const params: {instance: string; document: string} = useParams()

  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SystemFormValues>({
    resolver: zodResolver(SystemSchema),
    defaultValues: system,
  })

  function onSubmit(values: SystemFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await updateSystem(values, system._id, commanderId)
      setDbAnswer(answer)
    })
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    form.reset(system)
    window.scrollTo(0, 0)
    setDbAnswer(null)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <ReactHookFormErrorBox errors={form.formState.errors} />

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <LinkButton
            label="Ver sistema actualizado"
            href={`/instance/${params.instance}/caves/${params.document}`}
          />
        ) : (
          <div className="flex flex-row gap-2">
            <SubmitButton
              label="Actualizar sistema"
              isPending={isPending}
            />
            <Button
              variant="secondary"
              onClick={handleReset}
            >
              Reiniciar cambios
            </Button>
          </div>
        )}
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
      </form>
    </Form>
  )
}
