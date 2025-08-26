'use server'
import {signIn} from '@/auth'
import {AuthError} from 'next-auth'

/**
 * @version 1
 * @description Función para iniciar sesión mediante next-auth (signin)
 * @param formData FormData - Datos del formulario
 * @param callbackUrl string - URL de redirección
 */

export async function loginUser(formData: FormData, callbackUrl: string) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: true,
      redirectTo: callbackUrl,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      // Está ocurriendo un error de autenticación
      return false
    } else {
      // Está ocurriendo un error de redirección de next
      throw error
    }
  }
}
