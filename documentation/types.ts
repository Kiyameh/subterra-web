import type React from 'react'

// Define la estructura de un tema de ayuda
export interface HelpTopic {
  id: string
  title: string
  description: string
  content: React.ReactNode
  parentId?: string
  sectionId?: string
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
  parentId?: string
  topics: string[] // IDs de temas en esta categoría
}

// Define la estructura de una sección
export interface HelpSection {
  id: string
  title: string
  description: string
  content: React.ReactNode
  categories: string[] // IDs de categorías en esta sección
}

// Define la estructura de un resultado de búsqueda
export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'topic' | 'category' | 'section'
  path: {title: string; id: string}[]
}
