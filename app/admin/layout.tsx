import {auth} from '@/auth'
import PageContainer from '@/components/theming/page-container'
import NotFoundCard from '@/components/_Molecules/cards/404-not-found'
import {PlatformObject} from '@/database/models/Platform.model'
import {getOnePlatform} from '@/database/services/platform.services'

export default async function Layout({children}: {children: React.ReactNode}) {
  const subterra = (await getOnePlatform('subterra'))
    .content as PlatformObject | null

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

  return <>{children}</>
}
