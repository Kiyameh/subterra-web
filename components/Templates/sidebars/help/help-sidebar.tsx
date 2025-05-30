'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'

import {useRouter} from 'next/navigation'
import {useSearchParams} from 'next/navigation'
import {usePathname} from 'next/navigation'

import HelpSearchInput from '@/documentation/components/help-search-input'

import {
  helpTopics,
  helpCategories,
  getTopicPath,
} from '@/documentation/content/help-content'
import {
  SidebarHeader,
  SidebarContent,
  SidebarRail,
  useDualSidebar,
} from '@/components/Atoms/dual-sidebar'
import {Button} from '@/components/Atoms/button'
import {ScrollArea} from '@/components/Atoms/scroll-area'

import {BookOpen, CornerDownRight, Home, X} from 'lucide-react'
import Divider from '@/components/Molecules/boxes/divider'

export default function HelpSidebar() {
  const {setRightOpen} = useDualSidebar()
  const searchParams = useSearchParams()
  const helpParam = searchParams.get('help')
  const router = useRouter()
  const pathname = usePathname()

  function clearHelpParams() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('help')
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname
    router.push(newUrl)
  }

  // Determine what content to show based on the help parameter
  const [content, setContent] = useState<{
    title: string
    description: string
    content: React.ReactNode
    id: string
    type: 'topic' | 'category'
    path: {title: string; id: string}[]
  } | null>(null)

  // Parse the help parameter to determine what to show
  useEffect(() => {
    // Check if it's a category
    if (helpParam?.startsWith('category-')) {
      const categoryId = helpParam.replace('category-', '')
      const category = helpCategories[categoryId]
      if (category) {
        const path = [{title: category.title, id: `category-${category.id}`}]
        setContent({
          title: category.title,
          description: category.description,
          content: category.content,
          id: category.id,
          type: 'category',
          path,
        })
        return
      }
    }

    // Otherwise, it's a topic
    const topic = helpTopics[helpParam ?? 'index']
    if (topic) {
      setContent({
        title: topic.title,
        description: topic.description,
        content: topic.content,
        id: topic.id,
        type: 'topic',
        path: getTopicPath(topic.id),
      })
    } else {
      // Fallback to default
      const defaultTopic = helpTopics.default
      setContent({
        title: defaultTopic.title,
        description: defaultTopic.description,
        content: defaultTopic.content,
        id: defaultTopic.id,
        type: 'topic',
        path: [{title: defaultTopic.title, id: defaultTopic.id}],
      })
    }
  }, [helpParam, setRightOpen, setContent])

  // Navigate to a related topic
  const navigateToTopic = (topicId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('help', topicId)
    router.push(`${pathname}?${params.toString()}`)
  }

  // Handle search result selection
  const handleSearchSelect = (result: {id: string; type: string}) => {
    const helpId =
      result.type === 'category' ? `category-${result.id}` : result.id

    navigateToTopic(helpId)
  }

  if (!content) return null

  return (
    <>
      <SidebarHeader>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-semibold">{content.title}</h2>
              <p className="text-sm text-muted-foreground">
                {content.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label={`Ver ${content.title} en la guía`}
              >
                <Link
                  href={`/guide/${content.type === 'topic' ? content.id : ''}`}
                >
                  <BookOpen className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearHelpParams}
                aria-label="Cerrar ayuda"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="p-4 border-b">
            <HelpSearchInput
              onSelect={handleSearchSelect}
              placeholder="Buscar ayuda..."
              inSidebar={true}
            />
          </div>

          <Divider />

          {/* Breadcrumb navigation */}
          {content.path.length > 1 && (
            <div className="px-4 py-2 flex items-start flex-col whitespace-nowrap text-sm">
              <div className="flex items-center">
                <Home className="h-4 w-4 mx-1 text-muted-foreground" />
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set('help', 'index')
                    router.push(`${pathname}?${params.toString()}`)
                  }}
                >
                  Inicio
                </Button>
              </div>
              {content.path.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center"
                >
                  {index > 0 && <div className="mx-2" />}
                  <CornerDownRight className="h-4 w-4 mx-1 text-muted-foreground" />
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm"
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString()
                      )
                      params.set('help', item.id)
                      router.push(`${pathname}?${params.toString()}`)
                    }}
                  >
                    {item.title}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1 px-4">
          <div className="prose max-w-none dark:prose-invert bg-muted rounded-lg px-2 py-4 text-sm">
            {content.content}
          </div>

          {/* Show topics if viewing a category */}
          {content.type === 'category' && (
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Temas</h4>
              <ul className="space-y-2">
                {helpCategories[content.id]?.topics.map((topicId) => {
                  const topic = helpTopics[topicId]
                  return topic ? (
                    <li key={topic.id}>
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => navigateToTopic(topic.id)}
                      >
                        {topic.title}
                      </Button>
                    </li>
                  ) : null
                })}
              </ul>
            </div>
          )}

          {/* Related topics for all content types */}
          {content.type === 'topic' &&
            helpTopics[content.id]?.relatedTopics?.[0] && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Temas Relacionados</h4>
                <div className="flex flex-wrap gap-2">
                  {helpTopics[content.id]?.relatedTopics?.map(
                    (relatedTopic) => (
                      <Button
                        key={relatedTopic.id}
                        variant="outline"
                        size="sm"
                        onClick={() => navigateToTopic(relatedTopic.id)}
                      >
                        {relatedTopic.title}
                      </Button>
                    )
                  )}
                </div>
              </div>
            )}
        </ScrollArea>
      </SidebarContent>
      <SidebarRail side="right" />
    </>
  )
}
