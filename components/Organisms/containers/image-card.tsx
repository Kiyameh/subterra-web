import BasicCard from '@/components/Molecules/boxes/basic-card'
import CardTitle from '@/components/Molecules/boxes/card-title'
import React from 'react'
import {FaRegImage} from 'react-icons/fa'

/**
 * @version BETA
 * @description Card personalizada para mostrar una imagen
 * @param src Ruta de la imagen
 * @param alt Texto alternativo de la imagen
 */

export default function ImageCard({}: {src?: string; alt?: string}) {
  return (
    <BasicCard
      key="image_card"
      cardHeader={
        <CardTitle
          title={'Imagen'}
          subtitle="Funcionalidad en desarrollo. Proximamente estará disponible"
          icon={<FaRegImage />}
        />
      }
      className="w-full"
    >
      <span></span>
    </BasicCard>
  )
}
