import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import PageContainer from '@/components/theming/page-container'

export default function PrivacyPage() {
  return (
    <PageContainer>
      <CardWithHeader defaultWidth="xl">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Política de Privacidad</h1>
          <p className="mb-4">
            En Subterra recogemos ciertos datos en el proceso de registro. Aquí
            te explicamos cómo los tratamos y protegemos.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            1.{' '}
            <span className="text-emphasis">Responsable del Tratamiento</span>
          </h2>
          <p className="mb-4">
            El responsable del tratamiento de los datos recogidos en
            Subterra.app es Andoni Gallardo Izcue, desarrollador principal de la
            plataforma. Puedes ponerte en contacto con él a traves del correo
            electrónico{' '}
            <a
              href="mailto:kiyameh@outlook.com"
              className="underline text-staff"
            >
              kiyameh@outlook.com
            </a>
          </p>

          <h2 className="text-lg font-semibold mb-2">
            2. <span className="text-emphasis">Datos Recogidos</span>
          </h2>
          <p className="mb-4">
            En el momento del registro, recopilamos los siguientes datos
            personales:
            <br />
            - Correo electrónico
            <br />
            - Nombre de usuario
            <br />
            - Contraseña
            <br />
            - Nombre completo (opcional)
            <br />
            - Imagen de avatar (opcional)
            <br />
            <br />
            Además, los usuarios pueden iniciar sesión mediante Google, en cuyo
            caso recogemos la información necesaria para autenticar y crear la
            cuenta de usuario.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            3. <span className="text-emphasis">Finalidad del Tratamiento</span>
          </h2>
          <p className="mb-4">
            Los datos recogidos se utilizan exclusivamente para gestionar la
            cuenta de usuario en Subterra.app, incluyendo:
            <br />
            - Identificación y autenticación del usuario
            <br />
            - Permitir el acceso a las funcionalidades de la plataforma
            <br />- Personalizar la experiencia del usuario mediante el nombre
            completo y la imagen de avatar (si se proporciona)
          </p>

          <h2 className="text-lg font-semibold mb-2">
            4.{' '}
            <span className="text-emphasis">Legitimación del Tratamiento</span>
          </h2>
          <p className="mb-4">
            El tratamiento de los datos personales se basa en el consentimiento
            del usuario, que se entiende otorgado al registrarse en la
            plataforma.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            5. <span className="text-emphasis">Conservación de los Datos</span>
          </h2>
          <p className="mb-4">
            Los datos personales proporcionados se conservarán mientras el
            usuario mantenga su cuenta activa en la plataforma. En caso de
            solicitud de eliminación de la cuenta, los datos serán suprimidos de
            manera segura.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            6. <span className="text-emphasis">Derechos de los Usuarios</span>
          </h2>
          <p className="mb-4">
            Los usuarios tienen derecho a:
            <br />
            - Acceder a sus datos personales
            <br />
            - Rectificar datos inexactos o incompletos
            <br />
            - Solicitar la supresión de sus datos
            <br />
            - Oponerse al tratamiento de sus datos
            <br />
            - Solicitar la limitación del tratamiento de sus datos
            <br />
            Para ejercer estos derechos, los usuarios pueden contactar con el
            responsable del tratamiento.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            7. <span className="text-emphasis">Seguridad de los Datos</span>
          </h2>
          <p className="mb-4">
            Subterra.app se compromete a implementar medidas de seguridad
            técnicas y organizativas adecuadas para proteger los datos
            personales contra el acceso, alteración, divulgación o destrucción
            no autorizados.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            8.{' '}
            <span className="text-emphasis">
              Modificaciones de la Política de Privacidad
            </span>
          </h2>
          <p className="mb-4">
            Nos reservamos el derecho de modificar esta Política de Privacidad
            en cualquier momento. Las modificaciones serán notificadas a los
            usuarios a través de la plataforma y/o por correo electrónico.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            9. <span className="text-emphasis">Contacto</span>
          </h2>
          <p>
            Si tienes alguna duda o comentario sobre la política de privacidad,
            no dudes en contactar con nosotros:
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
