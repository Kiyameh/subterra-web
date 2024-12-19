'use client'
import React, {MouseEvent} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/answer.type'
import {caveMaxCharacters} from '@/database/validation/cave.schemas'
import {CaveFormValues} from '@/database/validation/cave.schemas'
import {CaveFormSchema} from '@/database/validation/cave.schemas'

import {Form} from '@/components/ui/form'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import TextField from '@/components/_Atoms/fields/text-field'
import {caveShapes, utmZones} from '@/database/models/Cave.enums'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import BooleanField from '@/components/_Atoms/fields/boolean-field'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import MultiSelectField from '@/components/_Atoms/fields/multi-select-field'
import MultiTextField from '@/components/_Atoms/fields/multi-text-field'
import Divider from '@/components/_Atoms/boxes/divider'
import SelectField from '@/components/_Atoms/fields/select-field'
import InfoBox from '@/components/_Atoms/boxes/info-box'

import {BsExclamationTriangle} from 'react-icons/bs'
import {Button} from '@/components/ui/button'
import DistanceField from '@/components/_Atoms/fields/distance-field'
import {PlainCave, updateCave} from '@/database/services/cave.actions'
import ReactHookFormErrorBox from '@/components/_Atoms/boxes/rhf-error-box'
import LinkButton from '@/components/_Atoms/buttons/link-button'

/**
 * @version 1
 * @description Formulario para editar una cavidad
 * @param commanderId Editor que crea la cavidad
 * @param cave Cavidad a editar
 */

