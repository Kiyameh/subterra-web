'use client'
import DateBadge from '../badges/date-badge'
import {IoDocumentTextOutline} from 'react-icons/io5'
import Link from 'next/link'
import {useParams} from 'next/navigation'
import DistanceBadge from '@/components/_Atoms/badges/distance-badge'
import {Button} from '@/components/ui/button'
import {FaAnchor} from 'react-icons/fa'
import {FaRegCircle} from 'react-icons/fa6'
import {PiCirclesThreeBold} from 'react-icons/pi'
import {CaveIndex, PlainCave} from '@/database/services/cave.actions'
import {
  ExplorationIndex,
  PlainExploration,
} from '@/database/services/exploration.actions'
import {PlainSystem, SystemIndex} from '@/database/services/system.actions'

/**
 * @version 1
 * @description Slot que muestra una exploración con sus fechas y un botón para acceder a la vista de detalle.
 * @param exploration Objeto de exploración
 */

export function ExplorationSlot({
  exploration,
}: {
  exploration: PlainExploration | ExplorationIndex
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
          {exploration.dates &&
            exploration.dates?.map((date, i) => {
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
/**
 * @version 1
 * @description Slot que muestra una cueva con sus dimensiones y un botón para acceder a la vista de detalle.
 * @param cave Objeto de cueva
 */

export function CaveSlot({cave}: {cave: PlainCave | CaveIndex}) {
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
          {cave.length && <DistanceBadge valueInMeters={cave.length} />}
          {cave.depth && <DistanceBadge valueInMeters={cave.depth} />}
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
/**
 * @version 1
 * @description Slot que muestra un sistema con sus dimensiones y un botón para acceder a la vista de detalle.
 * @param system Objeto de sistema
 */
export function SystemSlot({system}: {system: PlainSystem | SystemIndex}) {
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
          {system.length && <DistanceBadge valueInMeters={system.length} />}
          {system.depth && <DistanceBadge valueInMeters={system.depth} />}
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
