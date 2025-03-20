import WelcomeSection from '@/app/(landing-sections)/welcome-section'
import AboutSection from '@/app/(landing-sections)/about-section'
import HowToSection from '@/app/(landing-sections)/how-to-section'
import InstancesSection from '@/app/(landing-sections)/instances-section'
import GroupsSection from '@/app/(landing-sections)/groups-section'

import DesktopNav from '@/components/Organisms/navigation/landing-nav-desktop'
import MobileNav from '@/components/Organisms/navigation/landing-nav-mobile'
import FloatingAccountControls from '@/components/Organisms/authentication/floating-user-control/floating-account-controls'
import LandingFooter from '@/components/Organisms/navigation/landing-footer'

//* Constantes:
const sections = [
  {label: 'Inicio', id: 'welcome-section'},
  {label: '¿Qué es?', id: 'about-section'},
  {label: 'Empezar', id: 'start-section'},
  {label: 'Instancias', id: 'instances-section'},
  {label: 'Grupos', id: 'groups-section'},
]

export default function HomePage() {
  return (
    <>
      <nav className="hidden md:block">
        <DesktopNav sections={sections} />
      </nav>
      <nav className="block md:hidden">
        <MobileNav sections={sections} />
      </nav>
      <nav className="fixed top-6 right-6 z-50 md:bottom-6 md:top-auto">
        <FloatingAccountControls />
      </nav>
      <main>
        <WelcomeSection />
        <AboutSection />
        <HowToSection />
        <InstancesSection />
        <GroupsSection />
      </main>
      <footer>
        <LandingFooter />
      </footer>
    </>
  )
}
