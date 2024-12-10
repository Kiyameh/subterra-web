'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {Answer} from '@/database/types/answer.type'

import Platform from '@/database/models/Platform.model'
import {InstanceRequest} from '@/database/models/Platform.model'
import {ContactMessage} from '@/database/models/Platform.model'
import {PlatformObject} from '@/database/models/Platform.model'
import {PlatformDocument} from '@/database/models/Platform.model'

import {contactFormSchema} from '@/database/validation/platform.schemas'
import {ContactFormValues} from '@/database/validation/platform.schemas'

import {InstanceRequestFormValues} from '@/database/validation/platform.schemas'
import {instanceRequestFormSchema} from '@/database/validation/platform.schemas'

//* 1. Funciones generales */

/**
 * @version 1
 * @description Función para obtener una plataforma
 * @param name Nombre de la plataforma (por defecto 'subterra')
 * @answer {ok, message, content: PlatformObject}
 */

export async function getOnePlatform(name: string = 'subterra') {
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

//* 2. Gestión de mensajes de contacto */

/**
 * @version 1
 * @description Función para añadir un nuevo mensaje de contacto
 * @param message Cuerpo del mensaje (valores de formulario)
 * @answer {ok, message}
 */

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
    platform.contact_messages.push(message as ContactMessage)
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

/**
 * @version 1
 * @description Función para eliminar un mensaje de contacto
 * @param messageId ID del mensaje a eliminar
 * @answer {ok, message}
 */

export async function deleteContactMessage(messageId: string) {
  try {
    // Buscar la plataforma subterra:
    await connectToMongoDB()
    const platform: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    if (!platform) {
      return {ok: false, message: 'Algo ha ido mal'} as Answer
    }

    // Eliminar el mensaje de la plataforma:
    platform.contact_messages = platform.contact_messages.filter(
      (message) => message._id.toString() !== messageId
    )
    const updatedPlatform = await platform.save()
    if (!updatedPlatform) {
      return {ok: false, message: 'Algo ha ido mal'} as Answer
    }

    // Devolver respuesta exitosa:
    return {ok: true, message: 'Mensaje eliminado'} as Answer
  } catch (error) {
    console.log(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

//* 3. Gestión de solicitudes de instancias */

/**
 * @description Función para añadir una nueva solicitud de creación de instancia
 * @param request Cuerpo de la solicitud (valores de formulario)
 * @returns
 */

export async function addNewInstanceRequest(
  request: InstanceRequestFormValues
) {
  try {
    // Validar los datos:
    const validated = await instanceRequestFormSchema.parseAsync(request)
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

    // Introducir la solicitud en la plataforma:
    platform.instance_requests.push(request as InstanceRequest)
    const updatedPlatform = await platform.save()
    if (!updatedPlatform) {
      return {ok: false, message: 'Algo ha ido mal'} as Answer
    }

    // Devolver respuesta exitosa:
    return {ok: true, message: 'Solicitud enviada'} as Answer
  } catch (error) {
    console.log(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}

/**
 * @version 1
 * @description Función para eliminar una solicitud de creación de instancia
 * @param requestId ID de la solicitud a eliminar
 * @answer {ok, message}
 */

export async function deleteInstanceRequest(requestId: string) {
  try {
    // Buscar la plataforma subterra:
    await connectToMongoDB()
    const platform: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    if (!platform) {
      return {ok: false, message: 'Algo ha ido mal'} as Answer
    }

    // Eliminar la solicitud de la plataforma:
    platform.instance_requests = platform.instance_requests.filter(
      (request) => request._id.toString() !== requestId
    )
    const updatedPlatform = await platform.save()
    if (!updatedPlatform) {
      return {ok: false, message: 'Algo ha ido mal'} as Answer
    }

    // Devolver respuesta exitosa:
    return {ok: true, message: 'Solicitud eliminada'} as Answer
  } catch (error) {
    console.log(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
