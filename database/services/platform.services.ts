'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import Platform, {
  PlatformDocument,
  PlatformObject,
} from '../models/Platform.model'
import {Answer} from '../types/answer.type'
import {
  contactFormSchema,
  ContactFormValues,
} from '../validation/platform.schemas'

export async function getOnePlatform(name: string) {
  try {
    // Obtener la plataforma:
    await connectToMongoDB()
    const platform = await Platform.findOne({name: name})

    // Convertir la plataforma a un objeto plano:
    const platformPOJO = JSON.parse(JSON.stringify(platform))

    // Devolver la plataforma:
    return {
      ok: true,
      message: 'Plataforma obtenida',
      content: platformPOJO as PlatformObject,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

export async function addNewContactMessage(message: ContactFormValues) {
  try {
    // Validar los datos:
    const validated = await contactFormSchema.parseAsync(message)
    if (!validated) {
      return {ok: false, message: 'Datos no válidos'} as Answer
    }

    // Buscar la plataforma subterra:
    await connectToMongoDB()
    const platform: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    if (!platform) {
      return {ok: false, message: 'Algo ha ido mal'} as Answer
    }

    // Introducir el mensaje en la plataforma:
    platform.contact_messages.push(message)
    const updatedPlatform = await platform.save()
    if (!updatedPlatform) {
      return {ok: false, message: 'Algo ha ido mal'} as Answer
    }

    // Devolver respuesta exitosa:
    return {ok: true, message: 'Mensaje enviado'} as Answer
  } catch (error) {
    console.log(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
