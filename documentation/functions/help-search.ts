import {helpTopics, helpCategories} from '@/documentation/content/help-content'
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

  return results
}

/**
 * Obtiene el camino para la búsqueda
 * @param id ID del tema o categoría
 * @param type Tipo de resultado ('topic' o 'category')
 * @returns Array de objetos con título y ID
 */
function getPathForSearch(
  id: string,
  type: 'topic' | 'category'
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
      }
    }
    return path
  } else if (type === 'category') {
    const category = helpCategories[id]
    if (!category) return []

    return [{title: category.title, id: `category-${category.id}`}]
  }
  return []
}
