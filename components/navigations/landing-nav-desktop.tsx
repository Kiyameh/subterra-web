'use client'
import {SubterraLogoMd} from '@/components/branding/subterra-logo'
import {Button} from '@/components/ui/button'
import useCurrentSection from '@/hooks/use-current-section'
import Link from 'next/link'
import React from 'react'

/**
 * @version 1
 * @description Barra de navegación para escritorio
 * @param sections Array de secciones de la página {id: string, label: string}
 */
export default function DesktopNav({
  sections,
}: {
  sections: Array<{id: string; label: string}>
}) {
  const currentSection = useCurrentSection(sections)

  return (
    <nav className="w-full h-16 fixed flex flex-row items-center justify-between px-5 z-50">
      <Link href={'/'}>
        <SubterraLogoMd />
      </Link>
      <ul className="flex flex-row gap-7">
        {sections.map((section, i) => (
          <li key={i}>
            <Link href={`#${section.id}`}>
              <Button
                variant={currentSection === section.id ? 'default' : 'ghost'}
              >
                {section.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
