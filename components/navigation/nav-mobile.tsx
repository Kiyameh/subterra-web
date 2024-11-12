'use client'
import React from 'react'
import useCurrentSection from '@/hooks/useCurrentSection'
import useScrollingVisibility from '@/hooks/useScrollingVisibility'
import Link from 'next/link'

interface MobileNavProps {
  sections: Array<{id: string; label: string}>
}

export default function MobileNav({sections}: MobileNavProps) {
  const currentSection = useCurrentSection(sections)
  const isVisible = useScrollingVisibility(1000)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '15px',
        right: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        gap: '10px',
        padding: '10px',
        zIndex: 1000,
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
    </div>
  )
}

interface SideNavItemProps {
  section: {id: string; label: string}
  currentSection: string
}

function SideNavItem({section, currentSection}: SideNavItemProps) {
  return (
    <Link
      href={`#${section.id}`}
      passHref
      className="text-white flex items-center gap-2"
    >
      {currentSection === section.id && section.label}

      <div>
        <div
          className={`w-3.5 h-3.5 rounded-full ml-1.5 ${
            currentSection === section.id ? 'bg-rose-600' : 'bg-gray-500'
          }`}
        />
      </div>
    </Link>
  )
}
