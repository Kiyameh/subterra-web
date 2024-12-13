import React from 'react'
import {auth} from '@/auth'
import UnauthorizedCard from '@/components/_Molecules/cards/401-unauthorized'
import {checkIsCoordinator} from '@/database/services/instance.services'

interface LayoutProps {
  params: Promise<{instance: string}>
  children: React.ReactNode
}

export default async function CoordinatorLayout({
  params,
  children,
}: LayoutProps) {
  // Obtener el nombre del grupo
  const instancesName = (await params).instance

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isCoordinator = (await checkIsCoordinator(instancesName, userId))
    .ok as boolean

  if (!isCoordinator) return <UnauthorizedCard />

  return <>{children}</>
}
