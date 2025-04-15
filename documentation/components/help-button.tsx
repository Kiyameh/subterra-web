'use client'
import {useRouter, usePathname, useSearchParams} from 'next/navigation'

import {Button} from '@/components/Atoms/button'

import {BsFillQuestionCircleFill} from 'react-icons/bs'
import {MdPlayArrow} from 'react-icons/md'

/**
 * @version 1
 * @description Botón para abrir la documentación de un tema
 * @param text - Texto del botón
 * @param topicSlug - Slug del tema
 */

export default function HelpButton({
  text,
  topicSlug,
}: {
  text: string
  topicSlug: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const openHelpIndex = () => {
    // Crear una nueva URL con el parámetro help
    const params = new URLSearchParams(searchParams.toString())
    params.set('help', topicSlug || 'index')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Button
      variant="outline"
      color="info"
      className="h-12 flex items-center justify-between gap-4"
      onClick={openHelpIndex}
      aria-label="Abrir Ayuda"
    >
      <div className="flex items-center gap-4">
        <BsFillQuestionCircleFill className="scale-150 text-info-foreground" />
        {text && <span className="font-bold text-base">{text}</span>}
      </div>
      <MdPlayArrow />
    </Button>
  )
}
