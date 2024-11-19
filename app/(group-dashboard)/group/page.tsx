import InDevelopmentCard from '@/components/displaying/in-development-card'

export default function GroupListPage() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <InDevelopmentCard
        title="Listado de grupos"
        text="Página en desarrollo. Próximamente estará disponible"
      />
    </section>
  )
}
