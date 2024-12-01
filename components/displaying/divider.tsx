import React from 'react'

/**
 * @version 1
 * @description Componente para mostrar un divisor horizontal con texto opcional
 * @param text Texto opcional a mostrar en el centro del divisor
 */
export default function Divider({text}: {text?: string}) {
  return (
    <div className="flex items-center my-3">
      <div className="flex-grow border-t border-muted-foreground"></div>
      {text && <span className="mx-4 text-muted-foreground">{text}</span>}
      <div className="flex-grow border-t border-muted-foreground"></div>
    </div>
  )
}
