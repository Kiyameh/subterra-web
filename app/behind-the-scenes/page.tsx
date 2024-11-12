import {Victor_Mono} from 'next/font/google'
import Link from 'next/link'

const mono = Victor_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '200',
})

export default function HowWasCreatedPage() {
  return (
    <>
      <nav className={`${mono.className} absolute top-2 left-2`}>
        <Link
          className="text-yellow-500"
          href={'/'}
        >
          volverAtras( )
        </Link>
      </nav>
      <main
        className={`${mono.className} mt-14 max-w-5xl mx-auto flex flex-col items-center justify-center gap-8`}
      >
        <h1 className="text-2xl">¡Hola visitante!</h1>
        <h2>¿Quieres saber de donde surge Subterra? </h2>
        <p>
          Mi nombre es Andoni, y soy un
          <span className="text-blue-400">espeleólogo</span>y
          <span className="text-yellow-500">desarrollador web</span>
          de Navarra. En mi club exploramos cavidades en nuestra provincia y
          otros lugares, y como la mayoría de la gente del colectivo, nos hemos
          encontrado con la necesidad de almacenar todos nuestros
          descubrimientos.
        </p>
        <p>
          Durante el año 2023 va cogiendo forma la idea de crear una
          <span className="text-purple-400">base de datos</span>confiable y
          especifica para espeleólogos. Las opciones hasta la fecha eran pobres
          y algo anticuadas. Asi que, con el resto del club como asesores, me
          lanzo a la ideación de lo que próximamente será Subterra.
        </p>
        <p>
          En el año 2024, aprovechando que tengo que presentar el
          <span className="text-purple-400">proyecto fin de carrera</span>del
          grado que estoy estudiando, Técnicas de interacción digital y
          multimedia, desarrollo la que será la versión 1 de la aplicación.
        </p>
        <p className="text-red-500">
          Ese es el nacimiento oficial de Subterra.{' '}
        </p>
      </main>
    </>
  )
}
