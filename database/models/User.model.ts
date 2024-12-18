import {Document, Schema, models, model, Types, ClientSession} from 'mongoose'
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
  adminOf: Types.ObjectId[]
  memberOf: Types.ObjectId[]
  coordinatorOf: Types.ObjectId[]
  editorOf: Types.ObjectId[]
  viewerOf: Types.ObjectId[]
  fav_caves: Types.ObjectId[]
  fav_systems: Types.ObjectId[]
  fav_explorations: Types.ObjectId[]
  comparePassword(candidatePassword: string): Promise<boolean>
  pushAdminOf(groupId: string, session?: ClientSession): Promise<UserDocument>
  removeAdminOf(groupId: string, session?: ClientSession): Promise<UserDocument>
  pushMemberOf(groupId: string, session?: ClientSession): Promise<UserDocument>
  removeMemberOf(
    groupId: string,
    session?: ClientSession
  ): Promise<UserDocument>
  pushCoordinatorOf(
    instanceId: string,
    session?: ClientSession
  ): Promise<UserDocument>
  removeCoordinatorOf(
    instanceId: string,
    session?: ClientSession
  ): Promise<UserDocument>
  pushEditorOf(
    instanceId: string,
    session?: ClientSession
  ): Promise<UserDocument>
  removeEditorOf(
    instanceId: string,
    session?: ClientSession
  ): Promise<UserDocument>
  pushViewerOf(
    instanceId: string,
    session?: ClientSession
  ): Promise<UserDocument>
  removeViewerOf(
    instanceId: string,
    session?: ClientSession
  ): Promise<UserDocument>
  pushFavCave(caveId: string): Promise<UserDocument>
  removeFavCave(caveId: string): Promise<UserDocument>
  pushFavSystem(systemId: string): Promise<UserDocument>
  removeFavSystem(systemId: string): Promise<UserDocument>
  pushFavExploration(explorationId: string): Promise<UserDocument>
  removeFavExploration(explorationId: string): Promise<UserDocument>
}

//* ESQUEMA:
export const userSchema = new Schema<UserDocument>(
  {
    //Datos generales
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    email_verified: {type: Date, default: null},
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

userSchema.methods.pushAdminOf = async function (
  groupId: string,
  session?: ClientSession
) {
  this.adminOf.push(groupId)
  return this.save(session)
}

userSchema.methods.removeAdminOf = async function (
  groupId: string,
  session?: ClientSession
) {
  this.adminOf = this.adminOf.filter(
    (group: Types.ObjectId) => group.toString() !== groupId
  )
  return this.save(session)
}

userSchema.methods.pushMemberOf = async function (
  groupId: string,
  session?: ClientSession
) {
  this.memberOf.push(groupId)
  return this.save(session)
}

userSchema.methods.removeMemberOf = async function (
  groupId: string,
  session?: ClientSession
) {
  this.memberOf = this.memberOf.filter(
    (group: Types.ObjectId) => group.toString() !== groupId
  )
  return this.save(session)
}

userSchema.methods.pushCoordinatorOf = async function (
  instanceId: string,
  session?: ClientSession
) {
  this.coordinatorOf.push(instanceId)
  return this.save(session)
}

userSchema.methods.removeCoordinatorOf = async function (
  instanceId: string,
  session?: ClientSession
) {
  this.coordinatorOf = this.coordinatorOf.filter(
    (instance: Types.ObjectId) => instance.toString() !== instanceId
  )
  return this.save(session)
}

userSchema.methods.pushEditorOf = async function (
  instanceId: string,
  session?: ClientSession
) {
  this.editorOf.push(instanceId)
  return this.save(session)
}

userSchema.methods.removeEditorOf = async function (
  instanceId: string,
  session?: ClientSession
) {
  this.editorOf = this.editorOf.filter(
    (instance: Types.ObjectId) => instance.toString() !== instanceId
  )
  return this.save(session)
}

userSchema.methods.pushViewerOf = async function (
  instanceId: string,
  session?: ClientSession
) {
  this.viewerOf.push(instanceId)
  return this.save(session)
}

userSchema.methods.removeViewerOf = async function (
  instanceId: string,
  session?: ClientSession
) {
  this.viewerOf = this.viewerOf.filter(
    (instance: Types.ObjectId) => instance.toString() !== instanceId
  )
  return this.save(session)
}

userSchema.methods.pushFavCave = async function (caveId: string) {
  this.fav_caves.push(caveId)
  return this.save()
}

userSchema.methods.removeFavCave = async function (caveId: string) {
  this.fav_caves = this.fav_caves.filter(
    (cave: Types.ObjectId) => cave.toString() !== caveId
  )
  return this.save()
}

userSchema.methods.pushFavSystem = async function (systemId: string) {
  this.fav_systems.push(systemId)
  return this.save()
}

userSchema.methods.removeFavSystem = async function (systemId: string) {
  this.fav_systems = this.fav_systems.filter(
    (system: Types.ObjectId) => system.toString() !== systemId
  )
  return this.save()
}

userSchema.methods.pushFavExploration = async function (explorationId: string) {
  this.fav_explorations.push(explorationId)
  return this.save()
}

userSchema.methods.removeFavExploration = async function (
  explorationId: string
) {
  this.fav_explorations = this.fav_explorations.filter(
    (exploration: Types.ObjectId) => exploration.toString() !== explorationId
  )
  return this.save()
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
