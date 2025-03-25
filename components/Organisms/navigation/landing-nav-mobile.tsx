'use client'
import React from 'react'
import Link from 'next/link'

import useCurrentSection from '@/hooks/use-current-section'
import useScrollingVisibility from '@/hooks/use-scrolling-visibility'

/**
 * @version 1
 * @description Barra de navegación para movil
 * @param sections Array de secciones de la página {id: string, label: string}
 */
export default function MobileNav({
  sections,
}: {
  sections: Array<{id: string; label: string}>
}) {
  const currentSection = useCurrentSection(sections)
  const isVisible = useScrollingVisibility(1000)

  return (
    <nav>
      <ul
        className="fixed bottom-4 right-4 flex flex-col items-end justify-end gap-3 p-3 z-50"
        style={{
          //* Animación junto con el uso de useScrollingVisibility:
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {sections.map((section, i) => (
          <SideNavItem
            key={i}
            section={section}
            currentSection={currentSection}
          />
        ))}
      </ul>
    </nav>
  )
}

interface SideNavItemProps {
  section: {id: string; label: string}
  currentSection: string
}

/**
 * Ítem de navegación para el componente MobileNav
 * @param {Section} section - Sección de la página que representa el ítem
 * @param {string} currentSection- Sección actual en el scroll
 */
function SideNavItem({section, currentSection}: SideNavItemProps) {
  return (
    <li>
      <Link
        href={`#${section.id}`}
        passHref
        className="text-foreground flex items-center gap-2"
      >
        {currentSection === section.id && section.label}
        <span
          className={`w-4 h-4 rounded-full ${
            currentSection === section.id ? 'bg-primary' : 'bg-foreground'
          }`}
        />
      </Link>
    </li>
  )
}
