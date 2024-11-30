"use client";
import React from "react";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@/components/fields/text-field";
import DbAwnserBox from "@/components/displaying/db-answer-box";
import { Answer } from "@/database/types/answer.type";
import { addMemberRequest } from "@/database/services/group.services";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MembershipRequestDialogProps {
  children: React.ReactNode;
  userId: string;
  groupId: string;
}
/**
 * Diálogo para enviar una solicitud de membresía al grupo
 * @param children
 * @param userId <string> Id del usuario que envía la solicitud
 * @param groupId <string> Id del grupo al que se envía la solicitud
 */
export default function MembershipRequestDialog({
  children,
  userId,
  groupId,
}: MembershipRequestDialogProps) {
  const [dbAnswer, setDbAnswer] = React.useState<Answer | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const Schema = z.object({
    message: z
      .string()
      .min(1, "Debes escribir un mensaje")
      .max(400, "El mensaje es demasiado largo"),
  });

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: { message: "" },
  });

  const onSubmit = (values: { message: string }) => {
    const userRequest = { user: userId, message: values.message };
    setDbAnswer(null);
    startTransition(async () => {
      const answer = await addMemberRequest(groupId, userRequest);
      setDbAnswer(answer);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar solicitud</DialogTitle>
          <DialogDescription>
            Envía una solicitud al grupo. El administrador la revisará y
            aceptará o rechazará tu solicitud. Se paciente.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-7">
              {/*TODO: Sustituir por large text field */}
              <TextField
                form={form}
                name="message"
                label="Mensaje"
                placeholder="Hola, me gustaría formar parte del grupo..."
                description="Escribe un mensaje para el administrador del grupo, procura ser breve y conciso"
              />
              <DbAwnserBox answer={dbAnswer} />
              <Button disabled={isPending} className="w-full" type="submit">
                {isPending && <Loader2 className="animate-spin" />}
                Enviar solicitud
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
