import BasicCard from '@/components/_Atoms/boxes/basic-card'
import CardTitle from '@/components/_Atoms/boxes/card-title'
import PageContainer from '@/components/theming/page-container'
import {MdModeEdit} from 'react-icons/md'

export default function InstanceAdminPage() {
  return (
    <PageContainer>
      <BasicCard
        defaultWidth="xl"
        cardHeader={
          <CardTitle
            title="Editar información de la instancia"
            icon={<MdModeEdit />}
          />
        }
      >
        <h4>Formulario de edición</h4>
      </BasicCard>
    </PageContainer>
  )
}
