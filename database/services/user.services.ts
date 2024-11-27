'use server'
import {
  SignInSchema,
  SignInValues,
  SignUpSchema,
  SignUpValues,
} from '@/database/validation/auth.schemas'
import {Answer} from '@/database/types/answer.type'
import {connectToMongoDB} from '@/database/databaseConection'
import User, {UserDocument, UserObject} from '@/database/models/User.model'
import {decodeMongoError} from '@/database/tools/decodeMongoError'

/**
 * Función de registro de nuevo usuario
 * @param values SignUpValues - Valores de registro
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * redirect?: '/auth/login'
 * }
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
    connectToMongoDB()
    await newUser.save()

    //3. Devolver respuesta
    return {
      ok: true,
      code: 200,
      message: 'Usuario creado',
      redirect: '/auth/login',
    } as Answer
  } catch (e) {
    return decodeMongoError(e)
  }
}

/**
 * Función de autenticación de usuario
 * @param credentials {email,password} - Credenciales de usuario
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: UserObject
 * redirect?: "/"
 * }
 */
export async function checkCredentials(
  credentials: SignInValues
): Promise<Answer> {
  try {
    //1. Validación de datos (ZOD)
    const validationResult = SignInSchema.safeParse(credentials)
    //? safeParse evita generar errores. En su lugar devuelve un objeto con la propiedad success o error.
    if (!validationResult.success) {
      return {ok: false, code: 400, message: 'Datos inválidos'} as Answer
    }

    // 2. Buscar usuario en base de datos (MONGOOSE
    const {email, password} = validationResult.data
    await connectToMongoDB()
    const user = await User.findOne({
      email: email,
    }).select('+password')
    if (!user)
      return {ok: false, code: 400, message: 'Usuario no encontrado'} as Answer

    // 3. Comprobar credenciales
    if (!user.comparePassword(password))
      return {ok: false, code: 401, message: 'Credenciales invalidas'} as Answer

    // 4. Devolver respuesta con usuario:
    return {
      ok: true,
      code: 200,
      message: 'Credenciales correctas',
      content: user as UserObject,
      redirect: '/',
    } as Answer
  } catch (error) {
    console.log(error)
    return {ok: false, code: 500, message: 'Error en el servidor'} as Answer
  }
}

/**
 * Función para obtener un usuario por su id
 * @param id <string> id del usuario
 * @returns
 * answer{
 * ok: boolean,
 * code: number,
 * message: string,
 * content?: PopulatedUser
 * }
 */

export async function getUserById(id: string) {
  try {
    await connectToMongoDB()
    const user: UserDocument = await User.findOne({
      _id: id,
    })
      .populate({path: 'instances', model: 'Instance'})
      .populate({path: 'groups', model: 'Group'})
      // .populate({path: 'fav_caves', model: 'Cave'}) //TODO: Añadir cuando este el tipo hecho
      // .populate({path: 'fav_systems', model: 'System'}) //TODO: Añadir cuando este el tipo hecho
      // .populate({path: 'fav_explorations', model: 'Exploration'}) //TODO: Añadir cuando este el tipo hecho
      .exec()
    const userPOJO = user.toJSON()
    return {
      ok: true,
      code: 200,
      message: 'Usuario obtenido',
      content: userPOJO as UserObject,
    } as Answer
  } catch (error) {
    console.error(error)
    return {ok: false, code: 500, message: 'Error desconocido'} as Answer
  }
}
