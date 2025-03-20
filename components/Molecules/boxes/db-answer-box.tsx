import React from 'react'
import {Answer} from '@/database/types/Answer'
import {FaExclamationTriangle} from 'react-icons/fa'
import {FaCheckCircle} from 'react-icons/fa'

/**
 * @version 1
 * @description Componente para mostrar mensajes de respuesta de la base de datos
 * @param answer Respuesta de la base de datos
 */

export default function DbAwnserBox({answer}: {answer?: Answer | null}) {
  if (!answer) return null

  return (
    <div
      className={`p-3 rounded-md flex items-center gap-x-2 text-sm ${
        answer.ok
          ? 'bg-success text-success-foreground'
          : 'bg-destructive text-destructive-foreground'
      }`}
    >
      {answer.ok ? (
        <FaCheckCircle className="h-5 w-5" />
      ) : (
        <FaExclamationTriangle className="h-5 w-5" />
      )}
      <span>{answer.message}</span>
    </div>
  )
}
