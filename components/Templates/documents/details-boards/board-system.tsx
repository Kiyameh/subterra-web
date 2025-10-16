'use client'
import React from 'react'

import { type PlainSystem } from '@/database/services/System/getPlainSystem'

import HeaderBox from '@/components/Molecules/boxes/header-box'
import { getOldVersion } from './get-old-version'
import MainPictureCard from './card-main-picture'
import DocumentActionsToolbar from './toolbar-document-actions'
import VersionControlToolbar from './toolbar-version-control'
import PicturesCard from './card-pictures'
import TopographiesCard from './card-topographies'
import SystemInfoCard from './card-info-of-system'
import SystemCavesCard from './card-caves-of-system'
import DescriptionCard from './card-description'
import ScienceCard from './card-science'

import { PiCirclesThreeBold } from 'react-icons/pi'

/**
 * @version 1
 * @description Panel de detalles de un sistema
 * @param systemId - ID del sistema
 * @param isEditor - Indica si el usuario es editor
 * @param commanderId - ID del usuario que comanda el sistema
 * @param system - Datos del sistema
 */

export default function SystemDetailsBoard({
  systemId,
  isEditor,
  commanderId,
  system,
}: {
  systemId: string
  isEditor: boolean
  commanderId: string | null
  system: PlainSystem
}) {
  const [documentData, setDocumentData] = React.useState<PlainSystem>(system)

  const originalSystem = React.useMemo(() => system, [system])

  const avaibleVersions: number = originalSystem.versions?.length + 1 || 1

  function handleVersionChange(v: number) {
    setDocumentData(getOldVersion(originalSystem, v))
  }

  return (
    <div className="w-full">
      <header className="w-full">
        <MainPictureCard
          src={documentData.pictures?.[0]?.file_src || null}
          alt={documentData.pictures?.[0]?.description}
        />
        <HeaderBox
          text={documentData.name || systemId}
          icon={<PiCirclesThreeBold />}
        />

        <div className="bg-card rounded-md flex flex-row flex-wrap justify-between items-center">
          <DocumentActionsToolbar
            isEditor={isEditor}
            commanderId={commanderId}
            documentType="system"
          />

          <VersionControlToolbar
            currentVersion={documentData.__v}
            currentVersionDate={documentData.updatedAt}
            availableVersions={avaibleVersions}
            changeVersion={handleVersionChange}
          />
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-4 gap-4">
        <SystemInfoCard document={documentData} />
        <DescriptionCard document={documentData} />
        <ScienceCard document={documentData} />
        <PicturesCard pictures={documentData.pictures || []} />
        <TopographiesCard topographies={documentData.topographies || []} />
        <SystemCavesCard documentId={documentData._id} />
      </div>
    </div>
  )
}
