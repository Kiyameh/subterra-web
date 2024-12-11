import {model, models, Schema, Types, Document} from 'mongoose'
import {contactSubjects} from './Platform.enums'

//* INTERFACES:

export interface ContactMessage extends Document {
  user: string
  email: string
  message: string
  subject: (typeof contactSubjects)[number]
  _id: Types.ObjectId
}

export interface InstanceRequest extends Document {
  user: string
  group: string
  fullname: string
  description: string
  territory: string
  roles: string
  message: string
  _id: Types.ObjectId
}

export interface PlatformDocument extends Document {
  name: string
  description: string
  url: string
  staff: Types.ObjectId[]
  instance_requests: InstanceRequest[]
  contact_messages: ContactMessage[]
  checkIsStaff(userId: string): boolean
  pushContactMessage(newMessage: ContactMessage): Promise<PlatformDocument>
  removeContactMessage(messageId: string): Promise<PlatformDocument>
  pushInstanceRequest(newRequest: InstanceRequest): Promise<PlatformDocument>
  removeInstanceRequest(requestId: string): Promise<PlatformDocument>
}

//* ESQUEMA:
const platformSchema = new Schema<PlatformDocument>({
  name: {type: String, required: true, unique: true},
  description: {type: String},
  url: {type: String},
  staff: {type: [Schema.Types.ObjectId], ref: 'User'},
  instance_requests: [
    {
      user: {type: String, required: true},
      group: {type: String, required: true},
      fullname: {type: String},
      description: {type: String},
      territory: {type: String},
      roles: {type: String},
      message: {type: String},
    },
  ],
  contact_messages: [
    {
      user: {type: String, required: true},
      email: {type: String, required: true},
      subject: {type: String, enum: contactSubjects, required: true},
      message: {type: String, required: true},
    },
  ],
})

//* MÉTODOS:
platformSchema.methods.checkIsStaff = function (userId: string) {
  return this.staff.some(
    (staffId: Types.ObjectId) => staffId.toString() === userId
  )
}

platformSchema.methods.pushContactMessage = async function (
  newMessage: ContactMessage
) {
  this.contact_messages.push(newMessage)
  return this.save()
}

platformSchema.methods.removeContactMessage = async function (
  messageId: string
) {
  this.contact_messages = this.contact_messages.filter(
    (message: ContactMessage) => message._id.toString() !== messageId
  )
  return this.save()
}

platformSchema.methods.pushInstanceRequest = async function (
  newRequest: InstanceRequest
) {
  this.instance_requests.push(newRequest)
  return this.save()
}

platformSchema.methods.removeInstanceRequest = async function (
  requestId: string
) {
  this.instance_requests = this.instance_requests.filter(
    (request: InstanceRequest) => request._id.toString() !== requestId
  )
  return this.save()
}

//* MODELO:
const Platform =
  models?.Platform || model<PlatformDocument>('Platform', platformSchema)
export default Platform

//* INTERFACES EXTENDIDAS:
export interface PlatformObject extends Omit<PlatformDocument, 'staff'> {
  staff: string[]
  _id: string
}
