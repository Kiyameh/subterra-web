import type React from 'react'

// Define la estructura de un tema de ayuda
export interface HelpTopic {
  id: string
  title: string
  description: string
  content: React.ReactNode
  parentId?: string
  relatedTopics?: Array<{
    id: string
    title: string
  }>
}

// Define la estructura de una categoría
export interface HelpCategory {
  id: string
  title: string
  description: string
  content: React.ReactNode
  topics: string[] // IDs de temas en esta categoría
}

// Define la estructura de un resultado de búsqueda
export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'topic' | 'category'
  path: {title: string; id: string}[]
}
