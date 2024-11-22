import mongoose, {InferSchemaType} from 'mongoose'

//! 1. ESQUEMA:
export const instanceSchema = new mongoose.Schema(
  {
    is_online: {type: Boolean, default: true},
    name: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    acronym: {type: String},
    description: {type: String},
    territory: {type: String},
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    editors: {type: Array<mongoose.Schema.Types.ObjectId>, ref: 'User'},
    viewers: {type: Array<mongoose.Schema.Types.ObjectId>, ref: 'User'},
    public_visibility: {type: Boolean, default: true},
    public_edition: {type: Boolean, default: false},
    main_image: {type: String},
    map_image: {type: String},
  },
  {timestamps: true}
)

// Método para obtener referencia de este item:
instanceSchema.methods.getReference = function () {
  return {
    id: this._id.toString(),
    name: this.name,
  }
}
instanceSchema.set('toJSON', {
  transform: function (doc, ret) {
    // Serializar datos para evitar conflictos con client components de Next:
    return JSON.parse(JSON.stringify(ret))
  },
})

//! 2. MODELO:
const InstanceModel =
  mongoose.models?.Instance || mongoose.model('Instance', instanceSchema)

export default InstanceModel

//! 3. TIPOS:
type InstanceDocument = InferSchemaType<typeof instanceSchema>

// Tipo con los campos owner y admin poblados y el id:
type FieldsToRewrite = 'owner' | 'admin'
export type Instance = Omit<InstanceDocument, FieldsToRewrite> & {
  _id: string
  owner: {_id: string; name: string}
  admin: {_id: string; name: string}
}
