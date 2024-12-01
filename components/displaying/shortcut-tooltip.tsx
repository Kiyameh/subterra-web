'use client'
import {useIsMobile} from '@/hooks/use-mobile'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/**
 * @version 1
 * @description Tooltip para mostrar un atajo de teclado solo en desktop
 * @param shortcut Atajo de teclado
 * @param children Elemento que activa el tooltip
 * @info El atajo del teclado se ingresará con el formato 'Ctrl+Shift+K' (el tooltip muestra teclas unidas por +)
 */

export default function ShortcutTooltip({
  shortcut,
  children,
}: {
  shortcut: string
  children: React.ReactNode
}) {
  const keys = shortcut.split('+')
  const isMobile = useIsMobile()
  if (isMobile) return <>{children}</>

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="border-transparent bg-transparent">
          {keys.map((key, index) => (
            <span key={index}>
              <span className="rounded border border-muted-foreground bg-muted px-1 py-[2px] shadow-md">
                {key}
              </span>
              <span
                className="px-1"
                aria-hidden="true"
              >
                {index < keys.length - 1 ? '+' : ''}
              </span>
            </span>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
