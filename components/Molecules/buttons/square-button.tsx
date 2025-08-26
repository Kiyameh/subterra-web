import {cn} from '@/lib/utils'

/**
 * @version 1
 * @description Componente que muestra un botón cuadrado con un icono y un texto.
 * @param icon Icono del botón
 * @param text Texto del botón
 * @param color Color del botón [staff, admin, editor, primary]
 */

export default function SquareButton({
  icon,
  text,
  color,
  disabled = false,
}: {
  icon: React.ReactNode
  text: string
  color?:
    | 'staff'
    | 'admin'
    | 'editor'
    | 'primary'
    | 'warning-foreground'
    | 'destructive-foreground'
  disabled?: boolean
}) {
  const bgColor = color ? `active:bg-${color}` : 'active:bg-primary'
  const textColor = color ? `text-${color}` : 'text-primary'
  return (
    <button
      disabled={disabled}
      className={cn(
        'flex flex-col gap-1 items-center justify-center w-24 h-24 border border-foreground rounded-xl p-2 hover:bg-muted active:text-foreground active:border-black',
        bgColor,
        textColor
      )}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm text-foreground">{text}</span>
    </button>
  )
}
