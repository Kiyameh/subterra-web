import {model, models, Schema, Types, Document} from 'mongoose'
import {utmZones} from '@/database/models/Cave.enums'
import {caveShapes} from '@/database/models/Cave.enums'
import {coordProyections} from '@/database/models/Cave.enums'
import {UtmCoordinate} from '@/database/types/coordinates.type'
import {Picture} from '@/database/types/picture.type'
import {Installation} from '../types/installation.type'
import {Topography} from '../types/topography.type'

//* INTERFACES:

export interface Geolocation {
  date: Date
  author?: string
}

export interface HistoricalExploration {
  date: Date
  author?: string
  publication?: string
  description?: string
}

export interface CaveDocument extends Document {
  //* Añadidos por Mongo:
  // _id: Types.ObjectId
  //  __v: number
  //  createdAt: Date
  //  updataedAt: Date

  //* Manejo de relaciones:
  datatype: 'cave'
  instances: Types.ObjectId[]
  system?: Types.ObjectId

  //* Datos generales:
  name: string
  catalog?: string
  initials?: string[]
  alt_names?: string[]

  //* Datos descriptivos:
  cave_shapes?: (typeof caveShapes)[number][]
  description?: string
  regulations?: boolean
  regulation_description?: string
  length?: number
  depth?: number

  //* Datos localización:
  coordinates?: UtmCoordinate
  municipality?: string
  locality?: string
  toponymy?: string[]
  massif?: string
  location_description?: string
  geolocations?: Geolocation[]

  //* Datos exploración:
  historical_explorations?: HistoricalExploration[]

  //* Datos científicos:
  geolog_age?: string
  geolog_litology?: string
  arqueolog?: string
  paleontolog?: string
  mineralog?: string
  contamination?: string
  biolog?: string
  hidrolog_system?: string
  hidrolog_subsystem?: string

  //* Adjuntos:
  topographies?: Topography[]
  pictures?: Picture[]
  installations?: Installation[]
}

//* ESQUEMA:

const caveSchema = new Schema<CaveDocument>(
  {
    //* Manejo de relaciones:
    datatype: {type: String, required: true, default: 'cave'},
    instances: {type: [Schema.Types.ObjectId], ref: 'Instance', required: true},
    system: {type: Schema.Types.ObjectId, ref: 'System'},

    //* Datos troncales:
    catalog: {type: String},
    initials: {type: [String]},
    name: {type: String, required: true},
    alt_names: {type: [String]},

    //* Datos descriptivos:
    cave_shapes: {type: [String], enum: caveShapes},
    description: {type: String},
    regulations: {type: Boolean},
    regulation_description: {type: String},
    length: {type: Number},
    depth: {type: Number},

    //* Datos localización:
    coordinates: {
      x_coord: {type: Number, required: true},
      y_coord: {type: Number, required: true},
      z_coord: {type: Number},
      coord_proyec: {
        type: String,
        enum: coordProyections,
        default: 'WGS84',
        required: true,
      },
      coord_format: {type: String, default: 'UTM', required: true},
      utm_zone: {type: String, enum: utmZones, required: true},
      hemisphere: {type: String, enum: ['N', 'S'], required: true},
    },
    municipality: {type: String},
    locality: {type: String},
    toponymy: {type: [String]},
    massif: {type: String},
    location_description: {type: String},
    geolocations: [
      {
        date: {type: Date, required: true},
        author: {type: String},
      },
    ],

    //* Datos exploración:
    historical_explorations: [
      {
        date: {type: Date, required: true},
        author: {type: String},
        publication: {type: String},
        description: {type: String},
      },
    ],

    //* Datos científicos:
    geolog_age: {type: String},
    geolog_litology: {type: String},
    arqueolog: {type: String},
    paleontolog: {type: String},
    mineralog: {type: String},
    contamination: {type: String},
    biolog: {type: String},
    hidrolog_system: {type: String},
    hidrolog_subsystem: {type: String},

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
    topographies: {
      type: [
        {
          authors: {type: String},
          groups: {type: String},
          date: {type: Date},
          description: {type: String},
          file_src: {type: String},
          publicId: {type: String},
          type: {
            type: String,
            enum: ['plan', 'proyected', 'developed', '3D', 'other'],
          },
        },
      ],
    },

    // TODO: Añadir instalaciones
  },
  {timestamps: true}
)

//* MODELO:
const Cave = models?.Cave || model<CaveDocument>('Cave', caveSchema)

export default Cave
