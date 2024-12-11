import {model, models, Schema, Types, Document, ClientSession} from 'mongoose'
import {groupCategories} from './Group.enums'
import {UserObject} from './User.model'
import {MemberRequestValues} from '@/components/boards/_interaction/membership-request-dialog'

//* INTERFACES:

export interface MemberRequest {
  _id: Types.ObjectId
  user: Types.ObjectId
  message: string
}

export interface GroupDocument extends Document {
  name: string
  fullname: string
  acronym?: string
  description?: string
  group_categories: (typeof groupCategories)[number][]
  main_image?: string
  logo_image?: string
  street?: string
  portal_number?: string
  floor?: string
  door?: string
  postal_code?: number
  city?: string
  province?: string
  country?: string
  phone?: string
  email?: string
  webpage?: string
  admin: Types.ObjectId
  member_requests: MemberRequest[]
  members: Types.ObjectId[]
  instances: Types.ObjectId[]
  explorations: Types.ObjectId[]
  pushMember(user: string, session?: ClientSession): Promise<GroupDocument>
  removeMember(user: string, session?: ClientSession): Promise<GroupDocument>
  pushMemberRequest(request: MemberRequestValues): Promise<GroupDocument>
  removeMemberRequest(
    requestId: string,
    session?: ClientSession
  ): Promise<GroupDocument>
  setAdmin(adminId: string, session?: ClientSession): Promise<GroupDocument>
  pushInstance(
    instance: string,
    session?: ClientSession
  ): Promise<GroupDocument>
  removeInstance(
    instanceId: string,
    session?: ClientSession
  ): Promise<GroupDocument>
  pushExploration(exploration: string): Promise<GroupDocument>
  removeExploration(explorationId: string): Promise<GroupDocument>
}

//* ESQUEMA:

const groupSchema = new Schema<GroupDocument>(
  {
    // Datos generales:
    name: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    acronym: {type: String},
    description: {type: String},
    group_categories: {type: [String], enum: groupCategories},
    main_image: {type: String},
    logo_image: {type: String},
    // Datos de contacto:
    street: {type: String},
    portal_number: {type: String},
    floor: {type: String},
    door: {type: String},
    postal_code: {type: Number},
    city: {type: String},
    province: {type: String},
    country: {type: String},
    phone: {type: String},
    email: {type: String},
    webpage: {type: String},
    // Roles:
    admin: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    member_requests: [
      {
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        message: {type: String},
      },
    ],
    // Propietario de:
    instances: {
      type: [Schema.Types.ObjectId],
      ref: 'Instance',
    },
    explorations: {
      type: [Schema.Types.ObjectId],
      ref: 'Exploration',
    },
  },
  {
    timestamps: true,
  }
)
//* MÉTODOS DE INSTANCIA:
groupSchema.methods.pushMember = async function (
  user: string,
  session?: ClientSession
) {
  this.members.push(user)
  return this.save(session)
}

groupSchema.methods.removeMember = async function (
  user: string,
  session?: ClientSession
) {
  this.members = this.members.filter(
    (member: Types.ObjectId) => member.toString() !== user
  )
  return this.save(session)
}

groupSchema.methods.pushMemberRequest = async function (
  request: MemberRequestValues
) {
  const newRequest = {
    _id: new Types.ObjectId(),
    user: new Types.ObjectId(request.user),
    message: request.message,
  } as MemberRequest

  this.member_requests.push(newRequest)
  return this.save()
}

groupSchema.methods.removeMemberRequest = async function (
  requestId: string,
  session?: ClientSession
) {
  this.member_requests = this.member_requests.filter(
    (request: MemberRequest) => request._id.toString() !== requestId
  )
  return this.save(session)
}

groupSchema.methods.setAdmin = async function (
  adminId: string,
  session?: ClientSession
) {
  this.admin = adminId
  return this.save(session)
}

groupSchema.methods.pushInstance = async function (
  instance: string,
  session?: ClientSession
) {
  this.instances.push(instance)
  return this.save(session)
}

groupSchema.methods.removeInstance = async function (
  instanceId: string,
  session?: ClientSession
) {
  this.instances = this.instances.filter(
    (instance: Types.ObjectId) => instance.toString() !== instanceId
  )
  return this.save(session)
}

groupSchema.methods.pushExploration = async function (exploration: string) {
  this.explorations.push(exploration)
  return this.save()
}

groupSchema.methods.removeExploration = async function (explorationId: string) {
  this.explorations = this.explorations.filter(
    (exploration: Types.ObjectId) => exploration.toString() !== explorationId
  )
  return this.save()
}

//* MODELO:
const Group = models?.Group || model<GroupDocument>('Group', groupSchema)

export default Group

//* INTERFACES EXTENDIDAS:

export interface GroupObject
  extends Omit<
    GroupDocument,
    'admin' | 'members' | 'explorations' | 'instances' | 'member_requests'
  > {
  _id: string
  __v: number
  createdAt: Date
  updatedAt: Date
  admin: string
  members: string[]
  member_requests: {_id: string; user: string; message: string}[]
  instances: string[]
  explorations: string[]
}

export interface PopulatedGroup
  extends Omit<GroupObject, 'admin' | 'members' | 'member_requests'> {
  admin: UserObject
  members: UserObject[]
  member_requests: {_id: string; user: UserObject; message: string}[]
}

export interface GroupIndex {
  _id: string
  name: string
  fullname: string
  province: string
}
