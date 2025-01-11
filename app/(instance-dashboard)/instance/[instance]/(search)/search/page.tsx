import React, {Suspense} from 'react'
import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CaveSearchResults from '@/components/_document-pages/document-search-board/cave-search-results'
import PageContainer from '@/components/theming/page-container'
import {Skeleton} from '@/components/ui/skeleton'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import {FaSearch} from 'react-icons/fa'
import SystemSearchResult from '@/components/_document-pages/document-search-board/system-search-result'
import ExplorationSearchResults from '@/components/_document-pages/document-search-board/exploration-search-result'

export default async function DocumentSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{instance: string}>
  searchParams?: Promise<{[key: string]: string | string[] | undefined}>
}) {
  const instanceName = (await params).instance
  const query = (await searchParams)?.query as string | undefined

  return (
    <PageContainer className="justify-start">
      <BasicCard
        defaultWidth="xl"
        cardHeader={
          <CardTitle
            title="Resultados de búsqueda"
            icon={<FaSearch />}
          />
        }
      >
        <Suspense
          fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
        >
          <CaveSearchResults
            query={query}
            instanceName={instanceName}
          />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
        >
          <ExplorationSearchResults
            query={query}
            instanceName={instanceName}
          />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
        >
          <SystemSearchResult
            query={query}
            instanceName={instanceName}
          />
        </Suspense>
      </BasicCard>
    </PageContainer>
  )
}
