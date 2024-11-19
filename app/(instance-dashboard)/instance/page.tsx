import InDevelopmentCard from '@/components/displaying/in-development-card'

export default function InstanceListPage() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <InDevelopmentCard
        title="Listado de instancias"
        text="Página en desarrollo. Próximamente estará disponible"
      />
    </section>
  )
}
