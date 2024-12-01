'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

import {Form} from '@/components/ui/form'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import DbAwnserBox from '@/components/displaying/db-answer-box'
import {Answer} from '@/database/types/answer.type'
import {addMemberRequest} from '@/database/services/group.services'

import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import CollapsibleBox from '@/components/containing/collapsible-box'
import TextAreaField from '@/components/fields/text-area-field'

import {Loader2} from 'lucide-react'
import {TiUserAdd} from 'react-icons/ti'

/**
 * @version 1
 * @description Diálogo y formulario para enviar una solicitud de membresía al grupo
 * @param userId Id del usuario que envía la solicitud
 * @param groupId Id del grupo al que se envía la solicitud
 * @param isOpen Estado de apertura del diálogo
 * @param onOpenChange Función para cambiar el estado de apertura del diálogo
 */

export default function MembershipRequestDialog({
  userId,
  groupId,
  isOpen,
  setDialogOpen,
}: {
  userId: string
  groupId: string
  isOpen: boolean
  setDialogOpen: (open: boolean) => void
}) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const Schema = z.object({
    message: z
      .string()
      .min(1, 'Debes escribir un mensaje')
      .max(400, 'El mensaje es demasiado largo'),
  })

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {message: ''},
  })

  const onSubmit = (values: {message: string}) => {
    const userRequest = {user: userId, message: values.message}
    setDbAnswer(null)
    startTransition(async () => {
      const answer = await addMemberRequest(groupId, userRequest)
      setDbAnswer(answer)

      if (answer.ok) {
        router.refresh()
        setDialogOpen(false)
      }
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setDialogOpen}
    >
      <DialogContent className="bg-card w-[460px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <TiUserAdd />
            Enviar solicitud
          </DialogTitle>
          <DialogDescription>
            Envia tu solicitud de acceso al grupo
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-7">
              <CollapsibleBox title="Solicitud de acceso">
                <p>
                  ● Tu solicitud será recibida por el administrador y decidirá
                  al respecto
                </p>
                <p>
                  ● Envía un mensaje claro y conciso para que el administrador
                  sepa algo más de ti
                </p>
                <p>
                  ● Ten paciencia, tarde o temprano responderán a tu solicitud{' '}
                </p>
              </CollapsibleBox>
              <TextAreaField
                form={form}
                name="message"
                label="Mensaje"
                placeholder="Escribe un mensaje para el administrador"
              />
              <DbAwnserBox answer={dbAnswer} />

              <Button
                disabled={isPending}
                className="w-full"
                type="submit"
              >
                {isPending && <Loader2 className="animate-spin" />}
                Enviar solicitud
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
