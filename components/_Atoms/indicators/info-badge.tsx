import {cn} from '@/lib/utils'
import ResponsiveTooltip from '@/components/_Atoms/indicators/responsive-tooltip'
import {Badge} from '@/components/ui/badge'
import {MdInfo} from 'react-icons/md'

/**
 * @version 1
 * @description Badge de información con tooltip responsivo. Opcion solo icono o con texto
 * @param label Texto del badge
 * @param withIcon Mostrar icono
 * @param color Color del badge ['info', 'success', 'warning', 'destructive']
 * @param description Descripción del tooltip
 * @default
 * color: 'info'
 * withIcon: true
 */

export default function InfoBadge({
  label,
  withIcon = true,
  color = 'info',
  description,
}: {
  label?: string
  withIcon?: boolean
  color?: 'info' | 'success' | 'warning' | 'destructive'
  description: string
}) {
  let iconColor = 'text-info-foreground'

  switch (color) {
    case 'success':
      iconColor = 'text-success-foreground'
      break
    case 'warning':
      iconColor = 'text-warning-foreground'
      break
    case 'destructive':
      iconColor = 'text-destructive-foreground'
      break
  }

  return (
    <>
      <ResponsiveTooltip
        content={description}
        color={color}
      >
        {label ? (
          <Badge className="bg-muted hover:bg-gray-600 cursor-help">
            {label}
            {withIcon && <MdInfo className={cn('ml-2 text-base', iconColor)} />}
          </Badge>
        ) : (
          <MdInfo className={cn('text-base', iconColor)} />
        )}
      </ResponsiveTooltip>
    </>
  )
}
