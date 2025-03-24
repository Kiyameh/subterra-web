import React from 'react'

import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'

import {MdOutlineExplore} from 'react-icons/md'
import {PlainExploration} from '@/database/services/Exploration/getPlainExploration'
import {getExplorationsOfCave} from '@/database/services/Exploration/getExplorationsOfCave'
import {useParams} from 'next/navigation'
import {IoDocumentTextOutline} from 'react-icons/io5'
import DateBadge from '@/components/Molecules/badges/date-badge'
import Link from 'next/link'
import {Button} from '@/components/Atoms/button'
import {FaAnchor} from 'react-icons/fa'

/**
 * @version 2
 * @description Muestra las exploraciones de una cavidad
 * @param documentId Id de la cavidad
 */
export default function CaveExplorationsCard({
  documentId,
}: {
  documentId: string
}) {
  // Obtener la instancia actual
  const {instance} = useParams<{instance: string; document: string}>()

  const [explorations, setExplorations] = React.useState<PlainExploration[]>([])
  React.useEffect(() => {
    const fetchExplorations = async () => {
      const explorations = (await getExplorationsOfCave(documentId)).content as
        | PlainExploration[]
        | undefined
      setExplorations(explorations || [])
    }
    fetchExplorations()
  }, [documentId])

  if (explorations.length === 0) return null

  return (
    <BasicCard
      className="w-full"
      key="explorations_card"
      cardHeader={
        <CardTitle
          title={'Últimas exploraciones'}
          icon={<MdOutlineExplore />}
        />
      }
    >
      {explorations.reverse().map((exploration) => (
        <div
          key={exploration._id}
          className="flex flex-col gap-1 rounded-xl bg-muted/50 p-2 "
        >
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
      ))}
    </BasicCard>
  )
}
