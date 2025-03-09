import PageContainer from '@/components/theming/page-container'
import VersionsBoard from '@/components/versioning/versions-board'
import {versions} from '@/components/versioning/versions'
import {features} from '@/components/versioning/features'
import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'

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
