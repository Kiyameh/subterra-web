'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

import {z} from 'zod'
import {Form} from '@/components/ui/form'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Answer} from '@/database/types/Answer.type'
import {addEditor} from '@/database/services/instance.actions'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import DbAwnserBox from '@/components/_Atoms/boxes/db-answer-box'
import SubmitButton from '@/components/_Atoms/buttons/submit-button'
import InfoBox from '@/components/_Atoms/boxes/info-box'
import TextField from '@/components/_Atoms/fields/text-field'

import {Loader2} from 'lucide-react'
import {IoPersonAdd} from 'react-icons/io5'

/**
 * @version 1
 * @description Diálogo para promoción de un usuario a editor de una instancia
 * @param instanceId  Id de la instancia al que se envía la solicitud
 * @param userId  Id del usuario a promocionar
 * @param isOpen  Estado de apertura del diálogo
 * @param onOpenChange  Función para cambiar el estado de apertura del diálogo
 */

const FormSchema = z.object({
  email: z.string().email({message: 'Email inválido'}),
})

type FormValues = z.infer<typeof FormSchema>

export default function PromoteEditorDialog({
  instanceId,
  isOpen,
  onOpenChange,
}: {
  instanceId: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await addEditor(instanceId, values.email)
      if (answer.ok) {
        setDbAnswer(null)
        onOpenChange(false)
        router.refresh()
      } else {
        setDbAnswer(answer)
      }
    })
  }

  const handleReject = () => {
    setDbAnswer(null)
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-card w-[460px] max-w-[90%] space-y-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <IoPersonAdd />
            Añadir nuevo editor
          </DialogTitle>
        </DialogHeader>

        <InfoBox
          title="¿Estás seguro?"
          color="info"
        >
          Vas a promocionar a este usuario a editor. Esta acción le dará todos
          los permisos asociados.
          <br />
          <br />
          Asegurate que usas el email que el usuario ha usado para registrarse
          en Subterra.
        </InfoBox>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <TextField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email del usuario"
            />
            <DbAwnserBox answer={dbAnswer} />
            <SubmitButton isPending={isPending} />
            <Button
              className="w-full"
              type="reset"
              disabled={isPending}
              variant="outline"
              onClick={handleReject}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Rechazar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
