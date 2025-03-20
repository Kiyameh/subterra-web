'use client'
import React from 'react'
import {useParams, useSearchParams} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/Answer'
import {CaveFormValues} from '@/database/types/Cave'
import {CaveSchema} from '@/database/types/Cave'
import {PlainCave} from '@/database/services/Cave/getPlainCave'
import {updateCave} from '@/database/services/Cave/updateCave'
import {SystemIndex} from '@/database/services/System/getSystemIndex'

import {Button} from '@/components/Atoms/button'
import {Form} from '@/components/Atoms/form'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import ReactHookFormErrorBox from '@/components/Molecules/boxes/rhf-error-box'
import LinkButton from '@/components/Molecules/buttons/link-button'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/Atoms/tabs'

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
 * @description Formulario para editar una cavidad
 * @param commanderId Editor que crea la cavidad
 * @param cave Cavidad a editar
 * @param systemIndex Índice de sistemas kársticos
 */

export default function CaveEditionForm({
  commanderId,
  cave,
  systemIndex,
}: {
  commanderId: string
  cave: PlainCave
  systemIndex: SystemIndex[] | undefined
}) {
  // Sección por defecto del formulario que estará activa
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('section')

  const params: {instance: string; document: string} = useParams()
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<CaveFormValues>({
    resolver: zodResolver(CaveSchema),
    defaultValues: cave,
  })

  function onSubmit(values: CaveFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await updateCave(values, cave._id, commanderId)
      setDbAnswer(answer)
    })
  }

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    form.reset(cave)
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
            label="Ver cueva actualizada"
            href={`/instance/${params.instance}/caves/${params.document}`}
          />
        ) : (
          <div className="flex flex-row gap-2">
            <SubmitButton
              label="Guardar cambios"
              isPending={isPending}
            />
            <Button
              variant="secondary"
              onClick={handleReset}
            >
              Reiniciar
            </Button>
          </div>
        )}
        {!form.formState.isSubmitSuccessful && (
          <Tabs defaultValue={defaultTab || 'general'}>
            <TabsList className="mx-auto h-auto mb-2 flex flex-wrap bg-transparent">
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
        )}
      </form>
    </Form>
  )
}
