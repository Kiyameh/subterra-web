'use client'
import {ExplorationObject} from '@/database/models/Exploration.model'
import DateBadge from '../badges/date-badge'
import {IoDocumentTextOutline} from 'react-icons/io5'
import Link from 'next/link'
import {useParams} from 'next/navigation'
import {CaveObject} from '@/database/models/Cave.model'
import {SystemObject} from '@/database/models/System.model'
import DistanceBadge from '../badges/distance-badge'

export function ExplorationSlot({
  exploration,
}: {
  exploration: ExplorationObject
}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()

  return (
    <Link
      className="flex flex-col gap-1 rounded-xl bg-muted/50 p-2 "
      href={`/instance/${instance}/detail/exploration/${exploration._id}`}
      passHref
    >
      <div className="flex gap-2 items-center text-foreground/80">
        <IoDocumentTextOutline className="h-6 w-6" />
        <span>{exploration.name}</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {exploration.dates?.map((date, i) => {
          return (
            <DateBadge
              key={i}
              value={date}
            />
          )
        })}
      </div>
    </Link>
  )
}
export function CaveSlot({cave}: {cave: CaveObject}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()

  return (
    <Link
      className="flex flex-col gap-1 rounded-xl bg-muted/50 p-2 "
      href={`/instance/${instance}/detail/cave/${cave._id}`}
      passHref
    >
      <div className="flex gap-2 items-center text-foreground/80">
        <IoDocumentTextOutline className="h-6 w-6" />
        <span>{cave.name}</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        <DistanceBadge valueInMeters={cave.length} />
        <DistanceBadge valueInMeters={cave.depth} />
      </div>
    </Link>
  )
}
export function SystemSlot({system}: {system: SystemObject}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()

  return (
    <Link
      className="flex flex-col gap-1 rounded-xl bg-muted/50 p-2 "
      href={`/instance/${instance}/detail/system/${system._id}`}
      passHref
    >
      <div className="flex gap-2 items-center text-foreground/80">
        <IoDocumentTextOutline className="h-6 w-6" />
        <span>{system.name}</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        <DistanceBadge valueInMeters={system.length} />
        <DistanceBadge valueInMeters={system.depth} />
      </div>
    </Link>
  )
}
