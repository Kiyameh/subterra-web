import ResponsiveTooltip from '@/components/_Atoms/indicators/responsive-tooltip'

/**
 * @version 1
 * @description Indicador de conexión online con tooltip responsivo
 * @param isOnline Estado de conexión
 * @param onlineText Texto a mostrar si está online
 * @param offlineText Texto a mostrar si está offline
 * @default
 * onlineText: 'Online' offlineText: 'Temporalmente Offline'
 */

export default function OnlineIndicator({
  isOnline,
  onlineText = 'Online',
  offlineText = 'Temporalmente Offline',
}: {
  isOnline: boolean
  onlineText?: string
  offlineText?: string
}) {
  return (
    <>
      <ResponsiveTooltip
        content={isOnline ? onlineText : offlineText}
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
