import React from 'react'

import SimpleBox from '@/components/Molecules/boxes/simple-box'
import DownAnchor from '@/components/Molecules/buttons/down-anchor'
import {SubterraLogoLg} from '@/components/Organisms/theme/subterra-logo'

export default function WelcomeSection() {
  return (
    <section
      id="welcome-section"
      className="w-full min-h-screen  p-5 flex flex-col justify-evenly items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{backgroundImage: 'url(/stock/h1.jpg)'}}
    >
      <SubterraLogoLg />
      <SimpleBox glassmorphism>
        <p className="text-[1.7rem] text-center">
          Base de datos para el almacenamiento de información espeleológica y de
          exploración
        </p>
      </SimpleBox>
      <nav>
        <DownAnchor href="#about-section" />
      </nav>
    </section>
  )
}
