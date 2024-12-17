import {model, models, Schema, Types, Document, ClientSession} from 'mongoose'
import {CaveObject} from './Cave.model'
import {InstanceObject} from './Instance.model'

//* INTERFACES:

export interface SystemDocument extends Document {
  //* Manejo DB:
  instances: Types.ObjectId[]
  caves?: Types.ObjectId[]
  datatype: 'system'

  //* Datos troncales:
  catalog?: string
  initials?: string[]
  name: string
  alt_names?: string[]

  //* Descripciónes:
  description?: string
  regulations?: boolean
  regulation_description?: string
  exploration_description?: string
  length?: number
  depth?: number
  massif?: string
  main_image?: string

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

  //* Métodos:
  pushCave(cave: string, session?: ClientSession): Promise<SystemDocument>
  removeCave(caveId: string, session?: ClientSession): Promise<SystemDocument>
}

//* ESQUEMA:

const systemSchema = new Schema<SystemDocument>({
  instances: {type: [Schema.Types.ObjectId], ref: 'Instance', required: true},
  catalog: {type: String},
  initials: {type: [String]},
  name: {type: String, required: true, unique: true},
  alt_names: {type: [String]},
  datatype: {type: String, required: true, default: 'system'},
  caves: {type: [Schema.Types.ObjectId], ref: 'Cave'},
  description: {type: String},
  regulations: {type: Boolean},
  regulation_description: {type: String},
  exploration_description: {type: String},
  length: {type: Number},
  depth: {type: Number},
  massif: {type: String},
  main_image: {type: String},
  geolog_age: {type: String},
  geolog_litology: {type: String},
  arqueolog: {type: String},
  paleontolog: {type: String},
  mineralog: {type: String},
  contamination: {type: String},
  biolog: {type: String},
  hidrolog_system: {type: String},
  hidrolog_subsystem: {type: String},
})

//* MÉTODOS INSTANCIA:

systemSchema.methods.pushCave = async function (
  cave: string,
  session?: ClientSession
): Promise<SystemDocument> {
  this.caves.push(cave)
  return this.save({session})
}

systemSchema.methods.removeCave = async function (
  caveId: string,
  session?: ClientSession
): Promise<SystemDocument> {
  this.caves = this.caves.filter(
    (cave: Types.ObjectId) => cave.toString() !== caveId
  )
  return this.save({session})
}

//* MODELO:

const System = models?.System || model<SystemDocument>('System', systemSchema)

export default System

//* INTERFACES EXTENDIDAS:

export interface SystemObject
  extends Omit<SystemDocument, 'caves' | 'instances'> {
  caves?: string[]
  instances?: string[]
}

export interface PopulatedSystem
  extends Omit<SystemObject, 'caves' | 'instances'> {
  caves?: CaveObject[]
  instances?: InstanceObject[]
}

export interface SystemIndex {
  _id: string
  catalog?: string
  initials?: string[]
  name: string
  caves?: {name: string; _id: string}[]
  depth?: number
  length?: number
  regulations?: boolean
}
