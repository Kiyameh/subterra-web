'use client'
import DateBadge from '../badges/date-badge'
import {IoDocumentTextOutline} from 'react-icons/io5'
import Link from 'next/link'
import {useParams} from 'next/navigation'
import DistanceBadge from '../badges/distance-badge'
import {Button} from '@/components/ui/button'
import {FaAnchor} from 'react-icons/fa'
import {FaRegCircle} from 'react-icons/fa6'
import {PiCirclesThreeBold} from 'react-icons/pi'
import {PlainCave} from '@/database/services/cave.actions'
import {PlainExploration} from '@/database/services/exploration.actions'
import {PlainSystem} from '@/database/services/system.actions'

export function ExplorationSlot({
  exploration,
}: {
  exploration: PlainExploration
}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-2 ">
      <div className="flex gap-2 items-center text-foreground/80">
        <IoDocumentTextOutline className="h-6 w-6" />
        <span>{exploration.name}</span>
      </div>
      <div className="flex flex-row gap-2 justify-between items-end">
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
        <Link
          href={`/instance/${instance}/explorations/${exploration._id}`}
          passHref
        >
          <Button
            size={'sm'}
            variant={'outline'}
          >
            <FaAnchor className="text-emphasis" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
export function CaveSlot({cave}: {cave: PlainCave}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-2 ">
      <div className="flex gap-2 items-center text-foreground/80">
        <FaRegCircle className="h-6 w-6" />
        <span>{cave.name}</span>
      </div>
      <div className="flex flex-row gap-2 justify-between items-end">
        <div className="flex gap-1 flex-wrap">
          <DistanceBadge valueInMeters={cave.length} />
          <DistanceBadge valueInMeters={cave.depth} />
        </div>
        <Link
          href={`/instance/${instance}/caves/${cave._id}`}
          passHref
        >
          <Button
            size={'sm'}
            variant={'outline'}
          >
            <FaAnchor className="text-emphasis" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
export function SystemSlot({system}: {system: PlainSystem}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-2 ">
      <div className="flex gap-2 items-center text-foreground/80">
        <PiCirclesThreeBold className="h-6 w-6" />
        <span>{system.name}</span>
      </div>
      <div className="flex flex-row gap-2 justify-between items-end">
        <div className="flex gap-1 flex-wrap">
          <DistanceBadge valueInMeters={system.length} />
          <DistanceBadge valueInMeters={system.depth} />
        </div>
        <Link
          href={`/instance/${instance}/systems/${system._id}`}
          passHref
        >
          <Button
            size={'sm'}
            variant={'outline'}
          >
            <FaAnchor className="text-emphasis" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
