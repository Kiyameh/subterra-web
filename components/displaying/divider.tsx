import React from 'react'

export default function Divider({text}: {text?: string}) {
  return (
    <div className="flex items-center my-3">
      <div className="flex-grow border-t border-gray-300"></div>
      {text && <span className="mx-4 text-gray-500">{text}</span>}
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  )
}
