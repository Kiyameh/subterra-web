'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {groupMaxCharacters} from '@/database/validation/group.schema'
import {type GroupFormValues} from '@/database/validation/group.schema'
import {GroupFormSchema} from '@/database/validation/group.schema'

import {type Answer} from '@/database/types/Answer'
import {groupCategories} from '@/database/models/Group.enums'
import {createGroup} from '@/database/services/Group/createGroup'

import {Form} from '@/components/Atoms/form'
import LinkButton from '@/components/Molecules/buttons/link-button'
import TextField from '@/components/Molecules/fields/text-field'
import TextAreaField from '@/components/Molecules/fields/text-area-field'
import CountryField from '@/components/Molecules/fields/country-field'
import MultiSelectField from '@/components/Molecules/fields/multi-select-field'
import PhoneField from '@/components/Molecules/fields/phone-field'
import CollapsibleBox from '@/components/Molecules/boxes/collapsible-box'
import DbAwnserBox from '@/components/Molecules/boxes/db-answer-box'
import SubmitButton from '@/components/Molecules/buttons/submit-button'

import {TbWorld} from 'react-icons/tb'
import {MdOutlineAlternateEmail} from 'react-icons/md'

/**
 * @version 1
 * @description Formulario para crear un grupo
 * @param commander usuario que crea el grupo
 */

const EMPTY_GROUP: GroupFormValues = {
  name: '',
  fullname: '',
  acronym: '',
  description: '',
  group_categories: [],
  logo_image: '',
  street: '',
  portal_number: '',
  floor: '',
  door: '',
  postal_code: 0,
  city: '',
  province: '',
  country: '',
  phone: '',
  email: '',
  webpage: '',
}

export default function GroupCreationForm({commander}: {commander: string}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: EMPTY_GROUP,
  })

  function onSubmit(values: GroupFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createGroup(values, commander)
      setDbAnswer(answer)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto space-y-6"
      >
        <div className="text-xl">Crear grupo</div>
        <CollapsibleBox
          title="Los grupos en Subterra..."
          color="info"
        >
          <p>● Cuando creas un grupo, te conviertes en su administrador.</p>
          <p>● Los usuarios pueden enviarte solicitudes de miembro.</p>
          <p>
            ● Podras solicitar una instancia para almacenar datos
            espeleológicos.
          </p>
        </CollapsibleBox>
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
            label="Crear grupo"
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  )
}
