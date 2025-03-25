import React from 'react'
import {auth} from '@/auth'

import {checkIsEditor} from '@/database/services/Instance/membership/checkIsEditor'

import UnauthorizedCard from '@/components/Organisms/containers/401-unauthorized'

interface LayoutProps {
  params: Promise<{instance: string}>
  children: React.ReactNode
}

export default async function EditorLayout({params, children}: LayoutProps) {
  // Obtener el nombre de la instancia
  const instanceName = (await params).instance

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isEditor = await checkIsEditor(userId, instanceName)

  if (!isEditor) return <UnauthorizedCard />

  return <>{children}</>
}
