'use client'
import React from 'react'

import {type PlainCave} from '@/database/services/Cave/getPlainCave'

import HeaderBox from '@/components/Molecules/boxes/header-box'

import {getOldVersion} from '@/components/Templates/documents/details-boards/get-old-version'
import MainPictureCard from '@/components/Templates/documents/details-boards/card-main-picture'
import VersionControlToolbar from '@/components/Templates/documents/details-boards/toolbar-version-control'
import DocumentActionsToolbar from '@/components/Templates/documents/details-boards/toolbar-document-actions'
import PicturesCard from '@/components/Templates/documents/details-boards/card-pictures'
import TopographiesCard from '@/components/Templates/documents/details-boards/card-topographies'

import CaveLocationCard from './card-location-of-cave'
import CaveInfoCard from './card-info-of-cave'
import CaveExplorationsCard from './card-explorations-of-cave'
import DescriptionCard from './card-description'
import ScienceCard from './card-science'

import {FaRegCircle} from 'react-icons/fa'

/**
 * @version 1
 * @description Panel de detalles de una cueva
 * @param caveId - ID de la cueva
 * @param isEditor - Indica si el usuario es editor
 * @param commanderId - ID del usuario que comanda la cueva
 * @param cave - Datos de la cueva
 */

export default function CaveDetailsBoard({
  caveId,
  isEditor,
  commanderId,
  cave,
}: {
  caveId: string
  isEditor: boolean
  commanderId: string | null
  cave: PlainCave
}) {
  const [documentData, setDocumentData] = React.useState<PlainCave>(cave)

  const avaibleVersions: number = cave.versions?.length + 1 || 1

  function handleVersionChange(v: number) {
    setDocumentData(getOldVersion(cave, v))
  }

  return (
    <div className="w-full">
      <header className="w-full">
        <MainPictureCard
          src={cave.pictures?.[0]?.file_src || null}
          alt={cave.pictures?.[0]?.description}
        />
        <HeaderBox
          text={cave.name || caveId}
          icon={<FaRegCircle />}
        />

        <div className="bg-card rounded-md flex flex-row flex-wrap justify-between items-center">
          <DocumentActionsToolbar
            isEditor={isEditor}
            commanderId={commanderId}
            documentType="cave"
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
        <CaveInfoCard document={documentData} />
        <DescriptionCard document={documentData} />
        <CaveLocationCard document={documentData} />
        <ScienceCard document={documentData} />
        <PicturesCard pictures={documentData.pictures || []} />
        <TopographiesCard topographies={documentData.topographies || []} />
        <CaveExplorationsCard documentId={documentData._id} />
      </div>
    </div>
  )
}
