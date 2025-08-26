import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {HelpTopic, HelpCategory} from '@/documentation/types'
import FloatingContactButton from '@/components/Templates/staff-dashboard/floating-contact-form/floating-contact-button'
import {Button} from '@/components/Atoms/button'

// Create a map of all help categories
export const helpCategories: Record<string, HelpCategory> = {
  'getting-started': {
    id: 'getting-started',
    title: 'Primeros Pasos',
    description: 'Todo lo que necesitas para comenzar',
    content: (
      <>
        <h3>Primeros Pasos con Nuestra Aplicación</h3>
        <p>
          Esta sección te guiará a través de los conceptos básicos para comenzar
          a utilizar nuestra aplicación. Aprenderás cómo configurar tu cuenta,
          navegar por la interfaz y realizar tareas básicas.
        </p>
      </>
    ),
    topics: ['intro', 'navigation'],
  },
  accounts: {
    id: 'accounts',
    title: 'Ayuda sobre Cuentas de Usuario',
    description: 'Gestión de cuentas y perfiles de usuario',
    content: (
      <p>
        Bienvenido a la sección de ayuda sobre cuentas de usuario. Aquí
        encontrarás información detallada sobre cómo gestionar tu cuenta en la
        aplicación.
      </p>
    ),
    topics: [
      'account-creation',
      'account-profile',
      'account-delete',
      'account-issues',
      'account-security',
      'account-recovery',
    ],
  },
  grupos: {
    id: 'grupos',
    title: 'Ayuda de los Grupos',
    description: 'Gestión y participación en grupos de espeleólogos',
    content: (
      <p>
        Los grupos en la aplicación representan equipos de espeleólogos que
        trabajan juntos. Aquí encontrarás información sobre cómo crear,
        gestionar y participar en un grupo.
      </p>
    ),
    topics: [
      'group-creation',
      'group-access',
      'group-roles',
      'group-admin',
      'group-leave',
    ],
  },
  instancias: {
    id: 'instancias',
    title: 'Ayuda sobre las Instancias',
    description: 'Gestión de instancias para territorios específicos',
    content: (
      <p>
        Las instancias en Subterra sirven para agrupar los datos de un
        territorio específico y son administradas por un único grupo. Este grupo
        es el responsable de su mantenimiento y actualización.
      </p>
    ),
    topics: [
      'instance-creation',
      'instance-edit',
      'instance-visibility',
      'instance-roles',
    ],
  },
  documentos: {
    id: 'documentos',
    title: 'Ayuda sobre los Documentos',
    description: 'Gestión de documentos dentro de las instancias',
    content: (
      <p>
        En Subterra, la información dentro de cada instancia se organiza en
        documentos. Cada documento representa una pieza clave de información
        sobre el territorio explorado y facilita la colaboración entre
        espeleólogos.
      </p>
    ),
    topics: ['document-types', 'document-management', 'document-versions'],
  },
}

