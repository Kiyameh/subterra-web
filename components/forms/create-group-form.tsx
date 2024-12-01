'use client'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from '@/components/ui/button'
import {Form} from '@/components/ui/form'
import DbAwnserBox from '@/components/displaying/db-answer-box'

import {Loader2} from 'lucide-react'
import {
  GroupFormSchema,
  GroupFormValues,
} from '@/database/validation/group.schema'
import {createOneGroup} from '@/database/services/group.services'
import React from 'react'
import {Answer} from '@/database/types/answer.type'
import LinkButton from '@/components/navigation/link-button'
import TextField from '@/components/fields/text-field'
import TextAreaField from '@/components/fields/text-area-field'
import {MdOutlineAlternateEmail} from 'react-icons/md'
import {TbWorld} from 'react-icons/tb'
import CountryField from '@/components/fields/country-field'
import MultipleSelectionField from '@/components/fields/multiple-selection-field'
import PhoneField from '@/components/fields/phone-field'
import ImageField from '@/components/fields/image-field'
import CollapsibleBox from '@/components/containing/collapsible-box'

interface CreateGroupFormProps {
  initialData: GroupFormValues
  editor: string
}

// TODO: Documentar componente

export default function CreateGroupForm({
  initialData,
  editor,
}: CreateGroupFormProps) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: initialData,
  })

  function onSubmit(values: GroupFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await createOneGroup(values, editor)
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
          form={form}
          name="fullname"
          label="Nombre completo"
          placeholder="Grupo espeleológico Arcaute"
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <TextField
              form={form}
              name="acronym"
              label="Acrónimo"
              placeholder="GEA"
            />
          </div>
          <div className="col-span-8">
            <TextField
              form={form}
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
          form={form}
          name="description"
          label="Texto de presentación"
          placeholder="El grupo lleva el apellido del famoso espeleólogo belga Félix Ruiz de Arcaute..."
        />
        <TextField
          form={form}
          name="street"
          label="Calle"
          placeholder="Calle de la exploración"
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <TextField
              form={form}
              name="portal_number"
              label="Numero"
              placeholder="13"
            />
          </div>

          <div className="col-span-4">
            <TextField
              form={form}
              name="floor"
              label="Piso"
              placeholder="4º"
            />
          </div>

          <div className="col-span-4">
            <TextField
              form={form}
              name="door"
              label="Puerta"
              placeholder="D"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <TextField
              form={form}
              name="postal_code"
              label="Código postal"
              placeholder="31178"
            />
          </div>

          <div className="col-span-8">
            <TextField
              form={form}
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
          form={form}
          name="webpage"
          label="Página web"
          placeholder="www.arcaute.com"
          startContent={'https://'}
          endContent={<TbWorld />}
        />
        <TextField
          form={form}
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
          <Button
            disabled={isPending}
            className="w-full"
            type="submit"
          >
            {isPending && <Loader2 className="animate-spin" />}
            Crear grupo
          </Button>
        )}
      </form>
    </Form>
  )
}
