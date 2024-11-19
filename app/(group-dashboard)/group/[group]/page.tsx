import InDevelopmentCard from '@/components/displaying/in-development-card'

export default function GroupLandingPage() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <InDevelopmentCard
        title="Página presentación de grupo"
        text="Página en desarrollo. Próximamente estará disponible"
      />
    </section>
  )
}
