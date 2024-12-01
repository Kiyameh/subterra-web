"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";

interface Props {
  isMember: boolean;
  isAdmin: boolean;
}

/**
 * Panel de navegación principal de grupos para colocar en un sidebar
 * @param isMember - Si el usuario es miembro
 * @param isAdmin - Si el usuario es administrador
 */

export default function SidebarGroupNavigation({ isMember, isAdmin }: Props) {
  const { group } = useParams();
  const pathName = usePathname();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Área pública</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/group/${group}`}>
                <IoMdInformationCircleOutline />
                <span>Página de presentación</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      {isMember && (
        <SidebarGroup>
          <SidebarGroupLabel>Área miembros</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathName.includes(`${group}/members`)}
              >
                <Link href={`/group/${group}/members`}>
                  <FaUserGroup className="text-editor" />
                  <span>Miembros</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isAdmin && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName.includes(`${group}/admin`)}
                >
                  <Link href={`/group/${group}/admin`}>
                    <FaGear className="text-admin" />
                    <span>Panel de administración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
}
