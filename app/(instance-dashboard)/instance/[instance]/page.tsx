import InDevelopmentCard from '@/components/displaying/in-development-card'

export default function InstanceLandingPage() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <InDevelopmentCard
        title="Página de presentación de instancia"
        text="Página en desarrollo. Próximamente estará disponible"
      />
    </section>
  )
}
