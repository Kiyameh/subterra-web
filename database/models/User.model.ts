import {Document, Schema, models, model, Types} from 'mongoose'
import bcrypt from 'bcryptjs'
import {InstanceObject} from './Instance.model'
import {GroupObject} from './Group.model'

//* INTERFACES:

export interface UserDocument extends Document {
  name: string
  email: string
  email_verified: Date
  OAuthId?: string
  fullname?: string
  password?: string
  image?: string
  instances: Types.ObjectId[]
  groups: Types.ObjectId[]
  fav_caves: Types.ObjectId[]
  fav_systems: Types.ObjectId[]
  fav_explorations: Types.ObjectId[]
  comparePassword(candidatePassword: string): Promise<boolean>
}

//* ESQUEMA:
export const userSchema = new Schema<UserDocument>(
  {
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    email_verified: {type: Date, default: null},
    OAuthId: {type: String},
    fullname: {type: String},
    password: {type: String, select: false}, //! Ocultada por defecto
    image: {type: String},
    instances: {type: [Schema.Types.ObjectId], ref: 'Instance'},
    groups: {type: [Schema.Types.ObjectId], ref: 'Group'},
    fav_caves: {type: [Schema.Types.ObjectId], ref: 'Cave'},
    fav_systems: {type: [Schema.Types.ObjectId], ref: 'System'},
    fav_explorations: {
      type: [Schema.Types.ObjectId],
      ref: 'Exploration',
    },
  },
  {timestamps: true}
)

//* ÍNDICES:
userSchema.index({email: 1}, {unique: true})

//* MIDDLEWARES:
/** Middelware que hashea la password si ha sido introducida o modificada antes de guardar el usuario */
userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password') || !this.password) return next()
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash

  return next()
})

//* MÉTODOS ESTATICOS:

//* MÉTODOS DE INSTANCIA:

/** Método de instancia que compara una contraseña candidata con la contraseña de usuario */
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument
  if (!user.password) return false
  return bcrypt.compare(candidatePassword, user.password).catch(() => false)
}

//* MODELO:
const User = models?.User || model<UserDocument>('User', userSchema)

export default User

//* INTERFACES EXTENDIDAS:

export interface UserObject
  //? Eliminado password mediante esquema
  extends Omit<
    UserDocument,
    | 'password'
    | 'instances'
    | 'groups'
    | 'fav_caves'
    | 'fav_systems'
    | 'fav_explorations'
    | 'comparePassword'
  > {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  instances: string[]
  groups: string[]
  fav_caves: string[]
  fav_systems: string[]
  fav_explorations: string[]
}

export interface PopulatedUser
  extends Omit<
    UserObject,
    'instances' | 'groups' | 'fav_caves' | 'fav_systems' | 'fav_explorations'
  > {
  instances: InstanceObject[]
  groups: GroupObject[]
  // fav_caves: CaveObject[] //TODO: Actualizar cuando se cree el tipo
  // fav_systems: SystemObject[] //TODO: Actualizar cuando se cree el tipo
  // fav_explorations: ExplorationObject[] //TODO: Actualizar cuando se cree el tipo
}
