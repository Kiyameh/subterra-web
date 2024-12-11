import {Document, Schema, models, model, Types, ClientSession} from 'mongoose'
import {UserIndex} from '@/database/models/User.model'
import {GroupIndex} from '@/database/models/Group.model'

//* INTERFACES:

export interface InstanceDocument extends Document {
  is_online: boolean
  name: string
  fullname: string
  acronym: string
  description: string
  territory: string
  owner: Types.ObjectId
  coordinator: Types.ObjectId
  editors: Types.ObjectId[]
  viewers: Types.ObjectId[]
  public_visibility: boolean
  public_edition: boolean
  main_image: string
  map_image: string
  pushEditor(
    editorId: string,
    session?: ClientSession
  ): Promise<InstanceDocument>
  removeEditor(
    editorId: string,
    session?: ClientSession
  ): Promise<InstanceDocument>
  pushViewer(
    viewerId: string,
    session?: ClientSession
  ): Promise<InstanceDocument>
  removeViewer(
    viewerId: string,
    session?: ClientSession
  ): Promise<InstanceDocument>
  setOwner(ownerId: string, session?: ClientSession): Promise<InstanceDocument>
  setCoordinator(
    coordinatorId: string,
    session?: ClientSession
  ): Promise<InstanceDocument>
}

//* ESQUEMA:

const instanceSchema = new Schema<InstanceDocument>(
  {
    is_online: {type: Boolean, default: true},
    name: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    acronym: {type: String},
    description: {type: String, required: true},
    territory: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'Group'},
    coordinator: {type: Schema.Types.ObjectId, ref: 'User'},
    editors: {type: [Schema.Types.ObjectId], ref: 'User'},
    viewers: {type: [Schema.Types.ObjectId], ref: 'User'},
    public_visibility: {type: Boolean, default: true},
    public_edition: {type: Boolean, default: false},
    main_image: {type: String},
    map_image: {type: String},
  },
  {timestamps: true}
)

//* MÉTODOS DE INSTANCIA:

instanceSchema.methods.pushEditor = async function (
  editorId: string,
  session?: ClientSession
) {
  this.editors.push(editorId)
  return this.save(session)
}

instanceSchema.methods.removeEditor = async function (
  editorId: string,
  session?: ClientSession
) {
  this.editors = this.editors.filter(
    (editor: Types.ObjectId) => editor.toString() !== editorId
  )
  return this.save(session)
}

instanceSchema.methods.pushViewer = async function (
  viewerId: string,
  session?: ClientSession
) {
  this.viewers.push(viewerId)
  return this.save(session)
}

instanceSchema.methods.removeViewer = async function (
  viewerId: string,
  session?: ClientSession
) {
  this.viewers = this.viewers.filter(
    (viewer: Types.ObjectId) => viewer.toString() !== viewerId
  )
  return this.save(session)
}

instanceSchema.methods.setOwner = async function (
  ownerId: string,
  session?: ClientSession
) {
  this.owner = ownerId
  return this.save(session)
}

instanceSchema.methods.setCoordinator = async function (
  coordinatorId: string,
  session?: ClientSession
) {
  this.coordinator = coordinatorId
  return this.save(session)
}

//* MODELO:

const Instance =
  models?.Instance || model<InstanceDocument>('Instance', instanceSchema)

export default Instance

//* INTERFACES EXTENDIDAS:

export interface InstanceObject
  extends Omit<
    InstanceDocument,
    'coordinator' | 'owner' | 'editors' | 'viewers'
  > {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  owner: string
  coordinator: string
  editors: string[]
  viewers: string[]
}

export interface PopulatedInstance
  extends Omit<
    InstanceObject,
    'coordinator' | 'owner' | 'editors' | 'viewers'
  > {
  owner: GroupIndex
  coordinator: UserIndex
  editors: UserIndex[]
  viewers: UserIndex[]
}

export interface InstanceIndex {
  _id: string
  name: string
  fullname: string
  territory: string
  is_online: boolean
}
