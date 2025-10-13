import {type Topography} from '@/database/types/Topography'
import {Badge} from '@/components/Atoms/badge'

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
    case 'plan&proyected':
      text = 'Planta y proyectado'
      break
    case 'developed':
      text = 'Alzado desarrollado'
      break
    case 'plan&developed':
      text = 'Planta y alzado desarrollado'
      break
    case '3D':
      text = '3D'
      break
  }

  return <Badge variant="secondary">{text}</Badge>
}
