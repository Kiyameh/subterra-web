import React from 'react'
import {auth} from '@/auth'
import UnauthorizedCard from '@/components/_Molecules/cards/401-unauthorized'
import {checkIsCoordinator} from '@/database/services/instance.actions'

interface LayoutProps {
  params: Promise<{instance: string}>
  children: React.ReactNode
}

export default async function CoordinatorLayout({
  params,
  children,
}: LayoutProps) {
  // Obtener el nombre del grupo
  const instanceName = (await params).instance

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isCoordinator = await checkIsCoordinator(userId, instanceName)

  if (!isCoordinator) return <UnauthorizedCard />

  return <>{children}</>
}
