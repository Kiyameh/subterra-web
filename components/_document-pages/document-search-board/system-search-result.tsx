import {SystemSlot} from '@/components/_Atoms/slots/documents-slots'
import {SystemIndex} from '@/database/services/System/getSystemIndex'
import {getSystemIndex} from '@/database/services/System/getSystemIndex'

export default async function SystemSearchResult({
  query,
  instanceName,
}: {
  query: string | undefined
  instanceName: string
}) {
  const systems = (await getSystemIndex(instanceName)).content as
    | SystemIndex[]
    | undefined

  if (!systems || !query) return null

  const filtered = systems.filter((system) => {
    return system.name.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <>
      <div className="text-lg text-muted-foreground ml-12 mt-3">
        <span className={filtered.length > 0 ? 'text-emphasis' : ''}>
          Sistemas
        </span>
      </div>
      <div className="space-y-2">
        {filtered.map((system) => (
          <SystemSlot
            key={system.name}
            system={system}
          />
        ))}
      </div>
    </>
  )
}
