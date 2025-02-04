import {model, models, Schema, Types, Document} from 'mongoose'
import {utmZones} from '@/database/models/Cave.enums'
import {caveShapes} from '@/database/models/Cave.enums'
import {coordProyections} from '@/database/models/Cave.enums'

//* INTERFACES:

export interface UtmCoordinate {
  x_coord: number
  y_coord: number
  z_coord?: number
  coord_proyec: (typeof coordProyections)[number]
  coord_format: 'UTM'
  utm_zone: (typeof utmZones)[number]
  hemisphere: 'N' | 'S'
}

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
  //  _id: Types.ObjectId
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
  main_image?: string

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
    main_image: {type: String},

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
  },
  {timestamps: true}
)

//* MODELO:
const Cave = models?.Cave || model<CaveDocument>('Cave', caveSchema)

export default Cave
