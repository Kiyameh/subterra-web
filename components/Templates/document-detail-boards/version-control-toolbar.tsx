import {Button} from '@/components/Atoms/button'
import {format} from 'date-fns'
import {es} from 'date-fns/locale'
import {ClockIcon} from 'lucide-react'

export default function VersionControlToolbar({
  currentVersion,
  currentVersionDate,
  availableVersions,
  changeVersion,
}: {
  currentVersion: number
  currentVersionDate?: Date
  availableVersions: number
  changeVersion: (v: number) => void
}) {
  const versionNumbersArray = Array.from(
    {length: availableVersions},
    (_, i) => i
  )

  return (
    <div className="flex flex-row flex-wrap items-center gap-4 bg-card px-4 rounded-md text-muted-foreground text-sm p-2">
      <span className="flex items-center gap-2">
        <ClockIcon size={20} />
        Versiones del documento
      </span>
      <div className="flex flex-wrap gap-1">
        {versionNumbersArray.map((version) => (
          <Button
            key={version}
            className="rounded-full h-6 w-6"
            size="sm"
            variant={currentVersion === version ? 'default' : 'outline'}
            onClick={() => changeVersion(version)}
          >
            {version}
          </Button>
        ))}
      </div>
      {currentVersionDate && (
        <span className="text-muted-foreground text-xs">
          {format(currentVersionDate, 'd MMM yyyy HH:mm:ss', {locale: es})}
        </span>
      )}
    </div>
  )
}
