'use client'
import Link from 'next/link'
import React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/Atoms/navigation-menu'

import {FiBox} from 'react-icons/fi'
import {MdDataObject} from 'react-icons/md'
import {TbComponents} from 'react-icons/tb'
import {FaHome} from 'react-icons/fa'
import {BiMessageDots} from 'react-icons/bi'
import {RiInputField} from 'react-icons/ri'
import {BsTextareaResize} from 'react-icons/bs'
import {BsAppIndicator} from 'react-icons/bs'
import {CgPlayButtonR} from 'react-icons/cg'
import {IoMdClose} from 'react-icons/io'

export default function StaffNavigation() {
  return (
    <div className="w-fit bg-card px-4 p-2 rounded-lg">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="flex items-center gap-1 justify-center">
                <TbComponents />
                Componentes
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuList>
                <div className="flex flex-col gap-2  p-4 items-start">
                  <NavItem
                    label="Fields"
                    href="/admin/component-showcase/fields"
                    icon={<RiInputField />}
                  />
                  <NavItem
                    label="Slots"
                    href="/admin/component-showcase/slots"
                    icon={<BsTextareaResize />}
                  />
                  <NavItem
                    label="Badges"
                    href="/admin/component-showcase/badges"
                    icon={<BsAppIndicator />}
                  />
                  <NavItem
                    label="Buttons"
                    href="/admin/component-showcase/buttons"
                    icon={<CgPlayButtonR />}
                  />
                  <NavItem
                    label="Boxes"
                    href="/admin/component-showcase/boxes"
                    icon={<FiBox />}
                  />
                </div>
              </NavigationMenuList>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavItem
            label="Mensajes de contacto"
            href="/admin/contact-messages"
            icon={<BiMessageDots />}
          />

          <NavItem
            label="Solicitudes de instancia"
            href="/admin/instance-request"
            icon={<FiBox />}
          />
          <NavItem
            label="Visor objetos"
            href="/admin/object-viewer"
            icon={<MdDataObject />}
          />
          <NavItem
            href="/admin"
            icon={<FaHome className="text-staff" />}
          />
          <NavItem
            href="/"
            icon={<IoMdClose className="text-destructive-foreground" />}
          />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function NavItem({
  label,
  href,
  icon,
}: {
  label?: string
  href: string
  icon: React.ReactNode
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={navigationMenuTriggerStyle()}
      >
        <Link
          href={href}
          className={navigationMenuTriggerStyle()}
        >
          <div className="flex items-center gap-1 justify-center">
            {icon}
            {label}
          </div>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
