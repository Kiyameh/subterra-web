import {PopulatedInstance} from '@/database/models/Instance.model'
import {getOneGroup} from '@/database/services/group.services'
import {cn} from '@/lib/utils'
import React from 'react'
import {FaUserGroup} from 'react-icons/fa6'

/**
 * @version 1
 * @description Caja de titulo para páginas de grupo
 * @param groupName nombre de la grupo
 */

export default async function GroupHeader({groupName}: {groupName: string}) {
  // Obtener la instancia
  const group = (await getOneGroup(groupName))
    .content as PopulatedInstance | null

  return (
    <div
      className={cn(
        'max-w-7xl w-full px-2 py-1 mb-4 mt-6  bg-gradient-to-tl from-muted to-card rounded-lg flex gap-2 items-center justify-center text-card-foreground border border-muted-foreground'
      )}
    >
      <FaUserGroup />
      <h2 className="text-lg">{group?.fullname || groupName}</h2>
    </div>
  )
}
