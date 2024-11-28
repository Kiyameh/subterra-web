import React from 'react'

export default function Divider({text}: {text?: string}) {
  return (
    <div className="flex items-center my-3">
      <div className="flex-grow border-t border-muted-foreground"></div>
      {text && <span className="mx-4 text-muted-foreground">{text}</span>}
      <div className="flex-grow border-t border-muted-foreground"></div>
    </div>
  )
}
