import React from 'react'
import Link from 'next/link'
import {getGroupsIndex} from '@/database/services/group.actions'
import {GroupIndex} from '@/database/services/group.actions'
import {GroupProfileCard} from '@/components/_Atoms/slots/group-slots'
import FetchingErrorButton from '@/components/_Atoms/buttons/fetching-error-button'

export default async function AllGroupsPanel() {
  const groups = (await getGroupsIndex()).content as GroupIndex[]
  if (!groups) return <FetchingErrorButton />

  return (
    <>
      {groups &&
        groups.map((group) => (
          <Link
            href={`/group/${group.name}`}
            key={group.name}
          >
            <GroupProfileCard groupIndex={group} />
          </Link>
        ))}
    </>
  )
}
