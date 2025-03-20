import BasicCard from '@/components/Molecules/boxes/basic-card'
import LinkButton from '@/components/Molecules/buttons/link-button'
import BackButton from '@/components/Molecules/buttons/back-button'
import errorImage from '@/public/500.webp'
import {FaLaptopCode} from 'react-icons/fa'

/**
 * @version 1
 * @description Card personalizada para mostrar que ha ocurrido un error en el servidor
 * @param title Título de la card
 * @param text Texto de la card
 * @default
 * 'Algo ha ido mal'
 * 'No eres tu, somos nosotros. Estamos trabajando para solucionar el problema'
 */

export default function ErrorCard({
  title = 'Algo ha ido mal',
  text = 'No eres tu, somos nosotros. Estamos trabajando para solucionar el problema',
}: {
  title?: string
  text?: string
}) {
  return (
    <BasicCard
      image={errorImage}
      cardHeader={
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl">
            <FaLaptopCode />
            {title}
          </div>
          <a
            href={'https://http.cat/status/500'}
            target="_blank"
            className="text-2xl text-foreground/20"
          >
            500
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
