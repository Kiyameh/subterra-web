'use client'
import React from 'react'
import {Session} from 'next-auth'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {
  instanceRequestFormSchema,
  InstanceRequestFormValues,
} from '@/database/validation/platform.schemas'
import {addNewInstanceRequest} from '@/database/services/platform.services'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import TextAreaField from '@/components/fields/text-area-field'
import UserCard from '@/components/account/user-card'
import DbAwnserBox from '@/components/forms/ui/db-answer-box'
import SubmitButton from '@/components/forms/ui/submit-button'
import {PopulatedGroup} from '@/database/models/Group.model'
import GroupCard from '../account/group-card'
import {maxCharacterLimits} from './hooks/use-max-character-limits'
import CollapsibleBox from '../containing/collapsible-box'
import {FaInfoCircle} from 'react-icons/fa'
import BackButton from '../navigation/back-button'

/**
 * @version 1
 * @description Formulario de solicitud de instancia
 * @param commander usuario que envía el mensaje
 * @param group grupo
 */

export default function InstanceRequestForm({
  commander,
  group,
}: {
  commander: Session['user']
  group: PopulatedGroup
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(values: InstanceRequestFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await addNewInstanceRequest(values)
      setDbAnswer(answer)
    })
  }

  const form = useForm({
    resolver: zodResolver(instanceRequestFormSchema),
    defaultValues: {
      user: commander._id,
      group: group._id,
      fullname: '',
      description: '',
      territory: '',
      roles: '',
      message: '',
    } as InstanceRequestFormValues,
  })

  const maxCharacters = maxCharacterLimits(instanceRequestFormSchema)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="flex gap-2 justify-stretch">
          <div className="w-full">
            <span className="text-muted-foreground text-sm">Solicitante:</span>
            <UserCard user={commander} />
          </div>
          <div className="w-full">
            <span className="text-muted-foreground text-sm">En nombre de:</span>
            <GroupCard group={group} />
          </div>
        </div>
        <TextAreaField
          control={form.control}
          name="fullname"
          label="Nombre completo"
          description="Nombre completo de la instancia"
          placeholder="Cuevas de la sierra de la cabra"
          maxCharacters={maxCharacters.fullname}
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Descripción"
          description="Descripción detallada de la información que se quiere almacenar. Incluido formato de los datos si se tienen"
          placeholder="Registro de exploraciones del club de la cabra en la sierra..."
          maxCharacters={maxCharacters.description}
        />
        <TextAreaField
          control={form.control}
          name="territory"
          label="Extensión territorial"
          description="Información sobre el territorio que abarca la instancia"
          placeholder="Límites del parque natural de la sierra de la cabra. Provincia de Nuevatierra"
          maxCharacters={maxCharacters.territory}
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
          maxCharacters={maxCharacters.roles}
        />
        <TextAreaField
          control={form.control}
          name="message"
          label="Otros comentarios"
          placeholder="..."
          maxCharacters={maxCharacters.message}
        />
        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.ok ? <BackButton /> : <SubmitButton isPending={isPending} />}
      </form>
    </Form>
  )
}
