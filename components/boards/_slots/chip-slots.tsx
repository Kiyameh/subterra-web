import {Badge, BadgeProps} from '@/components/ui/badge'
import {cn} from '@/lib/utils'

export function ChipSlot({
  label,
  value,
  endAdornment,
  startAdornment,
  className,
  emphasis,
}: {
  label: string
  value?: string | number | undefined
  endAdornment?: React.ReactNode
  startAdornment?: React.ReactNode
  emphasis?: boolean
} & BadgeProps) {
  const style = emphasis
    ? 'bg-card border-accent-foreground text-accent-foreground hover:bg-accent'
    : 'bg-card text-muted-foreground border-muted-foreground hover:bg-muted'
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1 items-center">
        {value && (
          <Badge
            className={cn(
              'rounded-full justify-center gap-1 min-w-14 border font-normal',
              style,
              className
            )}
          >
            {startAdornment}
            {value}
            {endAdornment}
          </Badge>
        )}
      </div>
    </div>
  )
}

export function MultiChipSlot({
  label,
  values,
  endAdornment,
  startAdornment,
  className,
  emphasis,
}: {
  label: string
  values?: string[] | number[] | undefined
  endAdornment?: React.ReactNode
  startAdornment?: React.ReactNode
  emphasis?: boolean
} & BadgeProps) {
  const style = emphasis
    ? 'bg-card border-accent-foreground text-accent-foreground hover:bg-accent'
    : 'bg-card text-muted-foreground border-muted-foreground hover:bg-muted'
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1 items-center">
        {values?.map((value, index) => (
          <Badge
            key={index}
            className={cn(
              'rounded-full justify-center gap-1 min-w-14 border font-normal',
              style,
              className
            )}
          >
            {startAdornment}
            {value}
            {endAdornment}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function BooleanSlot({
  label,
  value,
  endAdornment,
  startAdornment,
  invertedColor = false,
}: {
  label: string
  value?: boolean | undefined
  endAdornment?: React.ReactNode
  startAdornment?: React.ReactNode
  invertedColor?: boolean
}) {
  //? Compara value e invertedColor, para las cuatro posibilidades de color
  const color =
    value != invertedColor
      ? 'text-success-foreground border-success-foreground hover:bg-success-foreground hover:text-black'
      : 'text-destructive-foreground border-destructive-foreground hover:bg-destructive-foreground hover:text-black'

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      {value === undefined ? null : (
        <Badge
          className={cn(
            'rounded-full justify-center min-w-14 bg-card border font-normal',
            color
          )}
        >
          {startAdornment}
          {value ? 'Si' : 'No'}
          {endAdornment}
        </Badge>
      )}
    </div>
  )
}
