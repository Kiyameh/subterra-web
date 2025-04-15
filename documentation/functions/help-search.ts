import {
  helpTopics,
  helpCategories,
  helpSections,
} from '@/documentation/content/help-content'
import {SearchResult} from '@/documentation/types'

export function searchContent(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase()
  const results: SearchResult[] = []

  // Search topics
  for (const topicId in helpTopics) {
    const topic = helpTopics[topicId]
    if (
      topic.title.toLowerCase().includes(searchTerm) ||
      topic.description.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        type: 'topic',
        path: getPathForSearch(topic.id, 'topic'),
      })
    }
  }

  // Buscar categorías
  for (const categoryId in helpCategories) {
    const category = helpCategories[categoryId]
    if (
      category.title.toLowerCase().includes(searchTerm) ||
      category.description.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: category.id,
        title: category.title,
        description: category.description,
        type: 'category',
        path: getPathForSearch(category.id, 'category'),
      })
    }
  }

  // Buscar secciones
  for (const sectionId in helpSections) {
    const section = helpSections[sectionId]
    if (
      section.title.toLowerCase().includes(searchTerm) ||
      section.description.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id: section.id,
        title: section.title,
        description: section.description,
        type: 'section',
        path: getPathForSearch(section.id, 'section'),
      })
    }
  }

  return results
}

/**
 * Obtiene el camino para la búsqueda
 * @param id ID del tema, categoría o sección
 * @param type Tipo de resultado ('topic', 'category' o 'section')
 * @returns Array de objetos con título y ID
 */
function getPathForSearch(
  id: string,
  type: 'topic' | 'category' | 'section'
): {title: string; id: string}[] {
  if (type === 'topic') {
    const topic = helpTopics[id]
    if (!topic) return []

    const path: {title: string; id: string}[] = [
      {title: topic.title, id: topic.id},
    ]

    if (topic.parentId) {
      const category = helpCategories[topic.parentId]
      if (category) {
        path.unshift({title: category.title, id: `category-${category.id}`})

        if (category.parentId) {
          const section = helpSections[category.parentId]
          if (section) {
            path.unshift({title: section.title, id: `section-${section.id}`})
          }
        }
      }
    }
    return path
  } else if (type === 'category') {
    const category = helpCategories[id]
    if (!category) return []

    const path: {title: string; id: string}[] = [
      {title: category.title, id: `category-${category.id}`},
    ]

    if (category.parentId) {
      const section = helpSections[category.parentId]
      if (section) {
        path.unshift({title: section.title, id: `section-${section.id}`})
      }
    }
    return path
  } else if (type === 'section') {
    const section = helpSections[id]
    if (!section) return []
    return [{title: section.title, id: `section-${section.id}`}]
  }
  return []
}
