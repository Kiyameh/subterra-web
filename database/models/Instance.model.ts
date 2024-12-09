import {Document, Schema, models, model, Types} from 'mongoose'
import {UserObject} from './User.model'
import {GroupObject} from './Group.model'

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

//* ÍNDICES:

//* MIDDLEWARES:

//* MÉTODOS ESTATICOS:

//* MÉTODOS DE INSTANCIA:

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
  owner: GroupObject
  coordinator: UserObject
  editors: UserObject[]
  viewers: UserObject[]
}
