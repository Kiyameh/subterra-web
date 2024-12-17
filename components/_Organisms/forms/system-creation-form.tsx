'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/answer.type'
import {systemMaxCharacters} from '@/database/validation/system.schemas'
import {SystemFormValues} from '@/database/validation/system.schemas'
import {SystemFormSchema} from '@/database/validation/system.schemas'
import {createSystem} from '@/database/services/system.services'
import {CaveIndex} from '@/database/models/Cave.model'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import MultiRefSelectField from '@/components/_Atoms/fields/multi-ref-select-field'
import TextField from '@/components/_Atoms/fields/text-field'
import MultiTextField from '@/components/_Atoms/fields/multi-text-field'
import BooleanField from '@/components/_Atoms/fields/boolean-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import {Button} from '@/components/ui/button'
import DistanceField from '@/components/_Atoms/fields/distance-field'

const EMPTY_SYSTEM: SystemFormValues = {
  instances: [],
  caves: [],
  datatype: 'system',

  catalog: '',
  initials: [],
  name: '',
  alt_names: [],

  description: '',
  regulations: false,
  regulation_description: '',
  exploration_description: '',
  length: 0,
  depth: 0,
  main_image: '',
  massif: '',

  geolog_age: '',
  geolog_litology: '',
  arqueolog: '',
  paleontolog: '',
  mineralog: '',
  contamination: '',
  biolog: '',
  hidrolog_system: '',
  hidrolog_subsystem: '',
}

/**
 * @version 1
 * @description Formulario para crear una cavidad
 * @param instanceName Nombre de la instancia
 * @param commanderId Editor que crea la cavidad
 * @param cavesIndex Índice de cavidades
 */

export default function SystemCreationForm({
  instanceName,
  commanderId,
  cavesIndex,
}: {
  instanceName: string
  commanderId: string
  cavesIndex: CaveIndex[] | undefined
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SystemFormValues>({
    resolver: zodResolver(SystemFormSchema),
    defaultValues: EMPTY_SYSTEM,
  })

  function onSubmit(values: SystemFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createSystem(values, instanceName, commanderId)
      setDbAnswer(answer)
    })
  }

  function handleReset() {
    console.log('reset')
    form.reset(EMPTY_SYSTEM)
    window.scrollTo(0, 0)
    setDbAnswer(null)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Accordion type="single">
          <AccordionItem
            value="item-1"
            className="border-0"
          >
            <span>Introduce los datos:</span>
            <AccordionTrigger className="bg-muted rounded-lg px-4 py-3 mt-2 hover:no-underline">
              <div className="flex items-center justify-start gap-2 text-base">
                <span className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-primary text-xl font-bold">
                  1
                </span>
                <h2>Información general</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 p-2 py-6">
              <MultiRefSelectField
                control={form.control}
                name="caves"
                label="Cavidades del sistema"
                noOptionsText="Todavía no hay ninguna cavidad creada"
                index={cavesIndex}
              />
              <TextField
                control={form.control}
                name="catalog"
                label="Número de Catálogo externo"
                description="Referencia de catálogo en algún sistema externo a subterra"
                placeholder="CAT-333"
                maxCharacters={systemMaxCharacters.catalog}
              />
              <MultiTextField
                control={form.control}
                name="initials"
                label="Siglas"
                description="Añade una o varias siglas pulsando enter entre ellas"
                placeholder="PO-01"
              />
              <TextField
                control={form.control}
                name="name"
                label="Nombre del sistema"
                placeholder="Sistema de poniente"
                maxCharacters={systemMaxCharacters.name}
              />
              <MultiTextField
                control={form.control}
                name="alt_names"
                label="Nombres alternativos"
                description="Añade uno o varios nombres alternativos pulsando enter entre ellos"
                placeholder="Sistema de los vientos"
              />
              <BooleanField
                control={form.control}
                name="regulations"
                label="Regulaciones"
              />
              <TextAreaField
                control={form.control}
                name="regulation_description"
                label="Descripción de las regulaciones"
                maxCharacters={systemMaxCharacters.regulation_description}
              />
              <TextAreaField
                control={form.control}
                name="exploration_description"
                label="Historia de las exploraciones"
                maxCharacters={systemMaxCharacters.exploration_description}
              />
              <DistanceField
                control={form.control}
                name="length"
                label="Longitud"
                placeholder="23558"
              />
              <DistanceField
                control={form.control}
                name="depth"
                label="Profundidad"
                placeholder="527"
              />

              <TextField
                control={form.control}
                name="massif"
                label="Macizo"
                placeholder="Macizo de poniente"
                maxCharacters={systemMaxCharacters.massif}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border-0"
          >
            <AccordionTrigger className="bg-muted rounded-lg px-4 py-3 mt-2 hover:no-underline">
              <div className="flex items-center justify-start gap-2 text-base">
                <span className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-primary text-xl font-bold">
                  2
                </span>
                <h2>Datos científicos</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 p-2 py-6">
              <TextField
                control={form.control}
                name="geolog_age"
                label="Edad geológica"
                maxCharacters={systemMaxCharacters.geolog_age}
              />
              <TextAreaField
                control={form.control}
                name="geolog_litology"
                label="Litología"
                placeholder="Datos de interes litológicos"
                maxCharacters={systemMaxCharacters.geolog_litology}
              />
              <TextAreaField
                control={form.control}
                name="arqueolog"
                label="Arqueología"
                placeholder="Datos de interes arqueológicos"
                maxCharacters={systemMaxCharacters.arqueolog}
              />
              <TextAreaField
                control={form.control}
                name="paleontolog"
                label="Paleontología"
                placeholder="Datos de interes paleontológicos"
                maxCharacters={systemMaxCharacters.paleontolog}
              />
              <TextAreaField
                control={form.control}
                name="mineralog"
                label="Mineralogía"
                placeholder="Datos de interes mineralógicos"
                maxCharacters={systemMaxCharacters.mineralog}
              />
              <TextAreaField
                control={form.control}
                name="contamination"
                label="Contaminación"
                placeholder="Presencia de residuos humanos"
                maxCharacters={systemMaxCharacters.contamination}
              />
              <TextAreaField
                control={form.control}
                name="biolog"
                label="Biología"
                placeholder="Datos de interes biológicos"
                maxCharacters={systemMaxCharacters.biolog}
              />
              <TextField
                control={form.control}
                name="hidrolog_system"
                label="Cuenca hidrológica"
                placeholder="Datos hidrológicos de la cuenca"
                maxCharacters={systemMaxCharacters.hidrolog_system}
              />
              <TextField
                control={form.control}
                name="hidrolog_subsystem"
                label="Subsistema hidrológico"
                placeholder="Datos hidrológicos locales"
                maxCharacters={systemMaxCharacters.hidrolog_subsystem}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="text-destructive-foreground text-sm">
          {!form.formState.isValid && form.formState.isDirty && (
            <p>Algunos datos introducidos no son correctos</p> // TODO: Mejorar feedback
          )}
        </div>
        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <div className="flex flex-row gap-2">
            <LinkButton
              label="Ver sistema"
              href={`/instance/${instanceName}/systems/${dbAnswer.redirect}`}
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
            label="Crear instancia"
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  )
}
