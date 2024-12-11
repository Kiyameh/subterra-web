'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import DbAwnserBox from '@/components/forms/ui/db-answer-box'
import {PopulatedGroup} from '@/database/models/Group.model'
import {GroupFormValues} from '@/database/validation/group.schema'
import {GroupFormSchema} from '@/database/validation/group.schema'
import {updateGroup} from '@/database/services/group.services'
import {Answer} from '@/database/types/answer.type'

import {Form} from '@/components/ui/form'
import LinkButton from '@/components/navigation/link-button'
import TextField from '@/components/fields/text-field'
import TextAreaField from '@/components/fields/text-area-field'
import MultipleSelectionField from '@/components/fields/multiple-selection-field'
import PhoneField from '@/components/fields/phone-field'
import ImageField from '@/components/fields/image-field'
import CountryField from '@/components/fields/country-field'
import SubmitButton from '@/components/forms/ui/submit-button'

import {TbWorld} from 'react-icons/tb'
import {MdOutlineAlternateEmail} from 'react-icons/md'

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
  initialData: PopulatedGroup
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
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <TextField
              control={form.control}
              name="acronym"
              label="Acrónimo"
              placeholder="GEA"
            />
          </div>
          <div className="col-span-8">
            <TextField
              control={form.control}
              name="name"
              label="Nombre corto"
              placeholder="arcaute"
              description="Este nombre será utilizado en la URL - subterra.app/group/nombre-corto"
            />
          </div>
        </div>
        <MultipleSelectionField
          form={form}
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
          label="País y provincia"
          description="Selecciona el país y la provincia donde se encuentra el grupo"
        />
        <PhoneField
          form={form}
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
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <ImageField
              form={form}
              name="main_image"
              label="Imagen principal"
              description="Esta imagen se mostrará en la cabecera del grupo"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <ImageField
              form={form}
              name="logo_image"
              label="Logo"
              description="Logotipo del grupo"
            />
          </div>
        </div>
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
