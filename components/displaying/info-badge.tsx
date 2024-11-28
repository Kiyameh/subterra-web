import {Badge} from '@/components/ui/badge'
import {MdInfo} from 'react-icons/md'
import ResponsiveTooltip from './responsive-tooltip'
import {cn} from '@/lib/utils'

interface InfoBadgeProps {
  label?: string
  withIcon?: boolean
  color?: 'info' | 'success' | 'warning' | 'destructive'
  description: string
}

export default function InfoBadge({
  label,
  withIcon = true,
  color = 'info',
  description,
}: InfoBadgeProps) {
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
