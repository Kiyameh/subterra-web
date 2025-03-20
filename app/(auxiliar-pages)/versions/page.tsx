import PageContainer from '@/components/Organisms/theme/page-container'
import VersionsBoard from '@/components/Templates/versions-board/versions-board'
import {versions} from '@/components/Templates/versions-board/versions'
import {features} from '@/components/Templates/versions-board/features'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'

export default function VersionsPage() {
  return (
    <PageContainer>
      <CardWithHeader defaultWidth="xxl">
        <VersionsBoard
          versions={versions}
          features={features}
        />
      </CardWithHeader>
    </PageContainer>
  )
}
