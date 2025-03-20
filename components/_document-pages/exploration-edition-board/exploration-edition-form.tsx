'use client'
import React, {MouseEvent} from 'react'
import {useParams} from 'next/navigation'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/Answer.type'
import {
  ExplorationFormValues,
  ExplorationSchema,
} from '@/database/types/Exploration.type'
import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

import LinkButton from '@/components/_Atoms/buttons/link-button'
import {Button} from '@/components/ui/button'
import {PlainExploration} from '@/database/services/exploration.actions'
import {updateExploration} from '@/database/services/exploration.actions'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'
import {PiNumberCircleOneFill, PiNumberCircleTwoFill} from 'react-icons/pi'
import ExplorationGeneralFormFragment from './1-general'
import ExplorationPicturesFormFragment from './2-pictures'
import {CaveIndex} from '@/database/services/cave.actions'
import {GroupIndex} from '@/database/services/Group/getGroupsIndex'

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
