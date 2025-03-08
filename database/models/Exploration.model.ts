import {model, models, Schema, Types, Document} from 'mongoose'
import {Picture} from '../types/picture.type'

//* INTERFACES:

export interface ExplorationDocument extends Document {
  //* Añadidos por Mongo:
  //  _id: Types.ObjectId
  //  __v: number
  //  createdAt: Date
  //  updataedAt: Date

  //* Manejo de relaciones:
  datatype: 'exploration'
  instances: Types.ObjectId[]
  caves?: Types.ObjectId[]
  groups?: Types.ObjectId[]

  //* Datos troncales:
  name: string
  dates?: Date[]
  cave_time?: number
  participants?: string[]
  collaborators?: string[]

  //* Descripciones:
  description?: string
  incidents?: string
  inventory?: string
  pending_work?: string

  //* Adjuntos:
  pictures?: Picture[]
}

//* ESQUEMA:
const explorationSchema = new Schema<ExplorationDocument>(
  {
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
  model<ExplorationDocument>('Exploration', explorationSchema)

export default Exploration
