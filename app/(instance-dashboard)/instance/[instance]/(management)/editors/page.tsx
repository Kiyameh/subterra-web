import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import PageContainer from '@/components/theming/page-container'
import {FaUserEdit} from 'react-icons/fa'

export default function InstanceEditorsPage() {
  return (
    <PageContainer>
      <BasicCard
        defaultWidth="xl"
        cardHeader={
          <CardTitle
            title="Editores del grupo"
            icon={<FaUserEdit />}
          />
        }
      >
        <h4>Tabla de Editores</h4>
      </BasicCard>
    </PageContainer>
  )
}
