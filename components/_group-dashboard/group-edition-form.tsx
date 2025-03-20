'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {
  GroupFormValues,
  groupMaxCharacters,
} from '@/database/validation/group.schema'
import {GroupFormSchema} from '@/database/validation/group.schema'
import {Answer} from '@/database/types/Answer'
import {groupCategories} from '@/database/models/Group.enums'

import {Form} from '@/components/ui/form'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import TextField from '@/components/_Atoms/fields/text-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import MultiSelectField from '@/components/_Atoms/fields/multi-select-field'
import PhoneField from '@/components/_Atoms/fields/phone-field'
import CountryField from '@/components/_Atoms/fields/country-field'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'

import {TbWorld} from 'react-icons/tb'
import {MdOutlineAlternateEmail} from 'react-icons/md'
import {GroupWithUsers} from '@/database/services/Group/getOneGroup'
import {updateGroup} from '@/database/services/Group/updateGroup'

/**
 * @version 1
 * @description Formulario para editar los datos de un grupo
 * @param initialData datos iniciales del grupo
 * @param commanderId _id del usuario que edita el grupo
 */

export default function GroupEditionForm({
  initialData,
  commanderId,
}: {
  initialData: GroupWithUsers
  commanderId: string
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: initialData,
  })

  function onSubmit(values: GroupFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await updateGroup(values, initialData._id, commanderId)
      setDbAnswer(answer)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <div className="text-xl">Editar grupo</div>
        <TextField
          control={form.control}
          name="fullname"
          label="Nombre completo"
          placeholder="Grupo espeleológico Arcaute"
          maxCharacters={groupMaxCharacters.fullname}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <TextField
              control={form.control}
              name="acronym"
              label="Acrónimo"
              placeholder="GEA"
              maxCharacters={groupMaxCharacters.acronym}
            />
          </div>
          <div className="col-span-8">
            <TextField
              control={form.control}
              name="name"
              label="Nombre corto"
              placeholder="arcaute"
              description="Este nombre será utilizado en la URL - subterra.app/group/nombre-corto"
              maxCharacters={groupMaxCharacters.name}
            />
          </div>
        </div>
        <MultiSelectField
          control={form.control}
          options={groupCategories as unknown as string[]}
          name="group_categories"
          label="Categorías"
          description="Selecciona las categorías que mejor describan tu grupo"
          placeholder="Selecciona categorías"
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Texto de presentación"
          placeholder="El grupo lleva el apellido del famoso espeleólogo belga Félix Ruiz de Arcaute..."
          maxCharacters={groupMaxCharacters.description}
        />
        <TextField
          control={form.control}
          name="street"
          label="Calle"
          placeholder="Calle de la exploración"
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <TextField
              control={form.control}
              name="portal_number"
              label="Numero"
              placeholder="13"
            />
          </div>

          <div className="col-span-4">
            <TextField
              control={form.control}
              name="floor"
              label="Piso"
              placeholder="4º"
            />
          </div>

          <div className="col-span-4">
            <TextField
              control={form.control}
              name="door"
              label="Puerta"
              placeholder="D"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <TextField
              control={form.control}
              name="postal_code"
              label="Código postal"
              placeholder="31178"
            />
          </div>

          <div className="col-span-8">
            <TextField
              control={form.control}
              name="city"
              label="Ciudad"
              placeholder="Cuevas de la sierra"
            />
          </div>
        </div>
        <CountryField
          form={form}
          countryName="country"
          provinceName="province"
        />
        <PhoneField
          control={form.control}
          name="phone"
          label="Teléfono"
          placeholder="123 456 789"
        />
        <TextField
          control={form.control}
          name="webpage"
          label="Página web"
          placeholder="www.arcaute.com"
          startContent={'https://'}
          endContent={<TbWorld />}
        />
        <TextField
          control={form.control}
          name="email"
          label="Email"
          placeholder="arcaute@mail.com"
          type="email"
          endContent={<MdOutlineAlternateEmail />}
        />

        <DbAwnserBox answer={dbAnswer} />
        {dbAnswer?.redirect ? (
          <LinkButton
            href={dbAnswer.redirect}
            variant={'secondary'}
            label="Ir al panel de grupo"
          />
        ) : (
          <SubmitButton
            label="Actualizar datos"
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  )
}
