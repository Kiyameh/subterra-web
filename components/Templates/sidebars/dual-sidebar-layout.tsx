'use client'
import {SessionProvider} from 'next-auth/react'
import {
  DualSidebarProvider,
  LeftSidebar,
  LeftSidebarTrigger,
  RightSidebar,
  RightSidebarTrigger,
  SidebarInset,
} from '@/components/Atoms/dual-sidebar'

import SubterraDropdown from '@/components/Organisms/navigation/subterra-dropdown'
import NavigationBreadcrumb from '@/components/Organisms/navigation/dashboard-breadcrumb'
import {SubterraLogoIcon} from '@/components/Organisms/theme/subterra-logo'
import IconContactButton from '../staff-dashboard/floating-contact-form/icon-contact-button'

/**
 * @version 1
 * @description Layout con dos sidebars y titulo de subterra
 * @param children - Componentes hijos
 * @param leftSlot - Componente del sidebar izquierdo
 * @param rightSlot - Componente del sidebar derecho
 */

export default function DualSidebarLayout({
  children,
  leftSlot,
  rightSlot,
}: {
  children: React.ReactNode
  leftSlot: React.ReactNode
  rightSlot: React.ReactNode
}) {
  return (
    <SessionProvider>
      <DualSidebarProvider>
        {/* Left Sidebar */}
        <LeftSidebar>{leftSlot}</LeftSidebar>
        {/* Main Content */}
        <SidebarInset>
          <header className="h-12 px-4 flex items-center justify-between shrink-0 bg-card z-50 sticky top-0">
            <div className="absolute left-12">
              <NavigationBreadcrumb />
            </div>
            <div className="flex items-center gap-2">
              <LeftSidebarTrigger />
            </div>
            <div>
              <SubterraLogoIcon />
            </div>
            <div className="flex items-center gap-2">
              <SubterraDropdown />
              <IconContactButton />
              <RightSidebarTrigger />
            </div>
          </header>
          {children}
        </SidebarInset>
        {/* Right Sidebar */}
        <RightSidebar>{rightSlot}</RightSidebar>
      </DualSidebarProvider>
    </SessionProvider>
  )
}
