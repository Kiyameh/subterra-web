import {cn} from '@/lib/utils'

export default function SquareButton({
  icon,
  text,
  color,
}: {
  icon: React.ReactNode
  text: string
  color?: 'staff' | 'admin' | 'editor' | 'primary'
}) {
  const bgColor = color ? `active:bg-${color}` : 'active:bg-primary'
  const textColor = color ? `text-${color}` : 'text-primary'
  return (
    <button
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
