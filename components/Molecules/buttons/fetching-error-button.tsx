'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import {Button} from '@/components/Atoms/button'
import {BiCommentError} from 'react-icons/bi'
import {MdOutlineRefresh} from 'react-icons/md'

/**
 * @version 1
 * @description Mensaje de error al cargar datos con botón de recarga de página
 */
export default function FetchingErrorButton() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-1 p-4 border border-muted-foreground text-muted-foreground rounded-lg">
        <BiCommentError className="text-xl" />
        <p>Error al cargar</p>
        <p>los datos</p>
        <Button
          aria-label="Recargar datos"
          variant="ghost"
          size="icon"
          onClick={() => router.refresh()}
        >
          <MdOutlineRefresh className="scale-125 animate-pulse" />
        </Button>
      </div>
    </div>
  )
}
