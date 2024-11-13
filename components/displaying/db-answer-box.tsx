import {Answer} from '@/database/types/answer.type'
import React from 'react'
import {FaExclamationTriangle} from 'react-icons/fa'
import {FaCheckCircle} from 'react-icons/fa'

interface AnswerBoxProps {
  answer?: Answer | null
}

export default function DbAwnserBox({answer}: AnswerBoxProps) {
  if (!answer) return null
  const success = answer.code >= 200 && answer.code < 299

  return (
    <div
      className={`p-3 rounded-md flex items-center gap-x-2 text-sm ${
        success
          ? 'bg-green-500/15 text-green-500'
          : 'bg-red-500/15 text-red-500'
      }`}
    >
      {success ? (
        <FaCheckCircle className="h-5 w-5" />
      ) : (
        <FaExclamationTriangle className="h-5 w-5" />
      )}
      <span>{answer.message}</span>
    </div>
  )
}
