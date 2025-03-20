import {Badge} from '@/components/Atoms/badge'
import {Topography} from '@/database/types/Topography'

export default function TopographyTypeBadge({
  type,
}: {
  type: Topography['type']
}) {
  let text = 'otra'
  switch (type) {
    case 'plan':
      text = 'Planta'
      break
    case 'proyected':
      text = 'Alzado proyectado'
      break
    case 'developed':
      text = 'Alzado desarrollado'
      break
    case '3D':
      text = '3D'
      break
  }

  return <Badge variant="secondary">{text}</Badge>
}
