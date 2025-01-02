import CardWithHeader from '@/components/_Atoms/boxes/card-with-header'
import LinkButton from '@/components/_Atoms/buttons/link-button'
import PageContainer from '@/components/theming/page-container'

export default function CookiePolicyPage() {
  return (
    <PageContainer>
      <CardWithHeader defaultWidth="xl">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Política de Cookies</h1>

          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo cuando visitas un sitio web. Estas cookies ayudan a que
            el sitio funcione correctamente, mejoren tu experiencia de usuario y
            proporcionen información a los propietarios del sitio sobre cómo se
            está utilizando la plataforma.
          </p>

          <h2 className="text-lg font-semibold my-2">
            1.{' '}
            <span className="text-emphasis">
              Tipos de cookies que utilizamos
            </span>
          </h2>
          <p className="mb-4">
            En el caso de Subterra no utilizamos cookies de obtención de
            información. Solo utilizamos una cookie para almacenar la sesión
            iniciada y otra para guardar las preferencias del usuario. Estas
            solo se usan si tienes una cuenta de usuario y con el fin de mostrar
            la información de tu cuenta. Desaparecen automáticamente pasado un
            periodo de tiempo, tras el cual tendrás que volver a iniciar sesión.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            2. <span className="text-emphasis">Cómo gestionar las cookies</span>
          </h2>
          <p className="mb-4">
            Puedes controlar y gestionar las cookies desde la configuración de
            tu navegador. La mayoría de los navegadores te permiten aceptar,
            rechazar o eliminar cookies, así como configurar preferencias para
            ciertos sitios web. Puedes hacer eso y seguir utilizando Subterra,
            sin embargo, las funciones que requieran de estar registrado pueden
            verse afectadas.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            3.{' '}
            <span className="text-emphasis">
              Cambios en la Política de Cookies
            </span>
          </h2>
          <p className="mb-4">
            Nos reservamos el derecho de modificar esta Política de Cookies en
            cualquier momento. Las modificaciones serán notificadas a los
            usuarios a través de la plataforma y/o por correo electrónico.
          </p>

          <h2 className="text-lg font-semibold mb-2">
            4. <span className="text-emphasis">Contacto</span>
          </h2>
          <p>
            Si tienes alguna duda o comentario sobre la política de cookies, no
            dudes en contactar con nosotros:
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
