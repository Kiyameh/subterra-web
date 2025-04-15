import {FaUser, FaUserFriends, FaRegCircle, FaUserLock} from 'react-icons/fa'
import {FiBox} from 'react-icons/fi'
import {GrMap, GrDocumentDownload} from 'react-icons/gr'
import {LuSheet, LuBookMarked, LuMap, LuImage} from 'react-icons/lu'
import {
  MdOutlineExplore,
  MdSearch,
  MdFilterList,
  MdCompare,
  MdOutlineStarOutline,
} from 'react-icons/md'
import {RiDoorLockBoxLine} from 'react-icons/ri'
import {TbCircles} from 'react-icons/tb'
import {PiNotebook} from 'react-icons/pi'
import {History} from 'lucide-react'

export interface Feature {
  name: string
  description: string
  icon: JSX.Element
  image_src: string | null
  docs: string | null
  url: string | null
  version: string
}

export const features: Feature[] = [
  {
    name: 'Mapa localización',
    description:
      'Visualiza toda la información de tu instancia en un mapa interactivo. Accede a cada elemento desde su Waypoint.',
    icon: <GrMap />,
    image_src: null,
    docs: null,
    url: null,
    version: '',
  },
  {
    name: 'Comparación',
    description:
      'Compara dos cavidades o sistemas y localiza facilmente datos duplicados',
    icon: <MdCompare />,
    image_src: null,
    docs: null,
    url: null,
    version: '',
  },
  {
    name: 'Publicaciones',
    description:
      'Añade publicaciones a tu grupo relacionadas con una o mas cavidades o sistemas.',
    icon: <PiNotebook />,
    image_src: null,
    docs: null,
    url: null,
    version: '',
  },
  {
    name: 'Ficha de cavidad',
    description:
      'Descarga o imprime una ficha de cavidad con toda la información relevante.',
    icon: <GrDocumentDownload />,
    image_src: null,
    docs: null,
    url: null,
    version: '',
  },
  {
    name: 'Fichas de instalación',
    description:
      'Añade fichas de instalación a tus cavidades y visualizalas en forma de tabla.',
    icon: <LuSheet />,
    image_src: null,
    docs: null,
    url: null,
    version: '',
  },
  {
    name: 'Añade favoritos',
    description: 'Guarda tus cavidades, sistemas o exploraciones favoritas.',
    icon: <MdOutlineStarOutline />,
    image_src: null,
    docs: null,
    url: null,
    version: '',
  },
  {
    name: 'Guía de usuario',
    description:
      'Consulta facilmente el funcionamiento de la plataforma en la nueva Guía de uso. Accede a la ayuda en cualquier lugar de la plataforma.',
    icon: <LuBookMarked />,
    image_src: null,
    docs: null,
    url: '/guide',
    version: '1.4.0',
  },
  {
    name: 'Historial de versiones',
    description:
      'Cada cambio en un documento queda registrado en el historial de versiones. Comprueba facilmente los datos anteriores.',
    icon: <History />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.4.0',
  },
  {
    name: 'Instancias privadas',
    description:
      'Crea una instancia privada para tu grupo. Estas instancias solo las verán los miembros.',
    icon: <RiDoorLockBoxLine />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.3.0',
  },
  {
    name: 'Añade topografías',
    description:
      'Incluye las topografías de tus cavidades y sistemas. Sube tus archivos de imagen o Pdf e incluye información relevante de los mismos.',
    icon: <LuMap />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.3.0',
  },
  {
    name: 'Añade imágenes',
    description:
      'Añade imágenes a tus cavidades, sistemas o exploraciones. Incluye información sobre las imágenes para facilitar su interpretación.',
    icon: <LuImage />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.3.0',
  },
  {
    name: 'Filtrado',
    description: 'Filtra la tabla de resultados según diferentes criterios',
    icon: <MdFilterList />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.2.0',
  },
  {
    name: 'Busqueda',
    description:
      'Utiliza el buscador para encontrar los diferentes documentos en tu instancia.',
    icon: <MdSearch />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.2.0',
  },
  {
    name: 'Exploraciones',
    description:
      'Registra las exploraciones de tu grupo en vuestra instancia. Relaciónalas a diferentes cavidades o grupos.',
    icon: <MdOutlineExplore />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.2.0',
  },
  {
    name: 'Sistemas',
    description:
      'Relaciona varias cavidades en un sistema o complejo. Añade información adicional al sistema.',
    icon: <TbCircles />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.1.0',
  },
  {
    name: 'Sistema de roles',
    description:
      'Asigna roles a tus compañeros de grupo y trabajad justos en la gestión del grupo o de la instancia.',
    icon: <FaUserLock />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.1.0',
  },
  {
    name: 'Cavidades',
    description:
      'Almacena datos de cavidades en tu instancia. Guarda información general, de localización de la cavidad y científica.',
    icon: <FaRegCircle />,
    image_src: null,
    docs: null,
    url: '/instance',
    version: '1.0.0',
  },
  {
    name: 'Instancias',
    description:
      'Solicita una instancia para almacenar datos espeleológicos de un territorio concreto.',
    icon: <FiBox />,
    image_src: null,
    docs: null,
    url: null,
    version: '1.0.0',
  },
  {
    name: 'Grupos',
    description:
      'Crea tu grupo y administra la información pública que se mostrará.',
    icon: <FaUserFriends />,
    image_src: null,
    docs: null,
    url: '/create-group',
    version: '1.0.0',
  },
  {
    name: 'Cuentas de usuario',
    description:
      'Crea tu cuenta de usuario y administra tu perfil. O puedes usar tu cuenta de Google y exportar tur datos fácilmente.',
    icon: <FaUser />,
    image_src: null,
    docs: null,
    url: '/auth/register',
    version: '1.0.0',
  },
]
