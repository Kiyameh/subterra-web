'use client'
import SubterraLogo from '@/components/branding/subterra-logo'
import {Button} from '@/components/ui/button'
import useCurrentSection from '@/hooks/useCurrentSection'
import Link from 'next/link'
import React from 'react'

interface DesktopNavProps {
  sections: Array<{id: string; label: string}>
}

export default function DesktopNav({sections}: DesktopNavProps) {
  const currentSection = useCurrentSection(sections)

  return (
    <div
      style={{
        width: '100%',
        height: '60px',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: '20px',
        zIndex: 1000,
      }}
    >
      <SubterraLogo size="medium" />
      <nav
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
        }}
      >
        {sections.map((section, i) => (
          <Link
            href={`#${section.id}`}
            key={i}
          >
            <Button
              variant={currentSection === section.id ? 'default' : 'ghost'}
            >
              {section.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  )
}
