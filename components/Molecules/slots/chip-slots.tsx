import {Badge, BadgeProps} from '@/components/Atoms/badge'
import {cn} from '@/lib/utils'
import DateBadge from '@/components/Molecules/badges/date-badge'

/**
 * @version 1
 * @description Slot de chip con label y valor
 * @param label Texto del slot
 * @param value Valor del chip
 * @param endAdornment Adorno al final del chip
 * @param startAdornment Adorno al inicio del chip
 * @param emphasis Enfatizar el chip
 */

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

/**
 * @version 1
 * @description Slot de múltiples chips con label y valores
 * @param label Texto del slot
 * @param values Valores de los chips
 * @param endAdornment Adorno al final del chip
 * @param startAdornment Adorno al inicio del chip
 * @param emphasis Enfatizar el chip
 */

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

/**
 * @version 1
 * @description Slot de fechas con label y valores
 * @param label Texto del slot
 * @param values Valores de las fechas
 */

export function MultiDateSlot({
  label,
  values,
}: {
  label: string
  values?: Date[] | undefined
} & BadgeProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-2 py-[2px] md:px-4 min-h-7">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex gap-1 items-center">
        {values?.map((value, index) => (
          <DateBadge
            key={index}
            value={value}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * @version 1
 * @description Slot de booleano con label y valor
 * @param label Texto del slot
 * @param value Valor del slot
 * @param endAdornment Adorno al final del slot
 * @param startAdornment Adorno al inicio del slot
 * @param invertedColor Invertir colores
 */

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
      ? 'text-success-foreground border-success-foreground hover:bg-success'
      : 'text-destructive-foreground border-destructive-foreground hover:bg-destructive '

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
