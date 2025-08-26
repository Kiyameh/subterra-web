import Link from 'next/link'
import {Victor_Mono} from 'next/font/google'

import SimpleBox from '@/components/Molecules/boxes/simple-box'
import PageContainer from '@/components/Organisms/theme/page-container'

const mono = Victor_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '200',
})

export default function HowWasCreatedPage() {
  return (
    <PageContainer>
      <SimpleBox
        defaultWidth="xl"
        glassmorphism
      >
        <nav className={`${mono.className} absolute top-2 left-2`}>
          <Link
            className="text-yellow-300"
            href={'/'}
          >
            volverAtras( )
          </Link>
        </nav>
        <main
          className={`${mono.className} mt-14 max-w-5xl mx-auto flex flex-col items-center justify-center gap-8`}
        >
          <h1 className="text-2xl">¡Hola visitante!</h1>
          <h2>¿Quieres saber cómo nace Subterra? </h2>
          <p>
            Mi nombre es Andoni, y soy un
            <span className="text-blue-400 ml-2 mr-2">espeleólogo</span>y
            <span className="text-yellow-500 ml-2 mr-2">desarrollador web</span>
            de Navarra. En mi club exploramos cavidades en nuestra provincia y
            otros lugares, y como la mayoría de la gente del colectivo, nos
            hemos encontrado con la necesidad de almacenar todos nuestros
            descubrimientos.
          </p>
          <p>
            Durante el año 2023 va cogiendo forma la idea de crear una
            <span className="text-purple-400 ml-2 mr-2">base de datos</span>
            confiable y especifica para espeleólogos. Las opciones hasta la
            fecha eran pobres y algo anticuadas. Asi que, con el resto del club
            como asesores, me lanzo a la ideación de lo que próximamente será
            Subterra.
          </p>
          <p>
            En el año 2024, coincidiendo con el final de mis estudios de
            Técnicas de interacción digital y multimedia, desarrollo la que será
            la versión 1 de la aplicación. Este será mi
            <span className="text-purple-400 ml-2 mr-2">
              proyecto fin de grado (TFG).
            </span>
          </p>
          <p className="text-red-500">
            Ese es el nacimiento oficial de Subterra.
          </p>
          <p>
            En el futuro, espero que Subterra se convierta en una herramienta
            confiable para otros espeleólogos en la misma situación, y que ayude
            a poner un poco en orden el mar de datos que hemos generado durante
            tantos años con
            <span className="text-purple-400 ml-2 mr-2">
              tanto mimo y esfuerzo.
            </span>
          </p>
          <a
            className="text-blue-400"
            href="https://www.kiyameh.com"
          >
            Aquí encontraras más sobre mi
          </a>
          <p>
            Si tienes alguna duda, no dudes en contactarme.
          </p>
        </main>
      </SimpleBox>
    </PageContainer>
  )
}
