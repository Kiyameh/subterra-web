import {model, models, Schema, Types, Document} from 'mongoose'
import {contactSubjects} from './Platform.enums'

//* INTERFACES:
export interface PlatformDocument extends Document {
  name: string
  description: string
  url: string
  staff: Types.ObjectId[]
  instance_requests: {
    user: string
    group: string
    fullname: string
    description: string
    territory: string
    roles: string
    message: string
  }[]
  contact_messages: {
    user: string
    email: string
    message: string
    subject: (typeof contactSubjects)[number]
  }[]
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

//* MODELO:
const Platform =
  models?.Platform || model<PlatformDocument>('Platform', platformSchema)
export default Platform

//* INTERFACES EXTENDIDAS:

export interface PlatformObject extends Omit<PlatformDocument, 'staff'> {
  staff: string[]
  _id: string
}
