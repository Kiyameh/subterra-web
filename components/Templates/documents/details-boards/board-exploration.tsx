'use client'
import React from 'react'

import { type PlainExploration } from '@/database/services/Exploration/getPlainExploration'

import HeaderBox from '@/components/Molecules/boxes/header-box'
import { getOldVersion } from '@/components/Templates/documents/details-boards/get-old-version'
import MainPictureCard from '@/components/Templates/documents/details-boards/card-main-picture'
import VersionControlToolbar from '@/components/Templates/documents/details-boards/toolbar-version-control'
import DocumentActionsToolbar from '@/components/Templates/documents/details-boards/toolbar-document-actions'
import PicturesCard from '@/components/Templates/documents/details-boards/card-pictures'

import ExplorationInfoCard from './card-info-of-exploration'
import ExplorationCavesCard from './card-caves-of-exploration'
import ExplorationDescriptionCard from './card-description-of-exploration'

import { FaRegCircle } from 'react-icons/fa'

/**
 * @version 1
 * @description Panel de detalles de una exploración
 * @param explorationId - ID de la exploración
 * @param isEditor - Indica si el usuario es editor
 * @param commanderId - ID del usuario que comanda la exploración
 * @param exploration - Datos de la exploración
 */

export default function ExplorationDetailsBoard({
  explorationId,
  isEditor,
  commanderId,
  exploration,
}: {
  explorationId: string
  isEditor: boolean
  commanderId: string | null
  exploration: PlainExploration
}) {
  const [documentData, setDocumentData] =
    React.useState<PlainExploration>(exploration)

  const originalExploration = React.useMemo(() => exploration, [exploration])

  const avaibleVersions: number = documentData.versions?.length + 1 || 1

  function handleVersionChange(v: number) {
    setDocumentData(getOldVersion(originalExploration, v))
  }

  return (
    <div className="w-full">
      <header className="w-full">
        <MainPictureCard
          src={documentData.pictures?.[0]?.file_src || null}
          alt={documentData.pictures?.[0]?.description}
        />
        <HeaderBox
          text={documentData.name || explorationId}
          icon={<FaRegCircle />}
        />

        <div className="bg-card rounded-md flex flex-row flex-wrap justify-between items-center">
          <DocumentActionsToolbar
            isEditor={isEditor}
            commanderId={commanderId}
            documentType="exploration"
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
        <ExplorationInfoCard document={documentData} />
        <ExplorationDescriptionCard document={documentData} />
        <PicturesCard pictures={documentData.pictures || []} />
        <ExplorationCavesCard caves={documentData.caves} />
      </div>
    </div>
  )
}
