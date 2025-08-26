import Link from 'next/link'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'
import {helpCategories, helpTopics} from '@/documentation/content/help-content'
import HelpSearch from '@/documentation/components/help-search-input'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Atoms/card'
import {ChevronRight, Home} from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CategoryPage({params}: CategoryPageProps) {
  const {id} = await params
  const category = helpCategories[id]

  // If the category doesn't exist, show a 404 page
  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link
            href="/guide"
            className="text-muted-foreground hover:text-foreground flex items-center"
          >
            <Home className="h-4 w-4 mr-1" />
            Índice de Guía
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span>{category.title}</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
          <p className="text-muted-foreground mb-6">{category.description}</p>

          {/* Search component */}
          <div className="mb-8">
            <Suspense
              fallback={
                <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              }
            >
              <HelpSearch placeholder={`Buscar en ${category.title}...`} />
            </Suspense>
          </div>
        </div>

        <div className="prose max-w-none dark:prose-invert mb-8">
          {category.content}
        </div>

        {/* Topics within this category */}
        <h2 className="text-2xl font-bold mb-4">Temas</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {category.topics.map((topicId) => {
            const topic = helpTopics[topicId]
            if (!topic) return null

            return (
              <Card
                key={topic.id}
                className="hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/guide/${topic.id}`}
                  className="block h-full"
                >
                  <CardHeader>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
