import BasicCard from '@/components/Molecules/boxes/basic-card'
import LinkButton from '@/components/Molecules/buttons/link-button'
import BackButton from '@/components/Molecules/buttons/back-button'
import programingImage from '@/public/501.webp'
import {FaLaptopCode} from 'react-icons/fa'

/**
 * @version 1
 * @description Card personalizada para mostrar que una funcionalidad está en desarrollo
 * @param title Título de la card
 * @param text Texto de la card
 * @default
 * 'En desarrollo'
 * 'Funcionalidad en desarrollo. Próximamente estará disponible'
 */

export default function InDevelopmentCard({
  title = 'En desarrollo',
  text = 'Funcionalidad en desarrollo. Próximamente estará disponible',
}: {
  title?: string
  text?: string
}) {
  return (
    <BasicCard
      image={programingImage}
      cardHeader={
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl">
            <FaLaptopCode />
            {title}
          </div>
          <a
            href={'https://http.cat/status/501'}
            target="_blank"
            className="text-2xl text-foreground/20"
          >
            501
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
