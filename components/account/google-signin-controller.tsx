import {signIn} from '@/auth'
import {defaultAuthRedirect} from '@/routes'

/**
 * Componente que envuelve a otros elementos y los convierte en un botón para iniciar sesión con Google OAuth
 */
export function SignInController({
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
        await signIn('google', {redirectTo: defaultAuthRedirect})
      }}
    >
      {children}
    </form>
  )
}