// Create a map of all help topics
export const helpTopics: Record<string, HelpTopic> = {
  // Index topic - shows a list of all available categories
  index: {
    id: 'index',
    title: 'Índice de Ayuda',
    description: 'Explora todas las categorías de ayuda disponibles',
    content: (
      <>
        <p>
          Selecciona una categoría para explorar los temas de ayuda disponibles.
        </p>

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Categorías Principales</h3>
          <ul className="space-y-1 list-disc pl-5">
            {Object.values(helpCategories).map((category, index) => (
              <li key={category.id}>
                <span className="text-muted-foreground mr-2">{index + 1}.</span>
                <Link
                  href={`?help=category-${category.id}`}
                  className="text-emphasis hover:underline"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t">
          <h3 className="text-lg font-medium mb-2">Documentación Completa</h3>
          <p>
            Para una documentación más completa, visita nuestra{' '}
            <Link
              href="/guide"
              className="text-emphasis hover:underline"
            >
              guía de ayuda completa
            </Link>
            .
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'intro', title: 'Introducción'},
      {id: 'navigation', title: 'Navegación por la Aplicación'},
    ],
    parentId: 'getting-started',
  },

  // Default topic shown when no specific topic is found
  default: {
    id: 'default',
    title: 'Centro de Ayuda',
    description: 'Explora todas las categorías de ayuda disponibles',
    content: (
      <>
        <p>
          No encontramos lo que buscas. Puedes explorar las categorías de ayuda
          disponibles o escribirnos si crees que falta algo.
        </p>

        <div className="mt-4 flex justify-center items-center gap-2">
          <FloatingContactButton />
          <span className="text-lg">Contacto</span>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Categorías Principales</h3>
          <ul className="space-y-1 list-disc pl-5">
            {Object.values(helpCategories).map((category, index) => (
              <li key={category.id}>
                <span className="text-muted-foreground mr-2">{index + 1}.</span>
                <Link
                  href={`?help=category-${category.id}`}
                  className="text-emphasis hover:underline"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t">
          <h3 className="text-lg font-medium mb-2">Documentación Completa</h3>
          <p>
            Para una documentación más completa, visita nuestra{' '}
            <Link
              href="/guide"
              className="text-emphasis hover:underline"
            >
              guía de ayuda completa
            </Link>
            .
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'intro', title: 'Introducción'},
      {id: 'navigation', title: 'Navegación por la Aplicación'},
    ],
    parentId: 'getting-started',
  },

  // Introduction topic
  intro: {
    id: 'intro',
    title: 'Introducción',
    description: 'Introducción a nuestra aplicación',
    parentId: 'getting-started',
    content: (
      <div className="prose space-y-2">
        <h3 className="text-xl my-4">Bienvenid@ a Subterra</h3>
        <p>
          Esta guía te ayudará a familiarizarte con nuestra aplicación y sus
          características principales.
        </p>
        <p>
          Subterra es una aplicación pensada para el almacenamiento de datos
          espeleológicos.
        </p>
        <p>
          Esto significa que puedes usar Subterra para almacenar datos de tus
          exploraciones, documentar las cavidades y compartir la información con
          tus compañeros.
        </p>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/overview.png"
            alt="Vista general de la aplicación"
            width={400}
            height={200}
            className="w-full"
          />
        </div>
      </div>
    ),
    relatedTopics: [
      {id: 'navigation', title: 'Navegación por la Aplicación'},
      {id: 'account-creation', title: 'Crear una Cuenta'},
    ],
  },

  // Navigation topic
  navigation: {
    id: 'navigation',
    title: 'Navegación por la Aplicación',
    description: 'Aprende a navegar por la interfaz',
    parentId: 'getting-started',
    content: (
      <>
        <h3 className="text-xl my-4">Navegación por la Aplicación</h3>
        <p>
          Subterra tiene dos navegaciones principales: La barra superior y el
          menú lateral.
        </p>

        <h4 className="text-xl text-muted-foreground my-4">
          A. Barra superior
        </h4>
        <p>
          En la barra superior puedes encontrar el logo de Subterra, el
          principal, el formulario de contacto y la ayuda.
        </p>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/upper_menu.png"
            alt="Barra de navegación superior"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <h4 className="text-xl text-muted-foreground my-4">B. Menú Lateral</h4>
        <p>
          El menú lateral tiene elementos de la instancia activa o del grupo
          seleccionado (En función de la navegación que estés realizando).
          Puedes cambiar de elemento en cualquier momento con el desplegable
          superior.
        </p>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/lateral_menu.png"
            alt="Menú lateral"
            width={400}
            height={200}
            className="w-full"
          />
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'intro', title: 'Introducción'},
      {id: 'group-creation', title: 'Creación y Gestión de un Grupo'},
    ],
  },

  // Tema 1: Crear una cuenta
  'account-creation': {
    id: 'account-creation',
    title: 'Crear una Cuenta',
    description: 'Cómo crear una nueva cuenta en la aplicación',
    parentId: 'accounts',
    content: (
      <>
        <h3 className="text-xl my-4">Crear una Cuenta</h3>
        <p>Existen dos formas de crear una cuenta:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
            <h4 className="text-xl text-muted-foreground">
              Correo Electrónico
            </h4>
            <p>
              Introduce tu email y recibirás un correo para completar los datos
              de tu cuenta.
            </p>
          </div>

          <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
            <h4 className="text-xl text-muted-foreground">Cuenta de Google</h4>
            <p>Inicia sesión con tu cuenta de Google.</p>
          </div>
        </div>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/register.png"
            alt="Opciones de registro de cuenta"
            width={400}
            height={200}
            className="w-full"
          />
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'account-profile', title: 'Modificar Perfil'},
      {id: 'account-security', title: 'Seguridad y Privacidad'},
    ],
  },

  // Tema 2: Modificar perfil
  'account-profile': {
    id: 'account-profile',
    title: 'Modificar Perfil',
    description: 'Cómo actualizar la información de tu perfil',
    parentId: 'accounts',
    content: (
      <>
        <h3 className="text-xl my-4">Modificar Perfil</h3>
        <p>Desde la página de perfil puedes:</p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Actualizar tu información personal.</li>
          <li>
            Consultar y gestionar los roles asignados dentro de la aplicación.
          </li>
        </ul>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/profile_edit.png"
            alt="Página de edición de perfil"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <Button variant="link">
          <Link href="/auth/profile/edit">Editar perfil</Link>
        </Button>

        <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-4">
          <p className="text-sm">
            <strong>Consejo:</strong> Mantén tu información de perfil
            actualizada para facilitar la comunicación con otros miembros de la
            plataforma.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'account-creation', title: 'Crear una Cuenta'},
      {id: 'account-delete', title: 'Eliminar Cuenta'},
    ],
  },

  // Tema 3: Eliminar cuenta
  'account-delete': {
    id: 'account-delete',
    title: 'Eliminar Cuenta',
    description: 'Cómo eliminar permanentemente tu cuenta',
    parentId: 'accounts',
    content: (
      <>
        <h3 className="text-xl my-4">Eliminar Cuenta</h3>
        <p>
          Para eliminar la cuenta ponte en contacto con los administradores de
          la plataforma
        </p>

        <Button variant="link">
          <Link href="/auth/contact">Contactar con los administradores</Link>
        </Button>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/contact.png"
            alt="Contacto con los administradores"
            width={400}
            height={200}
            className="w-full"
          />
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'account-profile', title: 'Modificar Perfil'},
      {id: 'account-recovery', title: 'Recuperación de Cuenta'},
    ],
  },

  // Tema 4: Problemas frecuentes
  'account-issues': {
    id: 'account-issues',
    title: 'Problemas Frecuentes',
    description: 'Soluciones a problemas comunes con las cuentas',
    parentId: 'accounts',
    content: (
      <>
        <h3 className="text-xl my-4">Problemas Frecuentes</h3>
        <p>
          Si experimentas dificultades con tu cuenta, aquí hay soluciones a
          problemas comunes:
        </p>

        <div className="space-y-4 my-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">
              No recibí el correo de confirmación
            </h4>
            <p>
              Verifica tu carpeta de spam y asegúrate de que ingresaste el email
              correctamente.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">
              No puedo iniciar sesión con Google
            </h4>
            <p>Revisa que tu cuenta de Google esté activa.</p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Olvidé mi contraseña</h4>
            <p>
              Usa la opción de recuperación de contraseña en la página de inicio
              de sesión.
            </p>

            <Button variant="link">
              <Link href="/auth/forgot-password">Recuperar contraseña</Link>
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-4">
          <p className="text-sm">
            <strong>Nota:</strong> Si continúas experimentando problemas,
            contacta con nuestro equipo de soporte para recibir asistencia
            personalizada.
          </p>
          <Button variant="link">
            <Link href="/auth/contact">Contactar con los administradores</Link>
          </Button>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'account-recovery', title: 'Recuperación de Cuenta'},
      {id: 'account-security', title: 'Seguridad y Privacidad'},
    ],
  },

  // Tema 5: Seguridad y privacidad
  'account-security': {
    id: 'account-security',
    title: 'Seguridad y Privacidad',
    description: 'Cómo mantener tu cuenta segura',
    parentId: 'accounts',
    content: (
      <>
        <h3 className="text-xl my-4">Seguridad y Privacidad</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Protege tu cuenta con una contraseña segura.</li>
          <li>No compartas tu información de inicio de sesión.</li>
          <li>
            Consulta nuestra política de privacidad para más detalles sobre el
            manejo de tus datos.
          </li>
        </ul>

        <h4 className="text-xl text-muted-foreground my-4">
          Recomendaciones para una contraseña segura:
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Utiliza al menos 8 caracteres.</li>
          <li>Combina letras mayúsculas y minúsculas, números y símbolos.</li>
          <li>Evita información personal fácil de adivinar.</li>
          <li>No reutilices contraseñas de otros servicios.</li>
        </ul>
      </>
    ),
    relatedTopics: [
      {id: 'account-creation', title: 'Crear una Cuenta'},
      {id: 'account-recovery', title: 'Recuperación de Cuenta'},
    ],
  },

  // Tema 6: Recuperación de cuenta
  'account-recovery': {
    id: 'account-recovery',
    title: 'Recuperación de Cuenta',
    description: 'Opciones para recuperar el acceso a tu cuenta',
    parentId: 'accounts',
    content: (
      <>
        <h3 className="text-xl my-4">Recuperación de Cuenta</h3>
        <p>Si tienes problemas para acceder a tu cuenta, puedes:</p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Usar la opción de recuperación por email.</li>
          <li>Contactar con soporte si necesitas ayuda adicional.</li>
        </ul>

        <Button variant="link">
          <Link href="/auth/forgot-password">Recuperar contraseña</Link>
        </Button>
        <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-4 my-4">
          <p className="text-sm">
            <strong>Importante:</strong> Para recuperar tu cuenta, necesitarás
            acceso al correo electrónico asociado a ella. Asegúrate de mantener
            actualizada esta información.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'account-issues', title: 'Problemas Frecuentes'},
      {id: 'account-security', title: 'Seguridad y Privacidad'},
    ],
  },

  // Tema 1: Creación y gestión de un grupo
  'group-creation': {
    id: 'group-creation',
    title: 'Creación y Gestión de un Grupo',
    description: 'Cómo crear y configurar un nuevo grupo',
    parentId: 'grupos',
    content: (
      <>
        <h3 className="text-xl my-4">Creación y Gestión de un Grupo</h3>
        <p>
          Los grupos son asociaciones de usuarios que colaboran en una
          instancia. Pueden representar un club o agrupación real, pero no es un
          requisito obligatorio.
        </p>

        <h4 className="text-xl text-muted-foreground my-4">
          Crear un Nuevo Grupo
        </h4>
        <p>
          Una vez hayas iniciado sesión, podrás crear un grupo desde el
          formulario de Creación de grupo. Se te pedirá cierta información que
          será visible en la página principal del grupo. Asegúrate de no incluir
          datos que no quieres que sean públicos.
        </p>

        <Button variant="link">
          <Link href="/auth/create-group">Crear un nuevo grupo</Link>
        </Button>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/create_group.png"
            alt="Formulario de creación de grupo"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <h4 className="text-xl text-muted-foreground my-4">
          Capacidades de los Administradores
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Editar la información del grupo (nombre, descripción, ubicación,
            datos de contacto, etc.).
          </li>
          <li>
            Subir un logotipo para que el grupo tenga una identidad visual.
          </li>
          <li>
            Solicitar instancias a la plataforma: Estas instancias son bases de
            datos independientes donde se almacena información espeleológica
            específica del grupo.
          </li>
        </ul>
      </>
    ),
    relatedTopics: [
      {id: 'group-access', title: 'Acceder a un Grupo'},
      {id: 'group-roles', title: 'Roles dentro del Grupo'},
      {id: 'instance-creation', title: 'Crear una Instancia'},
    ],
  },

  // Tema 2: Acceder a un grupo
  'group-access': {
    id: 'group-access',
    title: 'Acceder a un Grupo',
    description: 'Cómo unirse a un grupo existente',
    parentId: 'grupos',
    content: (
      <>
        <h3 className="text-xl my-4">Acceder a un Grupo</h3>
        <p>
          Si deseas colaborar con un grupo, puedes enviar una solicitud de
          acceso desde la página pública del grupo.
        </p>

        <h4 className="text-xl text-muted-foreground my-4">
          Pasos para Unirse a un Grupo
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Dirígete a la página principal del grupo.</li>
          <li>Envía la solicitud desde el banner superior.</li>
          <li>
            Ten paciencia, ya que el administrador del grupo debe revisar y
            aprobar tu solicitud.
          </li>
        </ul>

        <p className="text-muted-foreground italic">
          Es necesario tener la sesión iniciada para ver esta opción.
        </p>
      </>
    ),
    relatedTopics: [
      {id: 'group-creation', title: 'Creación y Gestión de un Grupo'},
      {id: 'group-roles', title: 'Roles dentro del Grupo'},
    ],
  },

  // Tema 3: Roles dentro del grupo
  'group-roles': {
    id: 'group-roles',
    title: 'Roles dentro del Grupo',
    description: 'Diferentes roles y sus permisos',
    parentId: 'grupos',
    content: (
      <>
        <h3 className="text-xl my-4">Roles dentro del Grupo</h3>
        <p>Una vez dentro del grupo, puedes tener uno de estos dos roles:</p>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/group_roles.png"
            alt="Roles de usuario en un grupo"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <h4 className="text-xl text-muted-foreground my-4">Tipos de Roles</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Administrador:</strong> Tiene permisos para editar la
            información del grupo, aceptar o rechazar solicitudes de acceso y
            promocionar a otros miembros como administradores.
          </li>
          <li>
            <strong>Miembro:</strong> Puede ver la información interna del grupo
            y participar en la actividad del mismo.
          </li>
        </ul>

        <p className="mt-4">
          Por defecto, el creador del grupo será asignado como administrador,
          pero podrá promocionar a otros usuarios y/o renunciar a su rol.
        </p>
      </>
    ),
    relatedTopics: [
      {id: 'group-admin', title: 'Modificación y Administración del Grupo'},
      {id: 'group-leave', title: 'Renuncia al Grupo o Cambio de Rol'},
      {id: 'instance-roles', title: 'Roles dentro de la Instancia'},
    ],
  },

  // Tema 4: Modificación y administración del grupo
  'group-admin': {
    id: 'group-admin',
    title: 'Modificación y Administración del Grupo',
    description: 'Gestión avanzada de grupos',
    parentId: 'grupos',
    content: (
      <>
        <h3 className="text-xl my-4">
          Modificación y Administración del Grupo
        </h3>
        <p>
          Como administrador de un grupo, tienes acceso a funciones avanzadas
          para gestionar todos los aspectos del grupo.
        </p>

        <h4 className="text-xl text-muted-foreground my-4">
          Capacidades de los Administradores
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Editar los datos generales del grupo.</li>
          <li>Gestionar las solicitudes de acceso.</li>
          <li>Promocionar o degradar a otros usuarios.</li>
          <li>Aceptar o eliminar miembros del grupo.</li>
          <li>
            Modificar la información pública mostrada en la página del grupo.
          </li>
        </ul>

        <p className="mt-4">
          Recuerda que como administrador tienes la responsabilidad de mantener
          un ambiente colaborativo y productivo dentro del grupo.
        </p>
      </>
    ),
    relatedTopics: [
      {id: 'group-creation', title: 'Creación y Gestión de un Grupo'},
      {id: 'group-roles', title: 'Roles dentro del Grupo'},
      {id: 'instance-creation', title: 'Crear una Instancia'},
    ],
  },

  // Tema 5: Renuncia al grupo o cambio de rol
  'group-leave': {
    id: 'group-leave',
    title: 'Renuncia al Grupo o Cambio de Rol',
    description: 'Cómo dejar un grupo o cambiar tu rol',
    parentId: 'grupos',
    content: (
      <>
        <h3 className="text-xl my-4">Renuncia al Grupo o Cambio de Rol</h3>
        <p>
          Cualquier miembro o administrador puede renunciar a su rol en
          cualquier momento.
        </p>

        <h4>Opciones Disponibles</h4>

        <ul className="list-disc pl-5 space-y-1">
          <li>Los administradores pueden decidir volver a ser miembros.</li>
          <li>
            Antes de renunciar el ultimo administrador, se le pedirá que designe
            un nuevo administrador.
          </li>
          <li>Los miembros pueden dejar el grupo si así lo desean.</li>
        </ul>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/group_roles_quit.png"
            alt="Opciones para dejar un grupo o cambiar rol"
            width={400}
            height={200}
            className="w-full"
          />
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'group-roles', title: 'Roles dentro del Grupo'},
      {id: 'group-admin', title: 'Modificación y Administración del Grupo'},
    ],
  },

  // Tema 1: Crear una instancia
  'instance-creation': {
    id: 'instance-creation',
    title: 'Crear una Instancia',
    description: 'Cómo solicitar y configurar una nueva instancia',
    parentId: 'instancias',
    content: (
      <>
        <h3 className="text-xl my-4">Crear una Instancia</h3>
        <p>Para solicitar una instancia, sigue estos pasos:</p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Asegúrate de que tu grupo está creado.</li>
          <li>Accede a la pestaña Editar grupo.</li>
          <li>
            Solo los administradores del grupo pueden acceder a esta opción.
          </li>
          <li>Cada grupo puede tener un máximo de tres instancias.</li>
        </ul>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/instance_request.png"
            alt="Solicitud de creación de instancia"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <p>
          En la solicitud se pedirá información relevante sobre la instancia. Se
          recomienda incluir todos los datos necesarios, como enlaces a páginas
          externas o mapas.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-4">
          <p className="text-sm">
            <strong>Nota:</strong> La creación de una instancia está sujeta a
            revisión por parte del equipo de Subterra. Una vez aprobada,
            recibirás una notificación y podrás comenzar a utilizarla.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'instance-edit', title: 'Editar una Instancia'},
      {id: 'instance-visibility', title: 'Visibilidad y Edición'},
      {id: 'group-creation', title: 'Creación y Gestión de un Grupo'},
      {id: 'document-types', title: 'Tipos de Documentos'},
    ],
  },

  // Tema 2: Editar una instancia
  'instance-edit': {
    id: 'instance-edit',
    title: 'Editar una Instancia',
    description: 'Cómo modificar la configuración de una instancia existente',
    parentId: 'instancias',
    content: (
      <>
        <h3 className="text-xl my-4">Editar una Instancia</h3>
        <p>
          Una vez creada la instancia, el coordinador de la instancia puede:
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Editar los datos generales de la instancia.</li>
          <li>Administrar los roles asignados a los miembros.</li>
        </ul>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/instance_edit.png"
            alt="Panel de edición de instancia"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <p>
          Para editar una instancia, accede a la página de la instancia y
          selecciona la opción &quot;Editar&quot; en el menú de administración.
          Recuerda que solo los coordinadores tienen acceso a estas opciones.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-4">
          <p className="text-sm">
            <strong>Consejo:</strong> Mantén la información de tu instancia
            actualizada para facilitar su uso por parte de todos los miembros
            del grupo.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'instance-creation', title: 'Crear una Instancia'},
      {id: 'instance-roles', title: 'Roles dentro de la Instancia'},
      {id: 'document-management', title: 'Creación y Edición de Documentos'},
    ],
  },

  // Tema 3: Visibilidad y edición
  'instance-visibility': {
    id: 'instance-visibility',
    title: 'Visibilidad y Edición',
    description: 'Opciones de privacidad y permisos de edición para instancias',
    parentId: 'instancias',
    content: (
      <>
        <h3 className="text-xl my-4">Visibilidad y Edición</h3>
        <p>Las instancias pueden ser públicas o privadas:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
            <h4 className="text-xl text-muted-foreground my-4">
              Instancias Públicas
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Son gratuitas</li>
              <li>
                Visibles para cualquier persona que acceda a la plataforma
              </li>
              <li>Solo los miembros asignados pueden editarlas</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 bg-purple-50 dark:bg-purple-950">
            <h4 className="text-xl text-muted-foreground my-4">
              Instancias Privadas
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Solo pueden ser vistas y editadas por los miembros con acceso
              </li>
              <li>Requieren una suscripción anual</li>
              <li>Detalles disponibles en la sección de precios</li>
            </ul>
          </div>
        </div>

        <p>
          La configuración de visibilidad se establece durante la creación de la
          instancia, pero puede ser modificada posteriormente por el coordinador
          de la instancia.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-4 my-4">
          <p className="text-sm">
            <strong>Importante:</strong> Cambiar una instancia de pública a
            privada requerirá activar una suscripción si no se tiene una activa.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'instance-creation', title: 'Crear una Instancia'},
      {id: 'instance-edit', title: 'Editar una Instancia'},
    ],
  },

  // Tema 4: Roles dentro de la instancia
  'instance-roles': {
    id: 'instance-roles',
    title: 'Roles dentro de la Instancia',
    description: 'Diferentes roles y sus permisos en una instancia',
    parentId: 'instancias',
    content: (
      <>
        <h3 className="text-xl my-4">Roles dentro de la Instancia</h3>
        <p>
          Los miembros del grupo pueden tener los siguientes roles en una
          instancia:
        </p>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/instance_roles.png"
            alt="Roles de usuario en una instancia"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <h4 className="text-xl text-muted-foreground my-4">Tipos de Roles</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Coordinador:</strong> Puede editar la información general de
            la instancia y promocionar o degradar usuarios.
          </li>
          <li>
            <strong>Editor:</strong> Tiene permisos para crear, modificar y
            eliminar documentos dentro de la base de datos de la instancia.
          </li>
        </ul>

        <p className="mt-4">
          Por defecto, el creador de la instancia será asignado como
          coordinador, pero podrá promocionar a otros usuarios y/o renunciar a
          su rol.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-4">
          <p className="text-sm">
            <strong>Nota:</strong> Es recomendable tener al menos dos
            coordinadores por instancia para garantizar la continuidad en caso
            de que uno no esté disponible.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'instance-edit', title: 'Editar una Instancia'},
      {id: 'group-roles', title: 'Roles dentro del Grupo'},
      {id: 'document-management', title: 'Creación y Edición de Documentos'},
    ],
  },

  // Tema 1: Tipos de documentos
  'document-types': {
    id: 'document-types',
    title: 'Tipos de Documentos',
    description: 'Diferentes tipos de documentos disponibles en Subterra',
    parentId: 'documentos',
    content: (
      <>
        <h3 className="text-xl my-4">Tipos de Documentos</h3>
        <p>Actualmente, existen tres tipos de documentos en Subterra:</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
            <h4 className="text-xl text-muted-foreground my-4">Cavidad</h4>
            <p>Representa una única cavidad o boca de acceso a un sistema.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Ejemplo: Cueva de Coventosa.
            </p>
          </div>

          <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
            <h4 className="text-xl text-muted-foreground my-4">Sistema</h4>
            <p>Representa la unión de varias cavidades interconectadas.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Ejemplo: Sistema de la Gandara.
            </p>
          </div>

          <div className="border rounded-lg p-4 bg-purple-50 dark:bg-purple-950">
            <h4 className="text-xl text-muted-foreground my-4">Exploración</h4>
            <p>Registra un evento realizado por un grupo de personas.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Ejemplo: Una jornada de exploración.
            </p>
          </div>
        </div>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/document_types.png"
            alt="Tipos de documentos en Subterra"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <p>
          Estos documentos estructuran la información de forma eficiente para
          facilitar el acceso y la gestión de datos sobre cada zona de interés.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-4">
          <p className="text-sm">
            <strong>Nota:</strong> Cada tipo de documento tiene campos
            específicos diseñados para capturar la información más relevante
            para ese tipo de entidad.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'document-management', title: 'Creación y Edición de Documentos'},
      {id: 'document-versions', title: 'Control de Versiones'},
      {id: 'instance-creation', title: 'Crear una Instancia'},
    ],
  },

  // Tema 2: Creación y edición de documentos
  'document-management': {
    id: 'document-management',
    title: 'Creación y Edición de Documentos',
    description: 'Cómo crear y gestionar documentos en una instancia',
    parentId: 'documentos',
    content: (
      <>
        <h3 className="text-xl my-4">Creación y Edición de Documentos</h3>
        <p>Los usuarios con permisos de editor pueden:</p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Crear nuevos documentos dentro de una instancia.</li>
          <li>Editar documentos existentes para ampliar su información.</li>
          <li>
            Consultar los listados de todos los documentos de un tipo dentro de
            una instancia.
          </li>
          <li>Eliminar documentos que ya no sean necesarios.</li>
        </ul>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/document_creation.png"
            alt="Interfaz de creación de documentos"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-4 my-4">
          <p className="text-sm">
            <strong>Importante:</strong> Asegúrate de tener los permisos
            necesarios antes de intentar crear o editar documentos. Solo los
            usuarios con rol de editor o coordinador pueden realizar estas
            acciones.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'document-types', title: 'Tipos de Documentos'},
      {id: 'document-versions', title: 'Control de Versiones'},
      {id: 'instance-roles', title: 'Roles dentro de la Instancia'},
    ],
  },

  // Tema 3: Control de versiones
  'document-versions': {
    id: 'document-versions',
    title: 'Control de Versiones',
    description: 'Sistema de control de versiones para documentos',
    parentId: 'documentos',
    content: (
      <>
        <h3 className="text-xl my-4">Control de Versiones</h3>
        <p>
          Cada documento cuenta con un control de versiones, lo que permite:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Registrar automáticamente el histórico de modificaciones.</li>
          <li>Consultar versiones anteriores del documento.</li>
          <li>
            Restaurar información en caso de cambios incorrectos o pérdida de
            datos.
          </li>
        </ul>

        <div className="my-4 rounded-md overflow-hidden border">
          <Image
            src="/help/document_versions.png"
            alt="Historial de versiones de un documento"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <h4 className="text-xl text-muted-foreground my-4">
          Beneficios del Control de Versiones
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Trazabilidad completa de los cambios realizados en cada documento.
          </li>
          <li>
            Capacidad de comparar diferentes versiones para ver qué ha cambiado.
          </li>
          <li>
            Mayor seguridad al poder recuperar información anterior en caso de
            errores.
          </li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 p-4 my-4">
          <p className="text-sm">
            <strong>Consejo:</strong> Si tienes varios cambios por hacer procura
            agruparlos en una sola transacción, para no saturar el historial de
            versiones.
          </p>
        </div>
      </>
    ),
    relatedTopics: [
      {id: 'document-management', title: 'Creación y Edición de Documentos'},
      {id: 'document-types', title: 'Tipos de Documentos'},
    ],
  },
}

