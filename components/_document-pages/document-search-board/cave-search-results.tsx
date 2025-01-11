import {CaveSlot} from '@/components/_Atoms/slots/documents-slots'
import {CaveIndex, getCaveIndex} from '@/database/services/cave.actions'

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
    return cave.name.toLowerCase().includes(query.toLowerCase())
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
