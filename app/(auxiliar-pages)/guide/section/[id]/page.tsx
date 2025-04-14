import Link from 'next/link'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'
import {
  helpSections,
  helpCategories,
} from '@/documentation/content/help-content'
import HelpSearch from '@/documentation/components/help-search-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Atoms/card'
import {ChevronRight, Home} from 'lucide-react'

interface SectionPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SectionPage({params}: SectionPageProps) {
  const {id} = await params
  const section = helpSections[id]

  // If the section doesn't exist, show a 404 page
  if (!section) {
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
          <span>{section.title}</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{section.title}</h1>
          <p className="text-muted-foreground mb-6">{section.description}</p>

          {/* Search component */}
          <div className="mb-8">
            <Suspense
              fallback={
                <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              }
            >
              <HelpSearch placeholder={`Buscar en ${section.title}...`} />
            </Suspense>
          </div>
        </div>

        <div className="prose max-w-none dark:prose-invert mb-8">
          {section.content}
        </div>

        {/* Categories within this section */}
        <h2 className="text-2xl font-bold mb-4">Categorías</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {section.categories.map((categoryId) => {
            const category = helpCategories[categoryId]
            if (!category) return null

            return (
              <Card
                key={category.id}
                className="hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/guide/category/${category.id}`}
                  className="block h-full"
                >
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {category.topics.length}{' '}
                      {category.topics.length === 1 ? 'tema' : 'temas'}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
