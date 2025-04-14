import React from 'react'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'
import {
  helpTopics,
  helpCategories,
  getTopicPath,
} from '@/documentation/content/help-content'
import HelpSearch from '@/documentation/components/help-search-input'
import {ChevronRight, ChevronLeft, Home} from 'lucide-react'
import {Button} from '@/components/Atoms/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/Atoms/card'

interface TopicPageProps {
  params: Promise<{
    topic: string
  }>
}

export default async function TopicPage({params}: TopicPageProps) {
  const {topic: topicId} = await params
  const topic = helpTopics[topicId]

  // If the topic doesn't exist, show a 404 page
  if (!topic) {
    notFound()
  }

  // Get the full path for breadcrumbs
  const path = getTopicPath(topicId)

  // Get the parent category and section
  const category = topic.parentId ? helpCategories[topic.parentId] : null

  // Get all topics in the same category to determine previous and next topics
  const siblingTopics = category?.topics || []
  const currentIndex = siblingTopics.indexOf(topicId)
  const prevTopic =
    currentIndex > 0 ? helpTopics[siblingTopics[currentIndex - 1]] : null
  const nextTopic =
    currentIndex < siblingTopics.length - 1
      ? helpTopics[siblingTopics[currentIndex + 1]]
      : null

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link
            href="/guide"
            className="text-muted-foreground hover:text-foreground flex items-center"
          >
            <Home className="h-4 w-4 mr-1" />
            Índice de Guía
          </Link>

          {path.slice(0, -1).map((item) => {
            // Extract the actual ID from the prefixed ID (e.g., "section-main" -> "main")
            const actualId = item.id.includes('-')
              ? item.id.split('-')[1]
              : item.id
            const linkPath = item.id.startsWith('section-')
              ? `/guide/section/${actualId}`
              : item.id.startsWith('category-')
                ? `/guide/category/${actualId}`
                : `/guide/${actualId}`

            return (
              <React.Fragment key={item.id}>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link
                  href={linkPath}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
              </React.Fragment>
            )
          })}

          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span>{topic.title}</span>
        </div>

        {/* Search component */}
        <div className="mb-6">
          <Suspense
            fallback={
              <div className="h-10 bg-muted animate-pulse rounded-md"></div>
            }
          >
            <HelpSearch placeholder="Buscar en la documentación..." />
          </Suspense>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{topic.title}</CardTitle>
            <p className="text-muted-foreground">{topic.description}</p>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              {topic.content}
            </div>

            {/* Related topics */}
            {topic.relatedTopics && topic.relatedTopics.length > 0 && (
              <div className="mt-8 pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Temas Relacionados</h3>
                <div className="flex flex-wrap gap-2">
                  {topic.relatedTopics.map((relatedTopic) => (
                    <Button
                      key={relatedTopic.id}
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href={`/guide/${relatedTopic.id}`}>
                        {relatedTopic.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Previous/Next navigation within the same category */}
            <div className="mt-8 pt-4 border-t flex justify-between">
              {prevTopic ? (
                <Button
                  variant="ghost"
                  asChild
                >
                  <Link
                    href={`/guide/${prevTopic.id}`}
                    className="flex items-center"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {prevTopic.title}
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}

              {nextTopic ? (
                <Button
                  variant="ghost"
                  asChild
                >
                  <Link
                    href={`/guide/${nextTopic.id}`}
                    className="flex items-center"
                  >
                    {nextTopic.title}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
