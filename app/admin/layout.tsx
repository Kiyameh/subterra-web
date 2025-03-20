import {auth} from '@/auth'
import PageContainer from '@/components/Organisms/theme/page-container'
import NotFoundCard from '@/components/Organisms/containers/404-not-found'
import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/Platform/getOnePlatform'
import StaffNavigation from '@/components/Templates/staff-dashboard/staff-nav'

export default async function Layout({children}: {children: React.ReactNode}) {
  // Obtener la plataforma
  const subterra = (await getOnePlatform()).content as
    | PlatformObject
    | undefined

  const session = await auth()
  const userId = session?.user._id

  let isStaff = false
  if (subterra && userId) {
    isStaff = subterra.staff.includes(userId)
  }

  if (!isStaff) {
    return (
      <PageContainer>
        <NotFoundCard />
      </PageContainer>
    )
  }

  return (
    <PageContainer className="justify-start">
      <StaffNavigation />
      {children}
    </PageContainer>
  )
}
