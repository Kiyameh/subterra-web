import mongoose, {InferSchemaType} from 'mongoose'
import {groupCategories} from './Group.enums'

//! 1. ESQUEMA:
export const groupSchema = new mongoose.Schema(
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
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    editors: {
      type: Array<mongoose.Schema.Types.ObjectId>,
      ref: 'User',
      default: [],
    },
    members: {
      type: Array<mongoose.Schema.Types.ObjectId>,
      ref: 'User',
      default: [],
    },
    explorations: {
      type: Array<mongoose.Schema.Types.ObjectId>,
      ref: 'Exploration',
    },
  },
  {timestamps: true}
)

// Método para obtener referencia de este item:
groupSchema.methods.getReference = function () {
  return {
    id: this._id.toString(),
    name: this.name,
  }
}
groupSchema.set('toJSON', {
  transform: function (doc, ret) {
    // Serializar datos para evitar conflictos con client components de Next:
    return JSON.parse(JSON.stringify(ret))
  },
})

//! 2. MODELO:
const GroupModel =
  mongoose.models?.Group || mongoose.model('Group', groupSchema)

export default GroupModel

//! 3. TIPOS:
type GroupDocument = InferSchemaType<typeof groupSchema>

// Tipo con el _id:
export type Group = GroupDocument & {
  _id: string
}
