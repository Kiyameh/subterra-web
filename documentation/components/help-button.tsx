'use client'

import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import {Button} from '@/components/Atoms/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Atoms/tooltip'
import {HelpCircle} from 'lucide-react'

export default function HelpButton() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const openHelpIndex = () => {
    // Create a new URL with the help=index parameter
    const params = new URLSearchParams(searchParams.toString())
    params.set('help', 'index')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={openHelpIndex}
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
              aria-label="Abrir Ayuda"
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>¿Necesitas ayuda?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
