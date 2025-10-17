'use client'
import React, { MouseEvent } from 'react'
import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { type Answer } from '@/database/types/Answer'
import { type PlainSystem } from '@/database/services/System/getPlainSystem'
import { type SystemFormValues } from '@/database/types/System'
import { SystemSchema } from '@/database/types/System'
import { updateSystem } from '@/database/services/System/updateSystem'

import { Form } from '@/components/Atoms/form'
import { Button } from '@/components/Atoms/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Atoms/tabs'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import LinkButton from '@/components/Molecules/buttons/link-button'
import ReactHookFormErrorBox from '@/components/Molecules/boxes/rhf-error-box'
import { PictureUploader } from '@/components/Organisms/file-uploader/picture-uploader'
import { TopographyUploader } from '@/components/Organisms/file-uploader/topography-uploader'

import {
  PiNumberCircleFourFill,
  PiNumberCircleOneFill,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoFill,
} from 'react-icons/pi'

import SystemGeneralFormFragment from './system-form-fragment-general'
import SystemScienceFormFragment from './system-form-fragment-sciences'

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
  const params: { instance: string; document: string } = useParams()

  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const [picturesDirty, setPicturesDirty] = React.useState<boolean>(false)
  const [topographiesDirty, setTopographiesDirty] = React.useState<boolean>(false)


  const form = useForm<SystemFormValues>({
    resolver: zodResolver(SystemSchema),
    defaultValues: system,
  })

  function onSubmit(values: SystemFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const updatesKeys = Object.keys(form.formState.dirtyFields) as Array<keyof SystemFormValues>

      if (picturesDirty) updatesKeys.push('pictures')
      if (topographiesDirty) updatesKeys.push('topographies')
      if (updatesKeys.length === 0) setDbAnswer({ ok: false, message: 'Error desconocido' })


      const answer = await updateSystem(
        values, // Datos del formulario
        updatesKeys, // Array con los campos que se han actualizado
        system._id, // Id del sistema a actualizar
        commanderId // Id del usuario que actualiza el sistema
      )
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
            href={`/instance/${params.instance}/systems/${params.document}`}
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
              <TopographyUploader

                control={form.control}
                name="topographies"
                maxFiles={10}
                onUpload={() => setTopographiesDirty(true)}

              />
            </TabsContent>
            <TabsContent value="pictures">
              <PictureUploader
                control={form.control}
                name="pictures"
                maxImages={10}
                onUpload={() => setPicturesDirty(true)}
              />
            </TabsContent>
          </Tabs>
        )}
      </form>
    </Form>
  )
}
