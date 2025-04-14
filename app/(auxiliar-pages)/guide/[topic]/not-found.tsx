import Link from 'next/link'
import {Button} from '@/components/Atoms/button'
import {Home} from 'lucide-react'

export default function TopicNotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Tema No Encontrado</h1>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, no pudimos encontrar el tema de ayuda que estás buscando.
        </p>
        <Button asChild>
          <Link
            href="/guide"
            className="flex items-center justify-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Volver al Índice de Guía
          </Link>
        </Button>
      </div>
    </div>
  )
}
