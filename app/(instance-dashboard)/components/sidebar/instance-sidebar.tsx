import * as React from 'react'

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

// Icons:
import {PiCircleBold} from 'react-icons/pi'
import {TbCircles} from 'react-icons/tb'
import {MdOutlineExplore} from 'react-icons/md'
import {auth} from '@/auth'
import {Session} from 'next-auth'

const NAV_ITEMS = [
  {
    title: 'Cavidades',
    icon: <PiCircleBold />,
    isActive: true,
    items: [
      {
        title: 'Listado completo',
        href: 'list/caves',
      },
      {
        title: 'Crear cavidad',
        href: 'create/cave',
      },
      {
        title: 'Buscar cavidad',
        href: 'details',
      },
    ],
  },
  {
    title: 'Sistemas',
    icon: <TbCircles />,
    items: [
      {
        title: 'Listado completo',
        href: 'list/systems',
      },
      {
        title: 'Crear sistema',
        href: 'create/system',
      },
      {
        title: 'Buscar sistema',
        href: 'details',
      },
    ],
  },
  {
    title: 'Exploraciones',
    icon: <MdOutlineExplore />,
    items: [
      {
        title: 'Ultimas exploraciones',
        href: 'list/explorations',
      },
      {
        title: 'Añadir exploración',
        href: 'create/exploration',
      },
      {
        title: 'Buscar exploración',
        href: 'details',
      },
    ],
  },
]

// TODO: Añadir fetch de favoritos reales:
const FAKE_FAVOURITES = [
  {
    name: 'Cueva de los deseos',
    href: '#',
  },
  {
    name: 'Sima Mapache',
    href: '#',
  },
  {
    name: 'Torca de las saxifragas',
    href: '#',
  },
]

export async function InstanceSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // Obtener las intancias de la base de datos:
  const instances = (await getAllInstances()).content as Instance[]

  // Obtener el usuario actual
  const session: Session | null = await auth()
  const user = session?.user
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
