import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import PageContainer from '@/components/theming/page-container'

export default function NextPage() {
  return (
    <PageContainer>
      <CardWithHeader cardSubHeader={'Lo que está por venir'}>
        *Proximamente*
      </CardWithHeader>
    </PageContainer>
  )
}
