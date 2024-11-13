import mongoose, {InferSchemaType} from 'mongoose'

export const instanceSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true},
    is_online: {type: Boolean, default: true},
    generalData: {
      fullname: {type: String, required: true},
      datatype: {type: String, enum: ['instance'], required: true},
      acronym: {type: String},
      description: {type: String},
      territory: {type: String},
      admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
      public_visibility: {type: Boolean},
      public_edition: {type: Boolean},
      main_image: {type: String},
      map_image: {type: String},
    },
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

// Middleware para poblar admin y owner:
//TODO: Crear middleware para poblar los campos admin y owner

const InstanceModel =
  mongoose.models.Instance || mongoose.model('Instance', instanceSchema)

export default InstanceModel
// Tipo con la estructura en la base de datos:
type InstanceDocument = InferSchemaType<typeof instanceSchema>

// Tipo con los campos owner y admin poblados:
type FieldsToRewrite = 'generalData.owner' | 'generalData.admin'
export type Instance = Omit<InstanceDocument, FieldsToRewrite> & {
  generalData: {
    owner: {_id: string; name: string}
    admin: {_id: string; name: string}
  }
}
