import {model, models, Schema, Types} from 'mongoose'
import {groupCategories} from './Group.enums'
import {UserObject} from './User.model'
import {InstanceObject} from './Instance.model'

//* INTERFACES:
export interface GroupDocument extends Document {
  name: string
  fullname: string
  acronym?: string
  description?: string
  group_categories: (typeof groupCategories)[number][]
  main_image?: string
  logo_image?: string
  street?: string
  portal_number?: string
  floor?: string
  door?: string
  postal_code?: number
  city?: string
  province?: string
  country?: string
  phone?: string
  email?: string
  webpage?: string
  admin: Types.ObjectId
  members: Types.ObjectId[]
  instances: Types.ObjectId[]
  explorations: Types.ObjectId[]
}

//* ESQUEMA:

const groupSchema = new Schema<GroupDocument>(
  {
    // Datos generales:
    name: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    acronym: {type: String},
    description: {type: String},
    group_categories: {type: [String], enum: groupCategories},
    main_image: {type: String},
    logo_image: {type: String},
    // Datos de contacto:
    street: {type: String},
    portal_number: {type: String},
    floor: {type: String},
    door: {type: String},
    postal_code: {type: Number},
    city: {type: String},
    province: {type: String},
    country: {type: String},
    phone: {type: String},
    email: {type: String},
    webpage: {type: String},
    // Relaciones:
    admin: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    instances: {
      type: [Schema.Types.ObjectId],
      ref: 'Instance',
    },
    explorations: {
      type: [Schema.Types.ObjectId],
      ref: 'Exploration',
    },
  },
  {
    timestamps: true,
  }
)
//* ÍNDICES:

//* MIDDLEWARES:

//* MÉTODOS ESTATICOS:

//* MÉTODOS DE INSTANCIA:

//* MODELO:
const Group = models?.Group || model<GroupDocument>('Group', groupSchema)

export default Group

//* INTERFACES EXTENDIDAS:

export interface GroupObject
  extends Omit<
    GroupDocument,
    'admin' | 'members' | 'explorations' | 'instances'
  > {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  admin: string
  members: string[]
  instances: string[]
  explorations: string[]
}

export interface PopulatedGroup
  extends Omit<
    GroupObject,
    'admin' | 'members' | 'instances' | 'explorations'
  > {
  admin: UserObject
  members: UserObject[]
  instances: InstanceObject[]
  // explorations: ExplorationObject[] // TODO: Añadir cuando este el tipo hecho
}
