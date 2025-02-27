export default interface Topography {
  author?: string
  date?: Date
  description?: string
  representations?: Representation[]
}

interface Representation {
  type?: 'plan' | 'proyected' | 'developed' | '3D' | 'other'
  file_src?: string
}
