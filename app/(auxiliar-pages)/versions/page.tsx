import {versions} from '@/database/data/versions'
import {features} from '@/database/data/features'

import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import PageContainer from '@/components/Organisms/theme/page-container'
import VersionsBoard from '@/components/Templates/versions-board/versions-board'

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
