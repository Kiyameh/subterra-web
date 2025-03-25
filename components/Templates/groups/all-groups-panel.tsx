import React from 'react'
import Link from 'next/link'

import {getGroupsIndex} from '@/database/services/Group/getGroupsIndex'
import {type GroupIndex} from '@/database/services/Group/getGroupsIndex'

import {GroupProfileCard} from '@/components/Molecules/slots/group-slots'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'

/**
 * @version 1
 * @description Panel que muestra todos los grupos
 */

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
