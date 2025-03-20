import React from 'react'
import PageContainer from '@/components/Organisms/theme/page-container'
import CardWithHeader from '@/components/Molecules/boxes/card-with-header'
import LinkButton from '@/components/Molecules/buttons/link-button'

export default function TermsOfServicePage() {
  return (
    <PageContainer>
      <CardWithHeader defaultWidth="xl">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Términos y Condiciones</h1>

          <p className="mb-4">
            Bienvenido a Subterra.app. Los siguientes términos y condiciones se
            aplican al uso de la plataforma y sus servicios. Haz uso de ella
            solo si aceptas las condiciones en su totalidad.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            1. <span className="text-emphasis">¿Qué es Subterra?</span>
          </h2>
          <p className="mb-4">
            Subterra.app es una plataforma en línea que permite a usuarios y
            grupos almacenar, gestionar y compartir datos de exploraciones
            espeleológicas.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            2. <span className="text-emphasis">Acerca de los datos</span>
          </h2>
          <div className="mb-4">
            Los datos ingresados en la base de datos son propiedad y
            responsabilidad exclusiva de los usuarios que los proporcionan.
            <br />
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                Como usuario, tienes el derecho a eliminar o modificar los datos
                introducidos en cualquier momento.
              </li>
              <li>
                Asimismo, eres responsable de que dichos datos no incurran en
                acciones ilegales, ofensivas o abusivas, vulneren los derechos
                de terceros (incluidos derechos de autor), y de que se ajusten
                al contenido de la plataforma.
              </li>
              <li>
                Para proteger a los usuarios y el buen funcionamiento de la
                plataforma, nos reservamos el derecho a moderar el contenido que
                infrinja estas condiciones.
              </li>
              <li>
                Al introducir los datos en Subterra, nos autorizas a hacer uso
                de ellos únicamente con el fin de mostrarlos y reproducirlos en
                la plataforma. Puedes revocar esta autorización en cualquier
                momento y los datos serán retirados en la mayor brevedad
                posible.
              </li>
            </ul>
          </div>

          <h2 className="text-lg font-semibold mb-2">
            3.{' '}
            <span className="text-emphasis">Si usas una cuenta de Usuario</span>
          </h2>
          <p className="mb-4">
            Para utilizar nuestra plataforma, puedes crear una cuenta de
            usuario. En ese caso, eres responsable de mantener seguras las
            credenciales de acceso y de todas las actividades que se realicen
            desde tu cuenta.
            <br />
            <br />
            Si tienes sospechas de que tu cuenta ha sido comprometida contacta
            con nosotros lo antes posible.
            <br />
            Puedes leer más acerca de como tratamos los datos que nos facilites
            en la sección Política de privacidad.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            4.{' '}
            <span className="text-emphasis">
              Sobre el uso de la información
            </span>
          </h2>
          <p className="mb-4">
            En Subterra se comparte información de lugares y ecosistemas que
            suelen ser sensibles, requieren de un cuidado especial y
            eventualmente están protegidos por ley.
            <br />
            <br />
            Asimismo, estos lugares pueden ser peligrosos para las personas y el
            acceso a los mismos requiere de una planificación y preparación
            específica.
            <br />
            <br />
            Te pedimos que actúes de forma responsable y que seas respetuoso con
            todos los lugares que aquí se referencian y que priorices siempre la
            seguridad del medio, de ti mismo y de las personas de tu alrededor.
            <br />
            <br />
            En este aspecto, no nos hacemos responsables de las consecuencias
            que se puedan ocasionar del uso de la información aquí contenida.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            5. <span className="text-emphasis">Software y plataforma</span>
          </h2>
          <p className="mb-4">
            Todo el contenido y la funcionalidad de la plataforma, incluidas las
            bases de datos, el software, el diseño y la estructura, están
            protegidos por derechos de propiedad intelectual. No se permite su
            reproducción, distribución o cualquier otro uso sin el permiso
            explícito de los propietarios de Subterra.app.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            6. <span className="text-emphasis">Cambios en las condiciones</span>
          </h2>
          <p className="mb-4">
            Nos reservamos el derecho de modificar estos Términos y Condiciones.
            En ese caso será anunciado en la plataforma y/o por correo.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            7. <span className="text-emphasis">Contacto</span>
          </h2>
          <p>
            Si tienes alguna duda o comentario sobre estos términos y
            condiciones, no dudes en contactar con nosotros:
          </p>
          <LinkButton
            href="/contact"
            variant="ghost"
            className="mt-4"
            label="Contacto"
          />
        </div>
      </CardWithHeader>
    </PageContainer>
  )
}
