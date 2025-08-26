import BasicCard from '@/components/Molecules/boxes/basic-card'
import BackButton from '@/components/Molecules/buttons/back-button'
import LinkButton from '@/components/Molecules/buttons/link-button'
import catImage from '@/public/404.webp'
import {TbError404} from 'react-icons/tb'

/**
 * @version 1
 * @description Card personalizada para mostrar que una página no se ha encontrado
 * @param title Título de la card
 * @param text Texto de la card
 * @default
 * 'Aquí no hay nada'
 * 'No encontramos lo que buscas. ¿Estás seguro de que debería estar aquí?'
 */

export default function NotFoundCard({
  title = 'Aquí no hay nada',
  text = 'No encontramos lo que buscas. ¿Estás seguro de que debería estar aquí?',
}: {
  title?: string
  text?: string
}) {
  return (
    <BasicCard
      image={catImage}
      cardHeader={
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl">
            <TbError404 />
            {title}
          </div>
          <a
            href={'https://http.cat/status/404'}
            target="_blank"
            className="text-2xl text-foreground/20"
          >
            404
          </a>
        </div>
      }
      cardFooter={
        <div className="w-full gap-2 flex justify-between">
          <BackButton />
          <LinkButton
            label="Enviar comentarios"
            href="/contact"
          />
        </div>
      }
    >
      {text}
    </BasicCard>
  )
}
