import BasicCard from '@/components/_Atoms/boxes/basic-card'
import React from 'react'

interface ImageCardProps {
  src?: string
  alt?: string
}
export default function ImageCard({}: ImageCardProps) {
  return (
    <BasicCard
      cardHeader="Imagen del grupo"
      className="w-full"
    >
      <p className="text-xl">En desarrollo</p>
      <p>Esta funcionalidad aún no está implementada</p>
    </BasicCard>
  )
}
