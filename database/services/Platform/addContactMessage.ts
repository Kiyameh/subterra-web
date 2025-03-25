'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'
import Platform from '@/database/models/Platform.model'

import {type ContactMessage} from '@/database/models/Platform.model'
import {type PlatformDocument} from '@/database/models/Platform.model'

import {contactFormSchema} from '@/database/validation/platform.schemas'
import {ContactFormValues} from '@/database/validation/platform.schemas'

/**
 * @version 1
 * @description Función para añadir un nuevo mensaje de contacto
 * @param message Cuerpo del mensaje (valores de formulario)
 * @answer {ok, message}
 */

export async function addContactMessage(message: ContactFormValues) {
  try {
    // Validar los datos:
    const validated = await contactFormSchema.parseAsync(message)
    if (!validated) throw new Error('Datos no válidos')

    // Buscar la plataforma subterra:
    await connectToMongoDB()
    const subterra: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    if (!subterra) throw new Error('No se ha encontrado la plataforma')

    // Introducir el mensaje en la plataforma:
    const updated = subterra.pushContactMessage(message as ContactMessage)

    if (!updated) throw new Error('No se ha podido añadir el mensaje')

    // Devolver respuesta exitosa:
    return {ok: true, message: 'Mensaje enviado'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
