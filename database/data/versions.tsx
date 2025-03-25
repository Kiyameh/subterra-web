export interface Version {
  name: string
  version: string
  resume?: string
  date: Date
}

// Datos de versiones
export const versions: Version[] = [
  {
    name: 'Ormazarreta',
    version: '1.3.0',
    date: new Date('2024-03-11'),
  },
  {
    name: 'Coventosa',
    version: '1.2.0',
    date: new Date('2024-02-02'),
  },
  {
    name: 'Gandara',
    version: '1.1.0',
    date: new Date('2024-11-17'),
  },
  {
    name: 'Piloto',
    version: '1.0.0',
    resume: 'Versión de lanzamiento inicial de la aplicación Subterra',
    date: new Date('2024-10-22'),
  },
]
