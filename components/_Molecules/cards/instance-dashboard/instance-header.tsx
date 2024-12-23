import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneInstance} from '@/database/services/instance.services'
import {cn} from '@/lib/utils'
import React from 'react'
import {FiBox} from 'react-icons/fi'

/**
 * @version 1
 * @description Caja de titulo para páginas de instancia
 * @param instanceName nombre de la instancia
 */

export default async function InstanceHeader({
  instanceName,
}: {
  instanceName: string
}) {
  // Obtener la instancia
  const instance = (await getOneInstance(instanceName))
    .content as PopulatedInstance | null

  return (
    <div
      className={cn(
        'max-w-7xl w-full px-2 py-1 mb-4 mt-6  bg-gradient-to-tl from-muted to-card rounded-lg flex gap-2 items-center justify-center text-card-foreground border border-muted-foreground'
      )}
    >
      <FiBox />
      <h2 className="text-lg">{instance?.fullname || instanceName}</h2>
    </div>
  )
}
