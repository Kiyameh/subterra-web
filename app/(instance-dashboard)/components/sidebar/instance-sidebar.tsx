import * as React from 'react'
import {auth} from '@/app/(authentication)/auth'

// Componentes:
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {SidebarLoginButton} from './sidebar-login-button'
import SidebarFavNavigation from './sidebar-fav-navigation'
import SidebarUserNavigation from './sidebar-user-navigation'
import SidebarMainNavigation from './sidebar-main-navigation'
import SidebarInstanceNavigation from './sidebar-instance-navigation'

// Database:
import getAllInstances from '@/database/actions/data/getAllInstances'
import {Instance} from '@/database/models/Instance.model'
import {User} from '@/database/models/User.model'

// Icons:
import {PiCircleBold} from 'react-icons/pi'
import {TbCircles} from 'react-icons/tb'
import {CgFileDocument} from 'react-icons/cg'

const NAV_ITEMS = [
  {
    title: 'Cavidades',
    url: '#',
    icon: <PiCircleBold />,
    isActive: true,
    items: [
      {
        title: 'Listado completo',
        url: '#',
      },
      {
        title: 'Crear cavidad',
        url: '#',
      },
      {
        title: 'Buscar cavidad',
        url: '#',
      },
    ],
  },
  {
    title: 'Sistemas',
    url: '#',
    icon: <TbCircles />,
    items: [
      {
        title: 'Listado completo',
        url: '#',
      },
      {
        title: 'Crear sistema',
        url: '#',
      },
      {
        title: 'Buscar sistema',
        url: '#',
      },
    ],
  },
  {
    title: 'Exploraciones',
    url: '#',
    icon: <CgFileDocument />,
    items: [
      {
        title: 'Ultimas exploraciones',
        url: '#',
      },
      {
        title: 'Añadir exploración',
        url: '#',
      },
      {
        title: 'Buscar exploración',
        url: '#',
      },
    ],
  },
]

// TODO: Añadir fetch de favoritos reales:
const FAKE_FAVOURITES = [
  {
    name: 'Cueva de los deseos',
    url: '#',
  },
  {
    name: 'Sima Mapache',
    url: '#',
  },
  {
    name: 'Torca de las saxifragas',
    url: '#',
  },
]

export async function InstanceSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // Obtener las intancias de la base de datos:
  const instances = (await getAllInstances()).content as Instance[]

  // Obtener el usuario actual
  const session = await auth()
  const user = session?.user as User

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarInstanceNavigation instances={instances} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainNavigation items={NAV_ITEMS} />
        <SidebarFavNavigation favs={FAKE_FAVOURITES} />
      </SidebarContent>
      <SidebarFooter>
        {user ? <SidebarUserNavigation user={user} /> : <SidebarLoginButton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
