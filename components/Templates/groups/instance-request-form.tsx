'use client'
import React from 'react'
import {Session} from 'next-auth'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import Link from 'next/link'

import {InstanceRequestFormValues} from '@/database/validation/platform.schemas'
import {instanceRequestMaxCharacters} from '@/database/validation/platform.schemas'
import {instanceRequestFormSchema} from '@/database/validation/platform.schemas'
import {addInstanceRequest} from '@/database/services/Platform/addInstanceRequest'
import {type InstanceIndex} from '@/database/services/Instance/getInstancesIndex'
import {type GroupIndex} from '@/database/services/Group/getGroupsIndex'
import {type Answer} from '@/database/types/Answer'

import {Form} from '@/components/Atoms/form'
import {GroupProfileCard} from '@/components/Molecules/slots/group-slots'
import TextAreaField from '@/components/Molecules/fields/text-area-field'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import CollapsibleBox from '@/components/Molecules/boxes/collapsible-box'
import SubmitButton from '@/components/Molecules/buttons/submit-button'
import BackButton from '@/components/Molecules/buttons/back-button'
import {UserProfileCard} from '@/components/Molecules/slots/user-slots'
import RefSelectField from '@/components/Molecules/fields/ref-select-field'
import BooleanField from '@/components/Molecules/fields/boolean-field'

import {RiCheckboxMultipleBlankFill} from 'react-icons/ri'
import {FaInfoCircle} from 'react-icons/fa'

/**
 * @version 1
 * @description Formulario de solicitud de instancia
 * @param commander usuario que solicita la instancia
 * @param groupIndex Índice del grupo al que representa
 */

export default function InstanceRequestForm({
  commander,
  groupIndex,
  instanceIndex,
}: {
  commander: Session['user']
  groupIndex: GroupIndex
  instanceIndex: InstanceIndex[] | null
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(values: InstanceRequestFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await addInstanceRequest(values)
      setDbAnswer(answer)
    })
  }

  const form = useForm({
    resolver: zodResolver(instanceRequestFormSchema),
    defaultValues: {
      user: commander._id,
      group: groupIndex._id,
      fullname: '',
      description: '',
      territory: '',
      public_visibility: true,
      public_edition: false,
      message: '',
    } as InstanceRequestFormValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="flex gap-2 justify-evenly flex-wrap">
          <div className="w-full max-w-sm">
            <span className="text-muted-foreground text-sm">Solicitante:</span>
            <UserProfileCard user={commander} />
          </div>
          <div className="w-full max-w-sm">
            <span className="text-muted-foreground text-sm">En nombre de:</span>
            <GroupProfileCard groupIndex={groupIndex} />
          </div>
        </div>
        <TextAreaField
          control={form.control}
          name="fullname"
          label="Nombre completo"
          description="Nombre completo de la instancia"
          placeholder="Cuevas de la sierra de la cabra"
          maxCharacters={instanceRequestMaxCharacters.fullname}
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Descripción"
          description="Descripción detallada de la información que se quiere almacenar. Incluido el formato de los datos si se tienen"
          placeholder="Registro de exploraciones del club en la sierra..."
          maxCharacters={instanceRequestMaxCharacters.description}
        />
        <TextAreaField
          control={form.control}
          name="territory"
          label="Extensión territorial"
          description="Describe que territorio abarca la instancia. Puede ser una descripción textual o un enlace con los límites geográficos"
          placeholder="Límites del parque natural de la sierra de la cabra. Provincia de Nuevatierra"
          maxCharacters={instanceRequestMaxCharacters.territory}
        />
        <TextAreaField
          control={form.control}
          name="message"
          label="Otros comentarios"
          placeholder="..."
          maxCharacters={instanceRequestMaxCharacters.message}
        />
        <CollapsibleBox
          title="Gestión de permisos"
          color="warning"
          icon={<FaInfoCircle />}
        >
          <div className="p-1 space-y-6">
            <p>
              ● Por defecto, las instancias de subterra se crean con visibilidad
              pública. Esto significa que cualquier usuario podrá ver la
              instancia y sus documentos. <br />● Puedes solicitar una instancia
              privada, pero estan tienen un coste asociado para el mantenimiento
              de la plataforma. Puedes consultar los precios{' '}
              <Link
                href="/prices"
                className="text-primary hover:underline"
              >
                aquí
              </Link>
              . <br />
              ● Por defecto, la edición de las instancias es solo para miembros
              autorizados. Sin embargo, puedes solicitar que la edición sea
              pública. <br />
            </p>
            <BooleanField
              control={form.control}
              name="public_visibility"
              label="Visibilidad pública"
              description="Cualquier usuario podrá ver la instancia"
            />
            <BooleanField
              control={form.control}
              name="public_edition"
              label="Edición pública"
              description="Cualquier usuario podrá editar la instancia"
            />
          </div>
        </CollapsibleBox>

        <CollapsibleBox
          title="Instancia Subsidiaria"
          color="warning"
          icon={<RiCheckboxMultipleBlankFill />}
        >
          <p className="mb-6">
            Puede solicitar que tu instancia sea subsidiaria de otra instancia.
            Todos los documentos de la instancia maestra se podrán usar como
            modelo para la instancia subsidiaria.
          </p>
          <div className="p-1">
            <RefSelectField
              control={form.control}
              label="Instancia Maestra"
              name="master_instance"
              index={instanceIndex || []}
            />
          </div>
        </CollapsibleBox>

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? <BackButton /> : <SubmitButton isPending={isPending} />}
      </form>
    </Form>
  )
}
