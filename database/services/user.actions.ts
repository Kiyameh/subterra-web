'use server'
import {
  ProfileEditSchema,
  ProfileEditValues,
  ResetPassSchema,
  ResetPassValues,
  SignUpSchema,
  SignUpValues,
} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/answer.type'
import {connectToMongoDB} from '@/database/databaseConection'
import User, {UserDocument} from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import Group from '../models/Group.model'
import Instance from '../models/Instance.model'
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
  const {name, fullname, email, password} = validationResult.data

  //2. Actualizar datos de usuario
  try {
    const user = await User.findOne({email})
    user.name = name
    user.fullname = fullname
    user.password = password
    user.save()

    //3. Devolver respuesta
    return {
      ok: true,
      code: 200,
      message: `Datos actualizados correctamente`,
    } as Answer
  } catch (e) {
    console.error(e)
    return decodeMongoError(e)
  }
}

/**
 * @version 2
 * @description Función para comprobar las credenciales de un usuario
 * @param email string - Email del usuario
 * @param password string - Contraseña del usuario
 */

export async function findUserByCredentials(email: string, password: string) {
  try {
    // 2. Buscar usuario en base de datos (MONGOOSE
    await connectToMongoDB()

    const user = await User.findOne({email: email}).select(
      'password email image _id name'
    )

    if (!user) return null

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

/**
 * @version 1
 * @description Función para buscar un usuario por email
 * @param email string - Email del usuario
 */

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

/**
 * @version 1
 * @description Función para buscar un usuario por id
 * @param id
 */
export async function getFullUser(id: string | null | undefined) {
  try {
    await connectToMongoDB()
    const user = await User.findById(id)
      .populate({path: 'memberOf', select: 'name fullname', model: Group})
      .populate({path: 'adminOf', select: 'name fullname', model: Group})
      .populate({path: 'editorOf', select: 'name fullname', model: Instance})
      .populate({
        path: 'coordinatorOf',
        select: 'name fullname',
        model: Instance,
      })
      .populate({path: 'viewerOf', select: 'name fullname', model: Instance})
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * @type Retorno de la función getFullUser
 */
export interface FullUser
  extends Omit<
    UserDocument,
    'memberOf' | 'adminOf' | 'editorOf' | 'coordinatorOf' | 'viewerOf'
  > {
  memberOf: {id: string; name: string; fullname: string}[]
  adminOf: {id: string; name: string; fullname: string}[]
  editorOf: {id: string; name: string; fullname: string}[]
  coordinatorOf: {id: string; name: string; fullname: string}[]
  viewerOf: {id: string; name: string; fullname: string}[]
}

/**
 * @version 1
 * @description Función para verificar un email
 * @param email
 */

export async function verifyEmail(email: string | null | undefined) {
  try {
    await connectToMongoDB()
    await User.findOneAndUpdate({email}, {email_verified: true}, {new: true})
  } catch (error) {
    console.error(error)
  }
}

/**
 * @version 1
 * @description Función para actualizar la contraseña de un usuario
 * @param values ResetPassValues - Valores de actualización
 */

export async function updatePassword(values: ResetPassValues) {
  //1. Validación de datos
  const validationResult = ResetPassSchema.safeParse(values)
  if (!validationResult.success) {
    return {ok: false, code: 400, message: 'Datos inválidos'} as Answer
  }
  const {email, password} = validationResult.data

  //2. Actualizar contraseña
  try {
    await connectToMongoDB()
    const userToUpdate = await User.findOne({email}).select('password')
    userToUpdate.password = password
    await userToUpdate.save()

    return {ok: true, code: 200, message: 'Contraseña actualizada'} as Answer
  } catch (error) {
    console.error(error)
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Función para actualizar un usuario
 * @param values SignUpValues - Valores de actualización
 */

export async function updateUser(values: ProfileEditValues) {
  //1. Validación de datos
  const validationResult = ProfileEditSchema.safeParse(values)
  console.log(validationResult.error)
  if (!validationResult.success) {
    return {ok: false, code: 400, message: 'Datos inválidos'} as Answer
  }
  const {email, name, fullname} = validationResult.data

  //2. Actualizar usuario
  try {
    await connectToMongoDB()
    await User.findOneAndUpdate({email}, {name, fullname})
    return {ok: true, code: 200, message: 'Usuario actualizado'} as Answer
  } catch (error) {
    console.error(error)
    return decodeMongoError(error)
  }
}

/**
 * @version 1
 * @description Función para eliminar un usuario
 * @param email
 */

export async function deleteUser(email: string | null | undefined) {
  try {
    await connectToMongoDB()
    await User.findOneAndDelete({email})
    return {ok: true, code: 200, message: 'Usuario eliminado'} as Answer
  } catch (error) {
    console.error(error)
    return decodeMongoError(error)
  }
}
