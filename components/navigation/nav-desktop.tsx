'use client'
import SubterraLogo from '@/components/branding/subterra-logo'
import {Button} from '@/components/ui/button'
import useCurrentSection from '@/hooks/use-current-section'
import Link from 'next/link'
import React from 'react'

interface DesktopNavProps {
  sections: Array<{id: string; label: string}>
}

/**
 * Navegación entres secciones para la versión desktop
 * type Section = {{id: string; label: string}}
 * @param {Section[]} sections
 */
export default function DesktopNav({sections}: DesktopNavProps) {
  const currentSection = useCurrentSection(sections)

  return (
    <nav className="w-full h-16 fixed flex flex-row items-center justify-between px-5 z-50">
      <Link href={'/'}>
        <SubterraLogo size="medium" />
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
