import {model, models, Schema, Types, Document, ClientSession} from 'mongoose'
import {CaveObject} from './Cave.model'
import {InstanceObject} from './Instance.model'
import {GroupObject} from './Group.model'

//* INTERFACES:

export interface ExplorationDocument extends Document {
  //* Manejo DB:
  instances: Types.ObjectId[]
  caves?: Types.ObjectId[]
  groups?: Types.ObjectId[]
  datatype: 'exploration'

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

  //* Métodos:
  pushCave(cave: string, session?: ClientSession): Promise<ExplorationDocument>
  removeCave(
    caveId: string,
    session?: ClientSession
  ): Promise<ExplorationDocument>
  pushGroup(
    group: string,
    session?: ClientSession
  ): Promise<ExplorationDocument>
  removeGroup(
    groupId: string,
    session?: ClientSession
  ): Promise<ExplorationDocument>
}

//* ESQUEMA:
const explorationSchema = new Schema<ExplorationDocument>(
  {
    instances: {type: [Schema.Types.ObjectId], ref: 'Instance', required: true},
    name: {type: String, required: true},
    datatype: {type: String, required: true, default: 'exploration'},
    dates: {type: [Date]},
    cave_time: {type: Number},
    participants: {type: [String]},
    collaborators: {type: [String]},
    groups: {type: [Schema.Types.ObjectId], ref: 'Group'},
    description: {type: String},
    caves: {type: [Schema.Types.ObjectId], ref: 'Cave'},
    incidents: {type: String},
    inventory: {type: String},
    pending_work: {type: String},
  },
  {timestamps: true}
)

//* MÉTODOS DE INSTANCIA:

explorationSchema.methods.pushCave = async function (
  cave: string,
  session?: ClientSession
) {
  this.caves.push(cave)
  return this.save(session)
}

explorationSchema.methods.removeCave = async function (
  caveId: string,
  session?: ClientSession
) {
  this.caves = this.caves.filter(
    (cave: Types.ObjectId) => cave.toString() !== caveId
  )
  return this.save(session)
}

explorationSchema.methods.pushGroup = async function (
  group: string,
  session?: ClientSession
) {
  this.groups.push(group)
  return this.save(session)
}

explorationSchema.methods.removeGroup = async function (
  groupId: string,
  session?: ClientSession
) {
  this.groups = this.groups.filter(
    (group: Types.ObjectId) => group.toString() !== groupId
  )
  return this.save(session)
}

//* MODELO:
const Exploration =
  models?.Exploration ||
  model<ExplorationDocument>('Exploration', explorationSchema)

export default Exploration

//* INTERFACES EXTENDIDAS:
export interface ExplorationObject
  extends Omit<ExplorationDocument, 'caves' | 'instances' | 'groups'> {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  caves?: string[]
  instances?: string[]
  groups?: string[]
}

export interface PopulatedExploration
  extends Omit<ExplorationObject, 'caves' | 'instances' | 'groups'> {
  caves?: CaveObject[]
  instances?: InstanceObject[]
  groups?: GroupObject[]
}

export interface ExplorationIndex {
  _id: string
  name: string
  dates?: Date[]
  groups?: {name: string; _id: string}[]
  caves?: {name: string; _id: string}[]
  cave_time?: number
}
