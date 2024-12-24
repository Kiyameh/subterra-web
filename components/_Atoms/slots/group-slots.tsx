import React from 'react'
import {GroupIndex} from '@/database/services/group.actions'
import {FaUserGroup} from 'react-icons/fa6'

/**
 * @version 1
 * @description Slot de perfil de grupo con nombre y provincia
 * @param groupIndex Índice de grupo
 */

export function GroupProfileCard({groupIndex}: {groupIndex: GroupIndex}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-muted-foreground bg-card">
      <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-xl text-sidebar-primary-foreground">
        <FaUserGroup />
      </div>
      <div className="text-muted-foreground">
        <p className="font-semibold">{groupIndex.fullname}</p>
        <p className="text-sm">{groupIndex.province}</p>
      </div>
    </div>
  )
}
