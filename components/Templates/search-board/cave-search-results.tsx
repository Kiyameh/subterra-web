import {getCaveIndex} from '@/database/services/Cave/getCaveIndex'
import {type CaveIndex} from '@/database/services/Cave/getCaveIndex'
import {CaveSlot} from '@/components/Molecules/slots/documents-slots'

/**
 * @version 1
 * @description Muestra los resultados de la búsqueda de cuevas
 * @param query texto de búsqueda
 * @param instanceName Nombre de la instancia
 */

export default async function CaveSearchResults({
  query,
  instanceName,
}: {
  query: string | undefined
  instanceName: string
}) {
  const caves = (await getCaveIndex(instanceName)).content as
    | CaveIndex[]
    | undefined

  if (!caves || !query) return null

  const filtered = caves.filter((cave) => {
    return cave.name?.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <>
      <div className="text-lg text-muted-foreground ml-12 mt-3">
        <span className={filtered.length > 0 ? 'text-emphasis' : ''}>
          Cuevas
        </span>
      </div>
      <div className="space-y-2">
        {filtered.map((cave) => (
          <CaveSlot
            key={cave.name}
            cave={cave}
          />
        ))}
      </div>
    </>
  )
}
