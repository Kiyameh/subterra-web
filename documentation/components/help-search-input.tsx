'use client'
import type React from 'react'
import {useState, useEffect, useRef, useCallback} from 'react'
import {useRouter, usePathname, useSearchParams} from 'next/navigation'

import {SearchResult} from '@/documentation/types'
import {searchContent} from '@/documentation/functions/help-search'
import {debounce} from '@/documentation/functions/debounce'

import {Input} from '@/components/Atoms/input'
import {Button} from '@/components/Atoms/button'
import {Card, CardContent} from '@/components/Atoms/card'
import {ScrollArea} from '@/components/Atoms/scroll-area'

import {Search, ChevronRight} from 'lucide-react'

/**
 * @version 1
 * @description Componente de búsqueda de ayuda
 * @param placeholder Texto de placeholder
 * @param onSelect Función de callback para seleccionar un resultado
 * @param inSidebar Indica si se encuentra en el sidebar
 */

export default function HelpSearchInput({
  placeholder = 'Buscar...',
  onSelect,
  inSidebar = false,
}: {
  placeholder?: string
  onSelect?: (result: {id: string; type: string}) => void
  inSidebar?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Inicializa la consulta desde la URL si está en la página de ayuda
  useEffect(() => {
    if (pathname?.startsWith('/guide') && !inSidebar) {
      const urlQuery = searchParams.get('q')
      if (urlQuery) {
        setQuery(urlQuery)
        setIsSearching(true)
      }
    }
  }, [pathname, searchParams, inSidebar])

  // Función de búsqueda debounceada
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length > 1) {
        const searchResults = searchContent(searchQuery)
        setResults(searchResults)
      } else {
        setResults([])
      }
    }, 300),
    []
  )

  // Actualiza los resultados de la búsqueda cuando cambia la consulta
  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  // Maneja el cambio de la consulta de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (!inSidebar && pathname?.startsWith('/guide')) {
      // Actualiza la URL con la consulta de búsqueda
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      const newUrl = `${pathname}?${params.toString()}`
      router.push(newUrl)
    }
  }

  // Maneja el envío del formulario de búsqueda
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    if (inSidebar) {
      // El foco se queda en el input en el sidebar
      inputRef.current?.focus()
    }
  }

  // Maneja la selección de un resultado
  const handleResultClick = (result: SearchResult) => {
    if (onSelect) {
      onSelect(result)
    } else if (pathname?.startsWith('/guide')) {
      // Navega a la página del resultado
      let targetPath = ''

      if (result.type === 'topic') {
        targetPath = `/guide/${result.id}`
      } else if (result.type === 'category') {
        targetPath = `/guide/category/${result.id}`
      } else if (result.type === 'section') {
        targetPath = `/guide/section/${result.id}`
      }

      if (targetPath) {
        router.push(targetPath)
      }
    } else {
      // Establece el parámetro de ayuda en la URL
      const params = new URLSearchParams(searchParams.toString())
      const helpId =
        result.type === 'section'
          ? `section-${result.id}`
          : result.type === 'category'
            ? `category-${result.id}`
            : result.id

      params.set('help', helpId)
      router.push(`${pathname}?${params.toString()}`)
    }

    // Limpia la búsqueda si está en el sidebar
    if (inSidebar) {
      setQuery('')
      setResults([])
    }
  }

  // Limpia la búsqueda
  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsSearching(false)

    if (!inSidebar && pathname?.startsWith('/guide')) {
      // Elimina la consulta de búsqueda de la URL
      const params = new URLSearchParams(searchParams.toString())
      params.delete('q')
      router.push(`${pathname}?${params.toString()}`)
    }

    inputRef.current?.focus()
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearchSubmit}>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            className="pl-10 pr-10"
            value={query}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
        </div>
      </form>

      {/* Dropdown de resultados para el sidebar */}
      {inSidebar && query.trim().length > 1 && isFocused && (
        <Card className="absolute z-50 mt-1 max-w-[90%] max-h-[70vh] overflow-hidden">
          <CardContent className="p-0">
            <ScrollArea className="max-h-[70vh]">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      className="w-full text-left px-4 py-2 hover:bg-accent flex flex-col"
                      onClick={() => handleResultClick(result)}
                    >
                      <span className="font-medium">{result.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {result.description}
                      </span>
                      {result.path.length > 1 && (
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          {result.path.map((item, index) => (
                            <span
                              key={item.id}
                              className="flex items-center"
                            >
                              {index > 0 && (
                                <ChevronRight className="h-3 w-3 mx-1" />
                              )}
                              {item.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No se encontraron resultados para &quot;{query}&quot;
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Resultados para la página de ayuda */}
      {!inSidebar && isSearching && query.trim().length > 1 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Resultados para &quot;{query}&quot;{' '}
              <span className="text-muted-foreground">({results.length})</span>
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={clearSearch}
            >
              Limpiar búsqueda
            </Button>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((result) => (
                <Card
                  key={`${result.type}-${result.id}`}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <CardContent className="p-4">
                    <div className="mb-1 text-xs text-muted-foreground">
                      {result.type === 'topic'
                        ? 'Tema'
                        : result.type === 'category'
                          ? 'Categoría'
                          : 'Sección'}
                    </div>
                    <h3 className="text-lg font-medium mb-1">{result.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.description}
                    </p>

                    {result.path.length > 1 && (
                      <div className="flex items-center text-xs text-muted-foreground mt-2 border-t pt-2">
                        {result.path.map((item, index) => (
                          <span
                            key={item.id}
                            className="flex items-center"
                          >
                            {index > 0 && (
                              <ChevronRight className="h-3 w-3 mx-1" />
                            )}
                            {item.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border rounded-lg">
              <p className="text-muted-foreground mb-4">
                No se encontraron resultados para &quot;{query}&quot;
              </p>
              <Button
                variant="outline"
                onClick={clearSearch}
              >
                Volver al contenido completo
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
