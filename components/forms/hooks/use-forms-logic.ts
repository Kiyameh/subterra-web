import {z, ZodSchema} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import React from 'react'
import {Answer} from '@/database/types/answer.type'

/**
 * @description Custom hook que maneja la lógica de los formularios según el subterra
 * @param formSchema Esquema de Zod
 * @param defaultValues Valores por defecto
 * @param action Acción de servidor que recive los valores del formulario
 * @returns Objeto con las siguientes propiedades:
 * @prop form: Objeto de useForm de react-hook-form
 * @prop onSubmit: Función que ejecuta la acción del servidor (pasar directamente al onSubmit del formulario)
 * @prop control: Objeto de control de useForm de react-hook-form
 * @prop dbAnswer: Respuesta del servidor
 * @prop isPending: Estado de transición
 */
export function useFormsLogic<T extends ZodSchema>(
  formSchema: T,
  defaultValues: z.infer<T>,
  action: (values: z.infer<T>) => Promise<Answer>
) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  type ValuesType = z.infer<typeof formSchema>

  const form = useForm<ValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function executeAction(values: ValuesType) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await action(values)
      setDbAnswer(answer)
    })
  }

  const control = form.control
  const onSubmit = form.handleSubmit(executeAction)

  return {form, onSubmit, control, dbAnswer, isPending}
}

/**
 * 
@example Formulario sin usar el hook: 

 export default function ContactForm({
  commander,
}: {
  commander: Session['user'] | undefined
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()

  function onSubmit(values: ContactFormValues) {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await addNewContactMessage(values)
      setDbAnswer(answer)
    })
  }

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      user: commander?._id || '',
      email: commander?.email || '',
      subject: 'Otro',
      message: '',
    } as ContactFormValues,
  })

  const max = maxCharacterLimit(contactFormSchema, 'message')
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {commander ? (
          <UserCard user={commander} />
        ) : (
          <TextField
            control={form.control}
            name="email"
            label="Correo electrónico"
            placeholder="arcaute@mail.com"
          />
        )}
        <SelectionField
          control={form.control}
          name="subject"
          label="Asunto"
          options={contactSubjects as unknown as string[]}
          placeholder="Selecciona un asunto"
        />
        <TextAreaField
          control={form.control}
          name="message"
          label="Mensaje"
          placeholder="Escribe tu mensaje aquí"
          maxCharacters={max}
        />
        <SubmitButton isPending={isPending} />
        <DbAwnserBox answer={dbAnswer} />
      </form>
    </Form>
  )
}

 */
