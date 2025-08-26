import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import PageContainer from '@/components/Organisms/theme/page-container'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/Atoms/card'
import {Button} from '@/components/Atoms/button'
import Link from 'next/link'

export default async function PricesPage() {
  return (
    <PageContainer>
      <CardWithHeader defaultWidth="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                Plan Gratuito
              </CardTitle>
              <p className="text-3xl font-bold mt-2">0€</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Administrar miembros y asignar roles de usuario
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Solicitar instancias de visibilidad pública
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Solicitar hasta tres instancias
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Asignar editores y coordinadores de instancia
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                Plan Colaborador
              </CardTitle>
              <div className="flex flex-col items-start mt-2">
                <p className="text-3xl font-bold line-through text-muted-foreground">
                  29,9€/año
                </p>
                <p className="text-3xl font-bold text-emphasis">0€/año</p>
                <p className="text-muted-foreground mt-1">
                  *Oferta especial durante el año de lanzamiento
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Todas las ventajas del plan gratuito
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Solicitar instancias privadas
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Solicitar hasta 5 instancias
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Participar en la decisión de próximas funcionalidades
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg mb-4">
            ¿Tienes alguna duda sobre nuestros planes?
          </p>
          <Button
            asChild
            variant="outline"
          >
            <Link href="/contact">Contacta con nosotros</Link>
          </Button>
        </div>
      </CardWithHeader>
    </PageContainer>
  )
}
