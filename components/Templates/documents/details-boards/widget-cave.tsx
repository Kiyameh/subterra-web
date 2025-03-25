import React from 'react'
import Link from 'next/link'
import {useParams} from 'next/navigation'

import {getPlainCave} from '@/database/services/Cave/getPlainCave'
import {type PlainCave} from '@/database/services/Cave/getPlainCave'

import {Button} from '@/components/Atoms/button'
import {Skeleton} from '@/components/Atoms/skeleton'
import DistanceBadge from '@/components/Molecules/badges/distance-badge'

import {FaAnchor, FaRegCircle} from 'react-icons/fa'

/**
 * @version 1
 * @description Widget de cavidad
 * @param caveId Id de la cavidad
 */

export default function CaveWidget({caveId}: {caveId: string}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()
  const [cave, setCave] = React.useState<PlainCave | undefined>(undefined)

  React.useEffect(() => {
    const fetchCave = async () => {
      const cave = (await getPlainCave(caveId)).content as PlainCave | undefined
      setCave(cave)
    }
    fetchCave()
  }, [caveId])

  if (!cave) return <WidgetSkeleton />

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

function WidgetSkeleton() {
  return (
    <Skeleton className="w-full h-20 flex items-center justify-center text-muted-foreground">
      Cargando cavidad...
    </Skeleton>
  )
}
