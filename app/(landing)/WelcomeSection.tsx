import SubterraLogo from '@/components/branding/subterra-logo'
import GlassBox from '@/components/containing/glass-box'
import DownAnchor from '@/components/navigation/down-anchor'
import React from 'react'

export default function WelcomeSection() {
  return (
    <section
      id="welcome-section"
      className="w-full min-h-screen  p-5 flex flex-col justify-evenly items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{backgroundImage: 'url(/stock/h1.jpg)'}}
    >
      <SubterraLogo
        size="big"
        customWidth={300}
      />
      <GlassBox>
        <p className="text-[1.7rem] text-center">
          Base de datos para el almacenamiento de información espeleológica y de
          exploración
        </p>
      </GlassBox>
      <nav>
        <DownAnchor href="#about-section" />
      </nav>
    </section>
  )
}
