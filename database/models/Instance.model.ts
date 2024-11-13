import mongoose, {InferSchemaType} from 'mongoose'

//! 1. ESQUEMA:
export const instanceSchema = new mongoose.Schema(
  {
    is_online: {type: Boolean, default: true},
    name: {type: String, required: true, unique: true},
    acronym: {type: String},
    fullname: {type: String, required: true},
    description: {type: String},
    territory: {type: String},
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    public_visibility: {type: Boolean},
    public_edition: {type: Boolean},
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
  mongoose.models.Instance || mongoose.model('Instance', instanceSchema)

export default InstanceModel

//! 3. TIPOS:
type InstanceDocument = InferSchemaType<typeof instanceSchema>

// Tipo con los campos owner y admin poblados:
type FieldsToRewrite = 'owner' | 'admin'
export type Instance = Omit<InstanceDocument, FieldsToRewrite> & {
  owner: {_id: string; name: string}
  admin: {_id: string; name: string}
}
