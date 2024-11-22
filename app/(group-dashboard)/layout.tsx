export default function GroupDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>Proximamente: Barra de herramientas de grupo</h1>
      <div className="w-full h-full flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  )
}
