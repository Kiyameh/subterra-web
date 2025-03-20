'use client'
import React, {MouseEvent} from 'react'
import {useParams} from 'next/navigation'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/Answer'
import {GroupIndex} from '@/database/services/Group/getGroupsIndex'
import {CaveIndex} from '@/database/services/Cave/getCaveIndex'
import {ExplorationSchema} from '@/database/types/Exploration'
import {ExplorationFormValues} from '@/database/types/Exploration'
import {PlainExploration} from '@/database/services/Exploration/getPlainExploration'
import {updateExploration} from '@/database/services/Exploration/updateExploration'

import {Form} from '@/components/Atoms/form'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/Atoms/tabs'
import LinkButton from '@/components/Molecules/buttons/link-button'
import {Button} from '@/components/Atoms/button'
import ReactHookFormErrorBox from '@/components/Molecules/boxes/rhf-error-box'

import {PiNumberCircleOneFill, PiNumberCircleTwoFill} from 'react-icons/pi'

import ExplorationGeneralFormFragment from './1-general'
import ExplorationPicturesFormFragment from './2-pictures'

/**
 * @version 1
 * @description Formulario para editar una exploración
 * @param commanderId Editor que crea la exploración
 * @param exploration Exploración a editar
 */

export default function ExplorationEditionForm({
  commanderId,
  exploration,
  caveIndex,
  groupIndex,
}: {
  commanderId: string
  exploration: PlainExploration
  caveIndex: CaveIndex[] | undefined
  groupIndex: GroupIndex[] | undefined
}) {
  const params: {instance: string; document: string} = useParams()

  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<ExplorationFormValues>({
    resolver: zodResolver(ExplorationSchema),
    defaultValues: exploration,
  })

  function onSubmit(values: ExplorationFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await updateExploration(
        values,
        exploration._id,
        commanderId
      )
      setDbAnswer(answer)
    })
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    form.reset(exploration)
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
            label="Ver informe actualizado"
            href={`/instance/${params.instance}/caves/${params.document}`}
          />
        ) : (
          <div className="flex flex-row gap-2">
            <SubmitButton
              label="Actualizar informe"
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
      </form>
    </Form>
  )
}
