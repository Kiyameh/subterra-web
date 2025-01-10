'use server'
import {
  ProfileEditSchema,
  ProfileEditValues,
  ResetPassSchema,
  ResetPassValues,
  SignInSchema,
  SignInValues,
  SignUpSchema,
  SignUpValues,
} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/answer.type'
import {connectToMongoDB} from '@/database/databaseConection'
import User, {UserDocument} from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'
import {signIn} from '@/auth'

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

  //2: Enviar email de confirmación
  await signIn('resend', {
    email,
    redirect: false, // no redirigir actualmente
    redirectTo: '/auth/verify-email', // url de redirección enviada en el email
  })

  //3. Añadir a la base de datos
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
      message: `Se ha enviado un email de confirmación a ${email}, por favor revisa tu bandeja de entrada`,
    } as Answer
  } catch (e) {
    console.error(e)
    return decodeMongoError(e)
  }
}

/**
 * @version 1
 * @description Función para comprobar si un email ha sido verificado
 * @param email
 */

export async function checkVerifiedEmail(email: string) {
  try {
    await connectToMongoDB()
    const user = await User.findOne({email})

    return user?.email_verified
  } catch (error) {
    console.error(error)
    return null
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
      .populate('memberOf', 'name fullname')
      .populate('adminOf', 'name fullname')
      .populate('editorOf', 'name fullname')
      .populate('coordinatorOf', 'name fullname')
      .populate('viewerOf', 'name fullname')
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
