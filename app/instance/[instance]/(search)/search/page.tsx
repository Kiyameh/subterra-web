import React, {Suspense} from 'react'

import {Skeleton} from '@/components/Atoms/skeleton'
import CardTitle from '@/components/Molecules/boxes/card-title'
import BasicCard from '@/components/Molecules/boxes/basic-card'
import CaveSearchResults from '@/components/Templates/search-board/cave-search-results'
import ExplorationSearchResults from '@/components/Templates/search-board/exploration-search-result'
import SystemSearchResult from '@/components/Templates/search-board/system-search-result'

import {FaSearch} from 'react-icons/fa'

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
  )
}
