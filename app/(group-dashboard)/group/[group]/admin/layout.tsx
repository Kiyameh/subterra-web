import {auth} from '@/auth'
import UnauthorizedCard from '@/components/displaying/401-unauthorized'
import {PopulatedGroup} from '@/database/models/Group.model'
import {getOneGroup} from '@/database/services/group.services'
import {Session} from 'next-auth'
import React from 'react'

interface LayoutProps {
  params: Promise<{group: string}>
  children: React.ReactNode
}

export default async function AdminLayout({params, children}: LayoutProps) {
  // Obtener el nombre del grupo
  const groupName = (await params).group

  // Obtener el grupo
  const group = (await getOneGroup(groupName)).content as PopulatedGroup | null

  // Obtener la sesión de usuario
  const session: Session | null = await auth()
  const userId = session?.user?._id

  // Validar roles de usuario:
  let isAdmin = false
  if (group && userId) {
    isAdmin = group.admin._id === userId
  }

  if (!isAdmin) return <UnauthorizedCard />

  return <>{children}</>
}
