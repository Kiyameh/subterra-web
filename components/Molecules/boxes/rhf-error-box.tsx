import React from 'react'

import {type FieldErrors} from 'react-hook-form'
import {type FieldValues} from 'react-hook-form'

/**
 * @version 1
 * @description Muestra los errores de un formulario de react-hook-form
 * @param errors Objeto de errores de react-hook-form (formState.errors)
 * @returns
 */

export default function ReactHookFormErrorBox<T extends FieldValues>({
  errors,
}: {
  errors: FieldErrors<T>
}) {
  const renderErrors = (errors: FieldErrors<T>) => {
    const errorMessages: string[] = []

    const extractMessages = (
      errorObj: FieldErrors<T>,
      parentKey: string = ''
    ) => {
      for (const key in errorObj) {
        if (errorObj[key]?.message) {
          errorMessages.push(`${parentKey}${key} : ${errorObj[key].message}`)
        } else {
          extractMessages(
            errorObj[key] as FieldErrors<T>,
            `${parentKey}${key}.`
          )
        }
      }
    }

    extractMessages(errors)
    return errorMessages
  }

  return (
    <div className="text-destructive-foreground text-sm">
      {renderErrors(errors).map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  )
}
