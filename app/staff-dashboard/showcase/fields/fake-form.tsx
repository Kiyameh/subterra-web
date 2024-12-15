'use client'
import React from 'react'
import {Answer} from '@/database/types/answer.type'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import {Form} from '@/components/ui/form'
import TextField from '@/components/_Atoms/fields/text-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import MultiTextField from '@/components/_Atoms/fields/multi-text-field'
import SelectionField from '@/components/_Atoms/fields/selection-field'
import MultipleSelectionField from '@/components/_Atoms/fields/multiple-selection-field'
import RefSelectionField from '@/components/_Atoms/fields/ref-selection-field'
import MultiRefSelectionField from '@/components/_Atoms/fields/multi-ref-selection-field'
import DateField from '@/components/_Atoms/fields/date-field'
import PhoneField from '@/components/_Atoms/fields/phone-field'
import MultiDateField from '@/components/_Atoms/fields/multi-date-field'
import CountryField from '@/components/_Atoms/fields/country-field'

const FakeFormSchema = z.object({
  text: z.string().max(120).optional(),
  bigText: z.string().max(1000).optional(),
  number: z.coerce.number().optional(),
  multiText: z.array(z.string().max(120)).optional(),
  date: z.coerce.date().optional(),
  multiDate: z.array(z.date()).optional(),
  select: z.enum(['Uno', 'Dos', 'Tres']).optional(),
  multiSelect: z.array(z.enum(['Uno', 'Dos', 'Tres'])).optional(),
  ref: z.string().optional(),
  multiRef: z.array(z.string()).optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  province: z.string().optional(),
})

type FakeFormValues = z.infer<typeof FakeFormSchema>

const EMPTY_VALUES: FakeFormValues = {
  text: '',
  bigText: '',
  number: 0,
  multiText: [],
  date: new Date(),
  multiDate: [],
  select: 'Uno',
  multiSelect: [],
  ref: '',
  multiRef: [],
  phone: '',
  country: '',
  province: '',
}

const EXAMPLE_VALUES: FakeFormValues = {
  text: 'Texto de ejemplo',
  bigText: 'Texto largo de ejemplo',
  number: 42,
  multiText: ['Uno', 'Dos', 'Tres'],
  date: new Date('2021-10-10'),
  multiDate: [new Date('2021-10-10'), new Date('2021-10-11')],
  select: 'Dos',
  multiSelect: ['Uno', 'Tres'],
  ref: '21',
  multiRef: ['21', '22'],
  phone: '+34666666666',
  country: 'Spain',
  province: 'Barcelona',
}

export default function FakeForm({empty}: {empty?: boolean}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<FakeFormValues>({
    resolver: zodResolver(FakeFormSchema),
    defaultValues: empty ? EMPTY_VALUES : EXAMPLE_VALUES,
  })

  function FakeValitationFunction(values: FakeFormValues) {
    try {
      const validated = FakeFormSchema.safeParse(values)
      return {
        ok: true,
        message: 'Todo ha ido bien',
        content: validated.data,
      } as Answer
    } catch (error) {
      console.log(error)
      return {ok: false, message: 'Ha habido un error'} as Answer
    }
  }

  function onSubmit(values: FakeFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await FakeValitationFunction(values)
      console.log(answer.content)
      setDbAnswer(answer)
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <TextField
          control={form.control}
          name="text"
          label="Texto"
          description="Texto corto"
          placeholder="Escribe algo"
        />
        <TextAreaField
          control={form.control}
          name="bigText"
          label="Texto largo"
          description="Texto largo"
          placeholder="Escribe algo largo y detallado"
        />
        <TextField
          control={form.control}
          name="number"
          label="Número"
          description="Número"
          type="number"
          placeholder="Escribe un número"
        />
        <MultiTextField
          control={form.control}
          name="multiText"
          label="Texto múltiple"
          description="Texto múltiple"
          placeholder="Escribe varias cosas"
        />
        <DateField
          control={form.control}
          name="date"
          label="Fecha"
          description="Fecha"
        />
        <MultiDateField
          control={form.control}
          name="multiDate"
          label="Fechas múltiples"
          description="Fechas múltiples"
        />
        <SelectionField
          control={form.control}
          name="select"
          label="Selección"
          description="Selección"
          placeholder="Selecciona una opción"
          options={['Uno', 'Dos', 'Tres']}
        />
        <MultipleSelectionField
          control={form.control}
          name="multiSelect"
          label="Selección múltiple"
          description="Selección múltiple"
          placeholder="Selecciona varias opciones"
          options={['Uno', 'Dos', 'Tres']}
        />
        <RefSelectionField
          control={form.control}
          name="ref"
          label="Referencia"
          description="Referencia"
          placeholder="Selecciona una referencia"
          index={[
            {_id: '21', name: 'Referencia 21'},
            {_id: '22', name: 'Referencia 22'},
          ]}
        />
        <MultiRefSelectionField
          control={form.control}
          name="multiRef"
          label="Referencia múltiple"
          description="Referencia múltiple"
          placeholder="Selecciona varias referencias"
          index={[
            {_id: '21', name: 'Ejemplo1'},
            {_id: '22', name: 'Ejemplo2'},
          ]}
        />
        <PhoneField
          control={form.control}
          name="phone"
          label="Teléfono"
          description="Teléfono"
          placeholder="Escribe un teléfono"
        />
        <CountryField
          form={form}
          countryName="country"
          provinceName="province"
          label="País y provincia"
          description="País y provincia"
        />

        <div className="text-destructive-foreground text-sm">
          {!form.formState.isValid && form.formState.isDirty && (
            <p>Algunos datos introducidos no son correctos</p>
          )}
        </div>
        <DbAwnserBox answer={dbAnswer} />
        <SubmitButton
          label="Enviar datos"
          isPending={isPending}
        />
      </form>
    </Form>
  )
}
