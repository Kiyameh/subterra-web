import {Document, Schema, models, model, Types} from 'mongoose'

//* INTERFACES:

export interface InstanceDocument extends Document {
  // Relaciones:
  owner: Types.ObjectId

  // Datos generales:
  is_online: boolean
  name: string
  fullname: string
  acronym: string
  description: string
  territory: string
  public_visibility: boolean
  public_edition: boolean
  main_image: string
  map_image: string
}

//* ESQUEMA:

const instanceSchema = new Schema<InstanceDocument>(
  {
    // Relaciones:
    owner: {type: Schema.Types.ObjectId, ref: 'Group'},

    // Datos generales:
    is_online: {type: Boolean, default: true},
    name: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    acronym: {type: String},
    description: {type: String, required: true},
    territory: {type: String, required: true},
    public_visibility: {type: Boolean, default: true},
    public_edition: {type: Boolean, default: false},
    main_image: {type: String},
    map_image: {type: String},
  },
  {timestamps: true}
)

//* MODELO:

const Instance =
  models?.Instance || model<InstanceDocument>('Instance', instanceSchema)

export default Instance
