import {TbError404} from 'react-icons/tb'
import BackButton from '../navigation/back-button'
import LinkButton from '../navigation/link-button'
import catImage from '@/public/404.webp'
import CustomCard from '../containing/custom-card'

/** Card personalizada para not-found */

export default function NotFoundCard() {
  return (
    <CustomCard
      image={catImage}
      title={'Aquí no hay nada'}
      icon={<TbError404 />}
      content={
        'No encontramos lo que buscas. ¿Estás seguro de que debería estar aquí?'
      }
      action1={<BackButton />}
      action2={
        <LinkButton
          label="Dinos algo"
          href="/contact"
        />
      }
    />
  )
}
