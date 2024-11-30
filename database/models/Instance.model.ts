import { Document, Schema, models, model, Types } from "mongoose";
import { UserObject } from "./User.model";
import { GroupObject } from "./Group.model";

//* INTERFACES:

export interface InstanceDocument extends Document {
  is_online: boolean;
  name: string;
  fullname: string;
  acronym: string;
  description: string;
  territory: string;
  admin: Types.ObjectId;
  owner: Types.ObjectId;
  editors: Types.ObjectId[];
  viewers: Types.ObjectId[];
  public_visibility: boolean;
  public_edition: boolean;
  main_image: string;
  map_image: string;
}

//* ESQUEMA:

const instanceSchema = new Schema<InstanceDocument>(
  {
    is_online: { type: Boolean, default: true },
    name: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    acronym: { type: String },
    description: { type: String },
    territory: { type: String },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    owner: { type: Schema.Types.ObjectId, ref: "Group" },
    editors: { type: [Schema.Types.ObjectId], ref: "User" },
    viewers: { type: [Schema.Types.ObjectId], ref: "User" },
    public_visibility: { type: Boolean, default: true },
    public_edition: { type: Boolean, default: false },
    main_image: { type: String },
    map_image: { type: String },
  },
  { timestamps: true },
);

//* ÍNDICES:

//* MIDDLEWARES:

//* MÉTODOS ESTATICOS:

//* MÉTODOS DE INSTANCIA:

//* MODELO:

const Instance =
  models?.Instance || model<InstanceDocument>("Instance", instanceSchema);

export default Instance;

//* INTERFACES EXTENDIDAS:

export interface InstanceObject
  extends Omit<InstanceDocument, "admin" | "owner" | "editors" | "viewers"> {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  admin: string;
  owner: string;
  editors: string[];
  viewers: string[];
}

export interface PopulatedInstance
  extends Omit<InstanceObject, "admin" | "owner" | "editors" | "viewers"> {
  admin: UserObject;
  owner: GroupObject;
  editors: UserObject[];
  viewers: UserObject[];
}
