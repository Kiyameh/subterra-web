import React from 'react'
import Link from 'next/link'

import {GroupProfileCard} from '@/components/Molecules/slots/group-slots'
import FetchingErrorButton from '@/components/Molecules/buttons/fetching-error-button'
import {getGroupsIndex} from '@/database/services/Group/getGroupsIndex'
import {GroupIndex} from '@/database/services/Group/getGroupsIndex'

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
