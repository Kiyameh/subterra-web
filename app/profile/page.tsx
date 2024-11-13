'use server'
import {auth} from '@/auth'
import React from 'react'

export default async function ProfilePage() {
  const session = await auth()
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2>Sesión:</h2>
      <div>{JSON.stringify(session)}</div>
    </div>
  )
}
