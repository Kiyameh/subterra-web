import {signOut} from '@/auth'
import {defaultAuthRedirect} from '@/routes'

/**
 * Conponente que envuelve a otros elementos y los convierte en un botón para cerrar sesión
 */
export function SignOutController({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  return (
    <form
      {...props}
      action={async () => {
        'use server'
        await signOut({redirectTo: defaultAuthRedirect})
      }}
    >
      {children}
    </form>
  )
}
