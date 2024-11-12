import ResponsiveTooltip from './responsive-tooltip'

interface OnlineIndicatorProps {
  isOnline: boolean
}

export default function OnlineIndicator({isOnline}: OnlineIndicatorProps) {
  return (
    <>
      <ResponsiveTooltip
        content={isOnline ? 'Online' : 'Temporalmente Offline'}
        className={isOnline ? 'text-lime-400' : 'text-orange-600'}
      >
        <div
          className={`w-3 h-3 rounded-full border border-black border-opacity-50 ${
            isOnline ? 'bg-lime-400' : 'bg-orange-600'
          }`}
        />
      </ResponsiveTooltip>
    </>
  )
}
