import {Answer} from '@/database/types/answer.type'
import React from 'react'
import {FaExclamationTriangle} from 'react-icons/fa'
import {FaCheckCircle} from 'react-icons/fa'

interface AnswerBoxProps {
  answer?: Answer | null
}

export default function DbAwnserBox({answer}: AnswerBoxProps) {
  if (!answer) return null

  return (
    <div
      className={`p-3 rounded-md flex items-center gap-x-2 text-sm ${
        answer.ok
          ? 'bg-green-500/15 text-green-500'
          : 'bg-red-500/15 text-red-500'
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