// Helper function to get the full path of a topic
export function getTopicPath(topicId: string): {title: string; id: string}[] {
  const topic = helpTopics[topicId]
  if (!topic) return []

  const path: {title: string; id: string}[] = [
    {title: topic.title, id: topic.id},
  ]

  if (topic.parentId) {
    const category = helpCategories[topic.parentId]
    if (category) {
      path.unshift({title: category.title, id: `category-${category.id}`})
    }
  }

  return path
}

// Helper function to get topics by category
export function getTopicsByCategory(categoryId: string): HelpTopic[] {
  const category = helpCategories[categoryId]
  if (!category) return []

  return category.topics.map((topicId) => helpTopics[topicId]).filter(Boolean)
}

if (helpTopics.intro && helpTopics.intro.relatedTopics) {
  helpTopics.intro.relatedTopics = helpTopics.intro.relatedTopics.map(
    (topic) =>
      topic.id === 'account-creation'
        ? {id: 'account-creation', title: 'Crear una Cuenta'}
        : topic
  )
}

if (helpTopics.index && helpTopics.index.relatedTopics) {
  helpTopics.index.relatedTopics = helpTopics.index.relatedTopics.map(
    (topic) =>
      topic.id === 'account-creation'
        ? {id: 'account-creation', title: 'Crear una Cuenta'}
        : topic
  )
}

if (helpTopics.default && helpTopics.default.relatedTopics) {
  helpTopics.default.relatedTopics = helpTopics.default.relatedTopics.map(
    (topic) =>
      topic.id === 'account-creation'
        ? {id: 'account-creation', title: 'Crear una Cuenta'}
        : topic
  )
}
