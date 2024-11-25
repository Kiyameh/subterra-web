import {Badge} from '@/components/ui/badge'
import {MdInfo} from 'react-icons/md'
import ResponsiveTooltip from './responsive-tooltip'

interface InfoBadgeProps {
  label?: string
  withIcon?: boolean
  description: string
}

export default function InfoBadge({
  label,
  withIcon = true,
  description,
}: InfoBadgeProps) {
  return (
    <>
      <ResponsiveTooltip
        content={description}
        className="text-blue-400"
      >
        {label ? (
          <Badge className="bg-gray-800 hover:bg-gray-600 cursor-help">
            {label}
            {withIcon && <MdInfo className="ml-2 h-4 w-4 text-blue-500" />}
          </Badge>
        ) : (
          <MdInfo className="h-4 w-4 text-blue-500" />
        )}
      </ResponsiveTooltip>
    </>
  )
}
