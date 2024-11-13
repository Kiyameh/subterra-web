import {ReactNode} from 'react'
import {Button, ButtonProps} from '../ui/button'

interface CollapsibleButtonProps extends ButtonProps {
  icon: ReactNode
  text: string
  openWidth?: number
}

/** Boton de icono que muestra el texto al hacer hover */
export default function CollapsibleButton({
  icon,
  text,
  openWidth = 20,
  ...props
}: CollapsibleButtonProps) {
  //? Animación:
  //? Texto se muestra y oculta con delay de 200 y animación de 200
  //? Con hover(botón abriendose) -> botón crece con delay-0 y duración de 300
  //? Sin hover(botón cerrandose) -> botón decrece con delay-500 (para esperar a texto) y duración de 300

  return (
    <Button
      {...props}
      className={`group rounded-full flex flex-row justify-normal px-3 h-10 w-10 hover:w-${openWidth} 
        transition-all duration-300 delay-500 hover:delay-0`}
    >
      <span className="scale-125">{icon}</span>
      <span className="text-transparent group-hover:text-current animation-color duration-200 delay-200">
        {text}
      </span>
    </Button>
  )
}
