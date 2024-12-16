import {model, models, Schema, Types, Document, ClientSession} from 'mongoose'

import {caveShapes, coordProyections, utmZones} from './Cave.enums'
import {InstanceObject} from './Instance.model'
import {SystemObject} from './System.model'
import {ExplorationObject} from './Exploration.model'

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

export interface CaveDocument extends Document {
  //* Manejo DB:
  instances: Types.ObjectId[]
  system?: Types.ObjectId
  datatype: 'cave'

  //* Datos troncales:
  catalog?: string
  initials?: string[]
  name: string
  alt_names?: string[]

  //* Descripciones:
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
  explorations?: Types.ObjectId[]

  //* Métodos:
  setSystem(system: string, session?: ClientSession): Promise<CaveDocument>
  pushExploration(
    exploration: string,
    session?: ClientSession
  ): Promise<CaveDocument>
  removeExploration(
    explorationId: string,
    session?: ClientSession
  ): Promise<CaveDocument>
}

//* ESQUEMA:

const caveSchema = new Schema<CaveDocument>(
  {
    instances: {type: [Schema.Types.ObjectId], ref: 'Instance', required: true},
    catalog: {type: String}, // TODO: Actualizar para que pueda haber varios catálogos con las mismas siglas
    initials: {type: [String]},
    name: {type: String, required: true, unique: true},
    alt_names: {type: [String]},
    cave_shapes: {type: [String], enum: caveShapes},
    system: {type: Schema.Types.ObjectId, ref: 'System'},
    datatype: {type: String, required: true, default: 'cave'},
    description: {type: String},
    regulations: {type: Boolean},
    regulation_description: {type: String},
    length: {type: Number},
    depth: {type: Number},
    main_image: {type: String},
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
    geolog_age: {type: String},
    geolog_litology: {type: String},
    arqueolog: {type: String},
    paleontolog: {type: String},
    mineralog: {type: String},
    contamination: {type: String},
    biolog: {type: String},
    hidrolog_system: {type: String},
    hidrolog_subsystem: {type: String},
    explorations: {type: [Schema.Types.ObjectId], ref: 'Exploration'},
  },
  {timestamps: true}
)

//* MÉTODOS DE INSTANCIA:

caveSchema.methods.setSystem = async function (
  system: string,
  session?: ClientSession
) {
  this.system = system
  return this.save(session)
}

caveSchema.methods.pushExploration = async function (
  exploration: string,
  session?: ClientSession
) {
  this.explorations.push(exploration)
  return this.save(session)
}

caveSchema.methods.removeExploration = async function (
  explorationId: string,
  session?: ClientSession
) {
  this.explorations = this.explorations.filter(
    (exploration: Types.ObjectId) => exploration.toString() !== explorationId
  )
  return this.save(session)
}

//* MODELO:
const Cave = models?.Cave || model<CaveDocument>('Cave', caveSchema)

export default Cave

//* INTERFACES EXTENDIDAS:

export interface CaveObject
  extends Omit<CaveDocument, 'system' | 'explorations' | 'instances'> {
  system: string
  explorations: string[]
  instances: string[]
}

export interface PopulatetCave
  extends Omit<CaveObject, 'system' | 'explorations' | 'instances'> {
  system: SystemObject
  explorations: ExplorationObject[]
  instances: InstanceObject[]
}

export interface CaveIndex {
  _id: string
  catalog?: string
  initials?: string[]
  name: string
  system?: string
  cave_shapes?: string[]
}
