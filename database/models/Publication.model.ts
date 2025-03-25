import {model, models, Schema, Types} from 'mongoose'
import {type Picture} from '@/database/types/Picture'

export interface PublicationDocument extends Document {
  //* Añadidos por Mongo:
  //  _id: Types.ObjectId
  //  __v: number
  //  createdAt: Date
  //  updataedAt: Date

  //* Manejo de relaciones:
  datatype: 'publication'
  caves: Types.ObjectId[]
  groups: Types.ObjectId[]

  //* Datos generales:
  title: string
  subtitle?: string
  authors?: string[]
  publication_date?: Date
  publication_place?: string
  edition?: string
  isbn?: string
  url?: string

  //* Adjuntos:
  pictures?: Picture[]
  pdf_src?: string
}

//* ESQUEMA:
const PublicationSchema = new Schema<PublicationDocument>({
  //* Manejo de relaciones:
  datatype: {type: String, default: 'publication'},
  caves: [{type: Types.ObjectId, ref: 'Cave'}],
  groups: [{type: Types.ObjectId, ref: 'Group'}],

  //* Datos generales:
  title: {type: String, required: true},
  subtitle: {type: String},
  authors: [{type: String}],
  publication_date: {type: Date},
  publication_place: {type: String},
  edition: {type: String},
  isbn: {type: String},
  url: {type: String},

  //* Adjuntos:
  pictures: [
    {
      author: {type: String},
      date: {type: Date},
      description: {type: String},
      file_src: {type: String},
    },
  ],
  pdf_src: {type: String},
})

//* MODELO:

const Publication =
  models.Publication ||
  model<PublicationDocument>('Publication', PublicationSchema)

export default Publication
