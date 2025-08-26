import React from 'react'
import {auth} from '@/auth'

import {checkIsAdmin} from '@/database/services/Group/membership/checkIsAdmin'

import UnauthorizedCard from '@/components/Organisms/containers/401-unauthorized'

interface LayoutProps {
  params: Promise<{group: string}>
  children: React.ReactNode
}

export default async function AdminLayout({params, children}: LayoutProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isAdmin = await checkIsAdmin(userId, groupName)

  if (!isAdmin) return <UnauthorizedCard />

  return <>{children}</>
}
