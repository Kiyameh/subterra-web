'use client'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Session} from 'next-auth'

/**
 * @version 1
 * @description Componente que renderiza un avatar con la imagen o iniciales del usuario si no tiene imagen
 * @param user - Usuario de la sesión
 * @param onClick - Función que se ejecuta al hacer click en el avatar
 */

export default function AvatarButton({
  user,
  onClick,
}: {
  user: Session['user']
  onClick?: () => void
}) {
  const image = user.image || null
  const name = user.name || 'US'

  return (
    <Avatar
      className="cursor-pointer"
      onClick={onClick}
    >
      {image && (
        <AvatarImage
          src={image}
          alt="Avatar"
        />
      )}
      <AvatarFallback className="bg-primary">
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
