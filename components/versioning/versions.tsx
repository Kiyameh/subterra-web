import type {ReactNode} from 'react'
import {User, Users, Box, File} from 'lucide-react'

export interface Version {
  name: string
  version: string
  resume: string
  date: Date
  updates: {
    title: string
    description: string
    icon?: ReactNode
    learnMoreUrl?: string
  }[]
}

// Datos de versiones
export const versions: Version[] = [
  {
    name: 'Piloto',
    version: '1.1.0',
    resume: 'Versión de lanzamiento inicial de la aplicación Subterra',
    date: new Date('2024-12-22'),
    updates: [
      {
        title: 'Cuenta de usuario',
        description:
          'Crea tu cuenta de usuario y solicita el acceso a un grupo. Personaliza tu experiencia y tu perfil',
        icon: <User className="h-8 w-8 text-primary" />,
        learnMoreUrl: 'https://www.subterra.app/docs/user-account',
      },
      {
        title: 'Grupos y Colaboración',
        description:
          'Crea grupos y colabora con otros usuarios en proyectos compartidos. Administra permisos y roles de usuario',
        icon: <Users className="h-8 w-8 text-primary" />,
        learnMoreUrl: 'https://www.subterra.app/docs/groups',
      },
      {
        title: 'Instancias',
        description:
          'Crea instancias de bases de datos de tus zonas de exploración. ',
        icon: <Box className="h-8 w-8 text-primary" />,
        learnMoreUrl: 'https://www.subterra.app/docs/instances',
      },
      {
        title: 'Cuevas, sistemas y exploraciones',
        description:
          'Crea y administra cuevas, sistemas y exploraciones en tu base de datos. ',
        icon: <File className="h-8 w-8 text-primary" />,
        learnMoreUrl: 'https://www.subterra.app/docs/documents',
      },
    ],
  },
]
