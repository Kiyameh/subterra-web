'use client'
import React from 'react'
import {Session} from 'next-auth'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {InstanceRequestFormValues} from '@/database/validation/platform.schemas'
import {instanceRequestMaxCharacters} from '@/database/validation/platform.schemas'
import {instanceRequestFormSchema} from '@/database/validation/platform.schemas'
import {addInstanceRequest} from '@/database/services/platform.services'
import {GroupIndex} from '@/database/models/Group.model'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import {GroupProfileCard} from '@/components/_Atoms/slots/group-slots'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import CollapsibleBox from '@/components/_Atoms/boxes/collapsible-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import BackButton from '@/components/_Atoms/buttons/back-button'
import {UserProfileCard} from '@/components/_Atoms/slots/user-slots'

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
}: {
  commander: Session['user']
  groupIndex: GroupIndex
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
      roles: '',
      message: '',
    } as InstanceRequestFormValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="flex gap-2 justify-stretch">
          <div className="w-full">
            <span className="text-muted-foreground text-sm">Solicitante:</span>
            <UserProfileCard user={commander} />
          </div>
          <div className="w-full">
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
          description="Descripción detallada de la información que se quiere almacenar. Incluido formato de los datos si se tienen"
          placeholder="Registro de exploraciones del club de la cabra en la sierra..."
          maxCharacters={instanceRequestMaxCharacters.description}
        />
        <TextAreaField
          control={form.control}
          name="territory"
          label="Extensión territorial"
          description="Información sobre el territorio que abarca la instancia"
          placeholder="Límites del parque natural de la sierra de la cabra. Provincia de Nuevatierra"
          maxCharacters={instanceRequestMaxCharacters.territory}
        />
        <CollapsibleBox
          title="Gestión de permisos"
          color="warning"
          icon={<FaInfoCircle />}
        >
          <p>
            Actualmente la visualización de las instancias es siempre pública.
            Los permisos de edición pueden ser públicos o solo para miembros. Se
            está trabajando en nuevos sistemas de permisos. Haznos saber como te
            gustaría que fuerán estos permisos en tu instancia
          </p>
        </CollapsibleBox>
        <TextAreaField
          control={form.control}
          name="roles"
          label="Gestión de permisos"
          placeholder="Edición solo por miembros autorizados"
          maxCharacters={instanceRequestMaxCharacters.roles}
        />
        <TextAreaField
          control={form.control}
          name="message"
          label="Otros comentarios"
          placeholder="..."
          maxCharacters={instanceRequestMaxCharacters.message}
        />
        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? <BackButton /> : <SubmitButton isPending={isPending} />}
      </form>
    </Form>
  )
}
