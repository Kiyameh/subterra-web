import InDevelopmentCard from '@/components/displaying/in-development-card'

export default function CreateInstancePage() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <InDevelopmentCard
        title="Crear instancia"
        text="Página en desarrollo. Próximamente estará disponible"
      />
    </section>
  )
}
