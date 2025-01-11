import {model, models, Schema, Types, Document, ClientSession} from 'mongoose'
import {groupCategories} from './Group.enums'
import {MemberRequestValues} from '@/components/_group-dashboard/group-notification-area/membership-request-dialog'

//* INTERFACES:

export interface MemberRequest {
  _id: Types.ObjectId
  user: Types.ObjectId
  message: string
}

export interface GroupDocument extends Document {
  // Datos generales:
  name: string
  fullname: string
  acronym?: string
  description?: string
  group_categories: (typeof groupCategories)[number][]
  main_image?: string
  logo_image?: string

  // Datos de contacto:
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

  // Petición de miembros:
  member_requests: MemberRequest[]

  // Métodos:
  pushMemberRequest(request: MemberRequestValues): Promise<GroupDocument>
  removeMemberRequest(
    requestId: string,
    session?: ClientSession
  ): Promise<GroupDocument>
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

    // Petición de miembros:
    member_requests: [
      {
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        message: {type: String},
      },
    ],
  },
  {
    timestamps: true,
  }
)

//* MÉTODOS DE INSTANCIA:

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
//* MODELO:
const Group = models?.Group || model<GroupDocument>('Group', groupSchema)

export default Group
