import Link from 'next/link'
import {Suspense} from 'react'
import {helpCategories, helpTopics} from '@/documentation/content/help-content'
import HelpSearch from '@/documentation/components/help-search-input'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Atoms/card'

export default function GuideIndexPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Guía de uso</h1>
          <p className="text-muted-foreground mb-6">
            Explora nuestros temas de ayuda completos para aprender más sobre
            nuestra aplicación.
          </p>

          {/* Search component */}
          <div className="mb-8">
            <Suspense
              fallback={
                <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              }
            >
              <HelpSearch placeholder="Buscar en toda la documentación..." />
            </Suspense>
          </div>
        </div>

        {/* Categorías */}
        {Object.values(helpCategories).map((category) => (
          <div
            key={category.id}
            className="mb-12"
          >
            <Link href={`/guide/category/${category.id}`}>
              <h2 className="text-2xl font-bold mb-4 hover:text-primary">
                {category.title}
              </h2>
            </Link>
            <p className="mb-6 text-muted-foreground">{category.description}</p>

            {/* Topics within this category */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                      <CardHeader className="pb-2">
                        <CardTitle>{topic.title}</CardTitle>
                        <CardDescription>{topic.description}</CardDescription>
                      </CardHeader>
                    </Link>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
