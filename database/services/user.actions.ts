'use server'
import {
  SignInSchema,
  SignInValues,
  SignUpSchema,
  SignUpValues,
} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/answer.type'
import {connectToMongoDB} from '@/database/databaseConection'
import User from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {Profile} from 'next-auth'

/**
 * @version 1
 * @description Función para registrar un usuario
 * @param values SignUpValues - Valores de registro
 */
export async function signUp(values: SignUpValues) {
  //1. Validación de datos
  const validationResult = SignUpSchema.safeParse(values)

  //? safeParse evita generar errores. En su lugar devuelve un objeto con la propiedad success o error.

  if (!validationResult.success) {
    return {ok: false, code: 400, message: 'Datos inválidos'} as Answer
  }
  //2. Añadir a la base de datos
  const {name, fullname, email, password} = validationResult.data
  try {
    const newUser = new User({
      name,
      fullname,
      email,
      password,
    })
    await connectToMongoDB()
    await newUser.save()

    //3. Devolver respuesta
    return {
      ok: true,
      code: 200,
      message: 'Usuario creado',
    } as Answer
  } catch (e) {
    return decodeMongoError(e)
  }
}

/**
 * @version 1
 * @description Función para comprobar las credenciales de un usuario
 * @param credentials SignInValues - Credenciales de inicio de sesión
 */
export async function checkCredentials(credentials: SignInValues) {
  try {
    //1. Validación de datos (ZOD)
    const validationResult = SignInSchema.safeParse(credentials)
    if (!validationResult.success) throw new Error('Datos inválidos')

    // 2. Buscar usuario en base de datos (MONGOOSE
    const {email, password} = validationResult.data
    await connectToMongoDB()
    const user = await User.findOne({
      email: email,
    }).select('password email image _id name')
    if (!user) throw new Error('Usuario no encontrado')

    // 3. Comprobar credenciales
    const validPass = await user.comparePassword(password)

    // 4. Devolver respuesta sin password

    if (validPass)
      return {
        email: user.email,
        image: user.image,
        name: user.name,
        _id: user._id.toString(),
      }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function signUpWithGoogle(profile: Profile | undefined) {
  try {
    //? Checkeo de email_verified para evitar usuarios no verificados en el proveedor de OAuth
    if (!profile || !profile.email_verified) return false // Perfil no válido

    const newUser = new User({
      name: profile.name,
      email: profile.email,
      email_verified: new Date(),
      OAuthId: profile.sub,
    })
    await newUser.save()
    return true
  } catch (error) {
    console.error(error)
    return false // Error al insertar usuario en la DB o error al buscarlo
  }
}

export async function findUserByEmail(email: string | null | undefined) {
  try {
    await connectToMongoDB()
    const user = await User.findOne({email})
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
