import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {FaLaptopCode} from 'react-icons/fa'
import BackButton from '../navigation/back-button'
import LinkButton from '../navigation/link-button'

interface InDevelopmentCardProps {
  title?: string
  text?: string
}
export default function InDevelopmentCard({
  title,
  text,
}: InDevelopmentCardProps) {
  return (
    <Card className="max-w-md border-s-[0.5] border-gray-600">
      <div
        className="h-36 bg-cover rounded-t-xl"
        style={{
          backgroundImage: 'url(/stock/programing.webp)',
        }}
      />
      <CardHeader className="text-2xl">
        <CardTitle className="flex flex-row gap-2">
          <FaLaptopCode />
          {title || 'En desarrollo'}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl">
        {text || 'Funcionalidad en desarrollo. Próximamente estará disponible'}
      </CardContent>
      <CardFooter className="flex flex-row gap-2 ">
        <BackButton className="w-1/2" />
        <LinkButton
          label="Enviar comentarios"
          href="/contact"
          className="w-1/2"
        />
      </CardFooter>
    </Card>
  )
}
