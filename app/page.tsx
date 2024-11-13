import AboutSection from './(landing)/AboutSection'
import DesktopNav from '../components/navigation/nav-desktop'
import Footer from './(landing)/Footer'
import MobileNav from '../components/navigation/nav-mobile'
import HowToSection from './(landing)/HowToSection'
import InstancesSection from './(landing)/InstancesSection'
import WelcomeSection from './(landing)/WelcomeSection'
import {FaUserCircle} from 'react-icons/fa'
import SignInControl from '@/app/signin/components/signin-control'
import CollapsibleButton from '@/components/navigation/collapsible-button'

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
      <nav className="fixed top-5 right-5 z-50 md:bottom-5 md:top-auto">
        <SignInControl mode="redirect">
          <CollapsibleButton
            icon={<FaUserCircle />}
            text="Login"
          />
        </SignInControl>
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
