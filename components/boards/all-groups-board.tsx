import React from 'react'
import Link from 'next/link'
import NotFoundCard from '@/components/displaying/404-not-found'
import {getGroupsIndex} from '@/database/services/group.services'
import {GroupIndex} from '@/database/models/Group.model'
import {GroupCard} from './_slots/group-slots'

export default async function GroupsBoard() {
  const groups = (await getGroupsIndex()).content as GroupIndex[]
  if (!groups)
    return (
      <NotFoundCard
        title="Algo ha ido mal"
        text="No se han podido cargar las instancias. Intentalo de nuevo más tarde."
      />
    )

  return (
    <div className="max-w-full max-h-[60vh] flex flex-col flex-wrap justify-center gap-4">
      {groups &&
        groups.map((group) => (
          <Link
            href={`/group/${group.name}`}
            key={group.name}
          >
            <GroupCard groupIndex={group} />
          </Link>
        ))}
    </div>
  )
}
