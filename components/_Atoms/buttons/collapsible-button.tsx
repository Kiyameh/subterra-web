import {ReactNode} from 'react'
import {Button, ButtonProps} from '../../ui/button'
import {cn} from '@/lib/utils'

interface CollapsibleButtonProps extends ButtonProps {
  icon: ReactNode
  text: string
}

/**
 * Botón con texto que se muestra y oculta al hacer hover
 * @param icon Icono del botón
 * @param text Texto del botón
 * @param className Clases adicionales para el botón
 */

export default function CollapsibleButton({
  icon,
  text,
  className = '',
  ...props
}: CollapsibleButtonProps) {
  //? Animación:
  //? Texto se muestra y oculta con delay de 200 y animación de 200
  //? Con hover(botón abriendose) -> botón crece con delay-0 y duración de 300
  //? Sin hover(botón cerrandose) -> botón decrece con delay-500 (para esperar a texto) y duración de 300

  return (
    <Button
      {...props}
      className={cn(
        `group rounded-full flex flex-row justify-normal px-3 h-10 w-10 hover:w-20 transition-all duration-300 delay-500 hover:delay-0`,
        className
      )}
    >
      <span className="scale-125">{icon}</span>
      <span className="text-transparent group-hover:text-current animation-color duration-200 delay-200">
        {text}
      </span>
    </Button>
  )
}
