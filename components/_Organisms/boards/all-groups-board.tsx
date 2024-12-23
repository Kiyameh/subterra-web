import React from 'react'
import Link from 'next/link'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import {getGroupsIndex} from '@/database/services/group.services'
import {GroupIndex} from '@/database/models/Group.model'
import {GroupProfileCard} from '@/components/_Atoms/slots/group-slots'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'

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
    <CardWithHeader cardSubHeader="Grupos registrados">
      {groups &&
        groups.map((group) => (
          <Link
            href={`/group/${group.name}`}
            key={group.name}
          >
            <GroupProfileCard groupIndex={group} />
          </Link>
        ))}
    </CardWithHeader>
  )
}
