'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import {Input} from '@/components/ui/input'
import {ArrowRight, Search} from 'lucide-react'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

/**
 * @version 1
 * @description Barra de búsqueda para el sidebar
 * @param placeholder - Placeholder del input
 * @param baseUrl - URL base para la búsqueda
 * Redirige a la url --> ${baseUrl}/search?query=:query
 */

export default function SidebarSearchBar({
  placeholder = 'Buscar...',
  baseUrl,
}: {
  placeholder?: string
  baseUrl: string
}) {
  const isOpen = useSidebar().open
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`${baseUrl}/search?query=${query}`)
    }
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {isOpen && (
          <SidebarMenuItem>
            <form onSubmit={handleSearch}>
              <Input
                className="peer pe-9 ps-9 border border-muted-foreground"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Search
                  size={16}
                  strokeWidth={2}
                />
              </div>
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit search"
                type="submit"
              >
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </form>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
