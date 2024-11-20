import AboutSection from './(landing)/AboutSection'
import DesktopNav from './(landing)/components/nav-desktop'
import Footer from './(landing)/Footer'
import MobileNav from './(landing)/components/nav-mobile'
import HowToSection from './(landing)/HowToSection'
import InstancesSection from './(landing)/InstancesSection'
import WelcomeSection from './(landing)/WelcomeSection'
import FloatingAccountControls from '@/components/account/floating-account-controls'

//* Constantes:
const sections = [
  {label: 'Inicio', id: 'welcome-section'},
  {label: '¿Qué es?', id: 'about-section'},
  {label: 'Empezar', id: 'start-section'},
  {label: 'Instancias', id: 'instances-section'},
]

export default function Home() {
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
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
