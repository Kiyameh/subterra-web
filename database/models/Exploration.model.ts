import {model, models, Schema} from 'mongoose'
import {ExplorationDocument} from '@/database/types/Exploration'

//* ESQUEMA:
const ExplorationSchema = new Schema<ExplorationDocument>(
  {
    //* Versiones:
    versions: [
      new Schema(
        {
          __v: {type: Number, required: true}, // Validación obligatoria
          updatedAt: {type: Date, required: true}, // Validación obligatoria
        },
        {strict: false} // Permitir otras propiedades sin validarlas
      ),
    ],
    //* Manejo de relaciones:
    datatype: {type: String, required: true, default: 'exploration'},
    instances: {type: [Schema.Types.ObjectId], ref: 'Instance', required: true},
    caves: {type: [Schema.Types.ObjectId], ref: 'Cave'},
    groups: {type: [Schema.Types.ObjectId], ref: 'Group'},

    //* Datos troncales:
    name: {type: String, required: true},
    dates: {type: [Date]},
    cave_time: {type: Number},
    participants: {type: [String]},
    collaborators: {type: [String]},

    //* Descripciones:
    description: {type: String},
    incidents: {type: String},
    inventory: {type: String},
    pending_work: {type: String},

    //* Adjuntos:
    pictures: {
      type: [
        {
          author: {type: String},
          date: {type: Date},
          description: {type: String},
          file_src: {type: String},
          publicId: {type: String},
        },
      ],
    },
  },
  {timestamps: true}
)

//* MODELO:
const Exploration =
  models?.Exploration ||
  model<ExplorationDocument>('Exploration', ExplorationSchema)

export default Exploration
