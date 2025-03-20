import React from 'react'
import {auth} from '@/auth'
import {checkIsMember} from '@/database/services/Group/membership/checkIsMember'
import UnauthorizedCard from '@/components/Organisms/containers/401-unauthorized'

interface LayoutProps {
  params: Promise<{group: string}>
  children: React.ReactNode
}

export default async function MemberLayout({params, children}: LayoutProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el id del usuario
  const userId = (await auth())?.user?._id

  // Validar roles de usuario
  const isMember = await checkIsMember(userId, groupName)

  if (!isMember) return <UnauthorizedCard />

  return <>{children}</>
}
