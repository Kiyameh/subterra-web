import {ExplorationSlot} from '@/components/_Atoms/slots/documents-slots'
import {getExplorationsIndex} from '@/database/services/Exploration/getExplorationIndex'
import {ExplorationIndex} from '@/database/services/Exploration/getExplorationIndex'

export default async function ExplorationSearchResults({
  query,
  instanceName,
}: {
  query: string | undefined
  instanceName: string
}) {
  const explorations = (await getExplorationsIndex(instanceName)).content as
    | ExplorationIndex[]
    | undefined

  if (!explorations || !query) return null

  const filtered = explorations.filter((exploration) => {
    return exploration.name.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <>
      <div className="text-lg text-muted-foreground ml-12 mt-3">
        <span className={filtered.length > 0 ? 'text-emphasis' : ''}>
          Exploraciones
        </span>
      </div>

      <div className="space-y-2">
        {filtered.map((exploration) => (
          <ExplorationSlot
            key={exploration.name}
            exploration={exploration}
          />
        ))}
      </div>
    </>
  )
}
