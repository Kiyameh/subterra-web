import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface ResponsiveTooltipProps {
  shortcut: string
  className?: string
  children: React.ReactNode
}
export default function ShortcutTooltip({
  shortcut,
  children,
}: ResponsiveTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-transparent">
          <span className="text-xs p-1 tracking-widest text-muted-foreground font-bold border rounded-sm border-muted-foreground">
            {shortcut}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
