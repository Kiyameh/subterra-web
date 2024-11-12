import {cn} from '@/lib/utils'

interface GlassBoxProps {
  children: React.ReactNode
  className?: string
}

/** Caja básica con aspecto de glassmorphism */
export default function GlassBox({children, className}: GlassBoxProps) {
  return (
    <div
      className={cn(
        'max-w-lg rounded-lg bg-black bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 p-4 m-4',
        className
      )}
    >
      {children}
    </div>
  )
}
