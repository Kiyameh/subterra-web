import {model, models, Schema} from 'mongoose'
import {SystemDocument} from '../types/System'
import {anchorTypes, anchorPurposes} from '../types/Installation'

//* ESQUEMA:
const systemSchema = new Schema<SystemDocument>({
  //* Manejo de relaciones:
  datatype: {type: String, required: true, default: 'system'},
  instances: {type: [Schema.Types.ObjectId], ref: 'Instance', required: true},

  //* Datos troncales:
  catalog: {type: String},
  initials: {type: [String]},
  name: {type: String, required: true, unique: true},
  alt_names: {type: [String]},

  //* Datos descriptivos:
  description: {type: String},
  regulations: {type: Boolean},
  regulation_description: {type: String},
  length: {type: Number},
  depth: {type: Number},
  massif: {type: String},

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

  //* Datos exploración:
  historical_explorations: [
    {
      date: {type: Date, required: true},
      author: {type: String},
      publication: {type: String},
      description: {type: String},
    },
  ],

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

  installations: {
    type: [
      {
        metadata: {
          cave: {type: String},
          name: {type: String},
          description: {type: String},
          date: {type: Date},
        },
        obstacles: [
          {
            obstacle: {type: String},
            obstacle_annotation: {type: String},
            ropes: [
              {
                length: {type: Number},
                rope_annotation: {type: String},
                anchors: [
                  {
                    amount: {type: Number},
                    type: {type: String, enum: anchorTypes},
                    purpose: {type: String, enum: anchorPurposes},
                    anchor_annotation: {type: String},
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})

//* MODELO:

const System = models?.System || model<SystemDocument>('System', systemSchema)

export default System
