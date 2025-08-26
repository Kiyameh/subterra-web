'use server'
import {connectToMongoDB} from '@/database/databaseConection'
import {type Answer} from '@/database/types/Answer'
import Platform from '@/database/models/Platform.model'

import {type InstanceRequest} from '@/database/models/Platform.model'
import {type PlatformDocument} from '@/database/models/Platform.model'

import {type InstanceRequestFormValues} from '@/database/validation/platform.schemas'
import {instanceRequestFormSchema} from '@/database/validation/platform.schemas'
/**
 * @description Función para añadir una nueva solicitud de creación de instancia
 * @param request Cuerpo de la solicitud (valores de formulario)
 * @returns
 */

export async function addInstanceRequest(request: InstanceRequestFormValues) {
  try {
    // Validar los datos:
    const validated = await instanceRequestFormSchema.parseAsync(request)
    if (!validated) throw new Error('Datos no válidos')

    // Buscar la plataforma subterra:
    await connectToMongoDB()
    const subterra: PlatformDocument | null = await Platform.findOne({
      name: 'subterra',
    })
    if (!subterra) throw new Error('No se ha encontrado la plataforma')

    // Introducir la solicitud en la plataforma:
    const updated = subterra.pushInstanceRequest(request as InstanceRequest)
    if (!updated) throw new Error('No se ha podido añadir la solicitud')

    // Devolver respuesta exitosa:
    return {ok: true, message: 'Solicitud enviada'} as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, message: 'Error desconocido'} as Answer
  }
}
