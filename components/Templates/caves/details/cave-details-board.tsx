'use client'
import React from 'react'

import {PlainCave} from '@/database/services/Cave/getPlainCave'

import HeaderBox from '@/components/Molecules/boxes/header-box'

import MainPictureCard from '@/components/Templates/document-cards/main-picture-card'
import {getOldVersion} from '@/components/Templates/document-detail-boards/get-old-version'
import VersionControlToolbar from '@/components/Templates/document-detail-boards/version-control-toolbar'
import DocumentActionsToolbar from '@/components/Templates/document-detail-boards/document-actions-toolbar'

import PicturesCard from '@/components/Templates/document-cards/pictures-card'
import TopographiesCard from '@/components/Templates/document-cards/topographies-card'

import CaveDescriptionCard from './cave-description-card'
import CaveLocationCard from './cave-location-card'
import CaveInfoCard from './cave-info-card'
import CaveScienceCard from './cave-science-card'

import {FaRegCircle} from 'react-icons/fa'
import CaveExplorationsCard from './cave-explorations-card'

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
    <>
      <div>
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
          <CaveDescriptionCard document={documentData} />
          <CaveLocationCard document={documentData} />
          <CaveScienceCard document={documentData} />
          <PicturesCard pictures={documentData.pictures || []} />
          <TopographiesCard topographies={documentData.topographies || []} />
          <CaveExplorationsCard documentId={documentData._id} />
        </div>
      </div>
    </>
  )
}
