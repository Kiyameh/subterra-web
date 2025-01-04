import {Document, Schema, models, model, Types} from 'mongoose'
import bcrypt from 'bcryptjs'
import {InstanceObject} from '../services/instance.actions'
import {GroupObject} from '../services/group.actions'

//* INTERFACES:

export interface UserDocument extends Document {
  // Relaciones:
  adminOf: Types.ObjectId[]
  memberOf: Types.ObjectId[]
  coordinatorOf: Types.ObjectId[]
  editorOf: Types.ObjectId[]
  viewerOf: Types.ObjectId[]

  // Datos generales:
  name: string
  email: string
  email_verified: boolean
  OAuthId?: string
  fullname?: string
  password?: string
  image?: string

  // favs
  fav_caves: Types.ObjectId[]
  fav_systems: Types.ObjectId[]
  fav_explorations: Types.ObjectId[]

  comparePassword(candidatePassword: string): Promise<boolean>
}

//* ESQUEMA:
export const userSchema = new Schema<UserDocument>(
  {
    //Datos generales
    name: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    email_verified: {type: Boolean, default: false},
    OAuthId: {type: String},
    fullname: {type: String},
    password: {type: String, select: false}, //! Ocultada por defecto
    image: {type: String},
    //roles:
    adminOf: {type: [Schema.Types.ObjectId], ref: 'Group', default: []},
    memberOf: {type: [Schema.Types.ObjectId], ref: 'Group', default: []},
    coordinatorOf: {
      type: [Schema.Types.ObjectId],
      ref: 'Instance',
      default: [],
    },
    editorOf: {type: [Schema.Types.ObjectId], ref: 'Instance', default: []},
    viewerOf: {type: [Schema.Types.ObjectId], ref: 'Instance', default: []},
    // favs
    fav_caves: {type: [Schema.Types.ObjectId], ref: 'Cave', default: []},
    fav_systems: {type: [Schema.Types.ObjectId], ref: 'System', default: []},
    fav_explorations: {
      type: [Schema.Types.ObjectId],
      ref: 'Exploration',
      default: [],
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
    | 'adminOf'
    | 'memberOf'
    | 'coordinatorOf'
    | 'editorOf'
    | 'viewerOf'
    | 'fav_caves'
    | 'fav_systems'
    | 'fav_explorations'
    | 'comparePassword'
  > {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  adminOf: string[]
  memberOf: string[]
  coordinatorOf: string[]
  editorOf: string[]
  viewerOf: string[]
  fav_caves: string[]
  fav_systems: string[]
  fav_explorations: string[]
}

export interface PopulatedUser
  extends Omit<
    UserObject,
    'adminOf' | 'memberOf' | 'coordinatorOf' | 'editorOf' | 'viewerOf' //| "fav_caves" | "fav_systems" | "fav_explorations"  //TODO: Actualizar cuando se cree el tipo
  > {
  adminOf: GroupObject[]
  memberOf: GroupObject[]
  coordinatorOf: InstanceObject[]
  editorOf: InstanceObject[]
  viewerOf: InstanceObject[]

  // fav_caves: PlainCave[] //TODO: Actualizar cuando se cree el tipo
  // fav_systems: PlainSystem[] //TODO: Actualizar cuando se cree el tipo
  // fav_explorations: PlainExploration[] //TODO: Actualizar cuando se cree el tipo
}

export interface UserIndex {
  _id: string
  name: string
  fullname: string
  image?: string
  email?: string
}
