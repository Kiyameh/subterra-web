import React from 'react'
import Link from 'next/link'
import {useParams} from 'next/navigation'

import {getPlainSystem} from '@/database/services/System/getPlainSystem'
import {type PlainSystem} from '@/database/services/System/getPlainSystem'

import {Button} from '@/components/Atoms/button'
import {Skeleton} from '@/components/Atoms/skeleton'
import DistanceBadge from '@/components/Molecules/badges/distance-badge'

import {FaAnchor} from 'react-icons/fa'
import {PiCirclesThreeBold} from 'react-icons/pi'

/**
 * @version 1
 * @description Widget de sistema
 * @param systemId Id del sistema
 */

export default function SystemWidget({systemId}: {systemId: string}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()
  const [system, setSystem] = React.useState<PlainSystem | undefined>(undefined)

  React.useEffect(() => {
    const fetchSystem = async () => {
      const system = (await getPlainSystem(systemId)).content as
        | PlainSystem
        | undefined
      setSystem(system)
    }
    fetchSystem()
  }, [systemId])

  if (!system) return <WidgetSkeleton />

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
          href={`/instance/${instance}/systems/${systemId}`}
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

function WidgetSkeleton() {
  return (
    <Skeleton className="w-full h-20 flex items-center justify-center text-muted-foreground">
      Cargando sistema...
    </Skeleton>
  )
}