export default function CaveEditionForm({
  commanderId,
  cave,
}: {
  commanderId: string
  cave: PlainCave
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<CaveFormValues>({
    resolver: zodResolver(CaveFormSchema),
    defaultValues: cave,
  })

  function onSubmit(values: CaveFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await updateCave(values, cave._id, commanderId)
      setDbAnswer(answer)
    })
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
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
              <TextField
                control={form.control}
                name="catalog"
                label="Número de Catálogo externo"
                description="Referencia de catálogo en algún sistema externo a subterra"
                placeholder="CAT-123"
                maxCharacters={caveMaxCharacters.catalog}
              />
              <MultiTextField
                control={form.control}
                name="initials"
                label="Siglas de exploración"
                description="Añade una o varias siglas pulsando enter entre ellas"
                placeholder="AR-01"
              />
              <TextField
                control={form.control}
                name="name"
                label="Nombre"
                placeholder="Cueva del pirata"
                maxCharacters={caveMaxCharacters.name}
              />
              <MultiTextField
                control={form.control}
                name="alt_names"
                label="Nombres alternativos"
                description="Añade uno o varios nombres alternativos pulsando enter entre ellos"
                placeholder="Torca de isla tortuga"
              />
              <MultiSelectField
                control={form.control}
                name="cave_shapes"
                label="Tipo de entrada"
                options={caveShapes as unknown as string[]}
              />
              <TextAreaField
                control={form.control}
                name="description"
                label="Descripción"
                maxCharacters={caveMaxCharacters.description}
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
                maxCharacters={caveMaxCharacters.regulation_description}
              />
              <DistanceField
                control={form.control}
                name="length"
                label="Longitud"
                placeholder="1242"
              />
              <DistanceField
                control={form.control}
                name="depth"
                label="Profundidad"
                placeholder="102"
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
                <h2>Datos de localización</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 p-2 py-6">
              <Divider text="Coordenadas" />
              <InfoBox
                color="warning"
                title="Datum"
                icon={<BsExclamationTriangle />}
                className="mb-4"
              >
                Asegurate de intruducir las coordenadas en Datum ETRS89
              </InfoBox>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <DistanceField
                  control={form.control}
                  name="coordinates.x_coord"
                  label="Coordenada X"
                />
                <DistanceField
                  control={form.control}
                  name="coordinates.y_coord"
                  label="Coordenada Y"
                />
                <DistanceField
                  control={form.control}
                  name="coordinates.z_coord"
                  label="Coordenada Z"
                />
                <SelectField
                  control={form.control}
                  name="coordinates.hemisphere"
                  label="Hemisferio"
                  options={['N', 'S']}
                />
                <SelectField
                  control={form.control}
                  name="coordinates.utm_zone"
                  label="Zona UTM"
                  options={utmZones as unknown as string[]}
                />
              </div>
              <Divider />
              <TextField
                control={form.control}
                name="municipality"
                label="Municipio"
                placeholder="Isla tortuga"
                maxCharacters={caveMaxCharacters.municipality}
              />
              <TextField
                control={form.control}
                name="locality"
                label="Localidad"
                placeholder="Tortuga"
                maxCharacters={caveMaxCharacters.locality}
              />
              <MultiTextField
                control={form.control}
                name="toponymy"
                label="Toponimia"
                description="Añade uno o varios topónimos pulsando enter entre ellos"
                placeholder="Mar del sur"
              />
              <TextField
                control={form.control}
                name="massif"
                label="Macizo"
                placeholder="Montes de poniente"
                maxCharacters={caveMaxCharacters.massif}
              />
              <TextAreaField
                control={form.control}
                name="location_description"
                label="Descripción de la localización"
                maxCharacters={caveMaxCharacters.location_description}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border-0"
          >
            <AccordionTrigger className="bg-muted rounded-lg px-4 py-3 mt-2 hover:no-underline">
              <div className="flex items-center justify-start gap-2 text-base">
                <span className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-primary text-xl font-bold">
                  3
                </span>
                <h2>Datos científicos</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 p-2 py-6">
              <TextField
                control={form.control}
                name="geolog_age"
                label="Edad geológica"
                maxCharacters={caveMaxCharacters.geolog_age}
              />
              <TextAreaField
                control={form.control}
                name="geolog_litology"
                label="Litología"
                placeholder="Datos de interes litológicos"
                maxCharacters={caveMaxCharacters.geolog_litology}
              />
              <TextAreaField
                control={form.control}
                name="arqueolog"
                label="Arqueología"
                placeholder="Datos de interes arqueológicos"
                maxCharacters={caveMaxCharacters.arqueolog}
              />
              <TextAreaField
                control={form.control}
                name="paleontolog"
                label="Paleontología"
                placeholder="Datos de interes paleontológicos"
                maxCharacters={caveMaxCharacters.paleontolog}
              />
              <TextAreaField
                control={form.control}
                name="mineralog"
                label="Mineralogía"
                placeholder="Datos de interes mineralógicos"
                maxCharacters={caveMaxCharacters.mineralog}
              />
              <TextAreaField
                control={form.control}
                name="contamination"
                label="Contaminación"
                placeholder="Presencia de residuos humanos"
                maxCharacters={caveMaxCharacters.contamination}
              />
              <TextAreaField
                control={form.control}
                name="biolog"
                label="Biología"
                placeholder="Datos de interes biológicos"
                maxCharacters={caveMaxCharacters.biolog}
              />
              <TextField
                control={form.control}
                name="hidrolog_system"
                label="Cuenca hidrológica"
                placeholder="Datos hidrológicos de la cuenca"
                maxCharacters={caveMaxCharacters.hidrolog_system}
              />
              <TextField
                control={form.control}
                name="hidrolog_subsystem"
                label="Subsistema hidrológico"
                placeholder="Datos hidrológicos locales"
                maxCharacters={caveMaxCharacters.hidrolog_subsystem}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ReactHookFormErrorBox errors={form.formState.errors} />
        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? (
          <LinkButton
            label="Ver informe actualizado"
            href={`intance/${cave.instances[0]}/caves/${cave._id}`}
          />
        ) : (
          <div className="flex flex-row gap-2">
            <SubmitButton
              label="Actualizar cavidad"
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
      </form>
    </Form>
  )
}
