import {TbError404} from 'react-icons/tb'
import BackButton from '../navigation/back-button'
import LinkButton from '../navigation/link-button'
import catImage from '@/public/404.webp'
import CustomCard from '../containing/custom-card'

interface NotFoundCardProps {
  title?: string
  text?: string
}

/**
 * Card personalizada para mostrar que una página no se ha encontrado
 * @param title Título de la card
 * @param text Texto de la card
 *
 * Textos por defecto:
 * "Aquí no hay nada"
 * "No encontramos lo que buscas. ¿Estás seguro de que debería estar aquí?"
 */

export default function NotFoundCard({
  title = 'Aquí no hay nada',
  text = 'No encontramos lo que buscas. ¿Estás seguro de que debería estar aquí?',
}: NotFoundCardProps) {
  return (
    <CustomCard
      image={catImage}
      title={title}
      code="404"
      icon={<TbError404 />}
      content={text}
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
