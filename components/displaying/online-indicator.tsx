import ResponsiveTooltip from './responsive-tooltip'

interface OnlineIndicatorProps {
  isOnline: boolean
}

export default function OnlineIndicator({isOnline}: OnlineIndicatorProps) {
  return (
    <>
      <ResponsiveTooltip
        content={isOnline ? 'Online' : 'Temporalmente Offline'}
        color={isOnline ? 'success' : 'destructive'}
      >
        <div
          className={`w-3 h-3 rounded-full border border-black border-opacity-50 ${
            isOnline ? 'bg-success-foreground' : 'bg-destructive-foreground'
          }`}
        />
      </ResponsiveTooltip>
    </>
  )
}
