import React from 'react'
import Link from 'next/link'
import {useParams} from 'next/navigation'

import {getCavesOfSystem} from '@/database/services/Cave/getCavesOfSystem'
import {type PlainCave} from '@/database/services/Cave/getPlainCave'

import {Button} from '@/components/Atoms/button'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import DistanceBadge from '@/components/Molecules/badges/distance-badge'

import {FaAnchor, FaRegCircle} from 'react-icons/fa'

/**
 * @version 2
 * @description Muestra las cavidades de un sistema
 * @param documentId Id del sistema
 */
export default function SystemCavesCard({documentId}: {documentId: string}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()

  const [caves, setCaves] = React.useState<PlainCave[]>([])
  React.useEffect(() => {
    const fetchCaves = async () => {
      const caves = (await getCavesOfSystem(documentId)).content as
        | PlainCave[]
        | undefined
      setCaves(caves || [])
    }
    fetchCaves()
  }, [documentId])

  if (caves.length === 0) return null

  return (
    <BasicCard
      className="w-full"
      key="caves_card"
      cardHeader={
        <CardTitle
          title={'Cavidades del sistema'}
          icon={<FaRegCircle />}
        />
      }
    >
      {caves.map((cave) => (
        <div
          key={cave._id}
          className="flex flex-col gap-1 rounded-xl bg-muted/50 p-2 "
        >
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
      ))}
    </BasicCard>
  )
}
