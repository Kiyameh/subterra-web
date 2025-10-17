import {model, models, Schema} from 'mongoose'
import {type CaveDocument, caveShapes} from '@/database/types/Cave'
import {coordProyections, utmZones} from '@/database/types/UtmCoordinate'
import {anchorTypes, anchorPurposes} from '@/database/types/Installation'
import {topographyTypes} from '@/database/types/Topography'

//* ESQUEMA:

const caveSchema = new Schema<CaveDocument>(
  {
    //* Versiones:
    versions: [Schema.Types.Mixed],
    //* Manejo de relaciones:
    datatype: {type: String, required: true, default: 'cave'},
    instances: {type: [Schema.Types.ObjectId], ref: 'Instance', required: true},
    system: {type: Schema.Types.ObjectId, ref: 'System'},

    //* Datos troncales:
    catalog: {type: String},
    initials: {type: [String]},
    name: {type: String},
    alt_names: {type: [String]},

    //* Datos descriptivos:
    cave_shapes: {type: [String], enum: caveShapes},
    description: {type: String},
    regulations: {type: Boolean},
    regulation_description: {type: String},
    length: {type: Number},
    depth: {type: Number},

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
    location_confirmed: 
      {
        date: {type: Date, required: true},
        author: {type: String},
      },

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
            enum: topographyTypes,
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
  },
  {timestamps: true}
)

//* MODELO:
const Cave = models?.Cave || model<CaveDocument>('Cave', caveSchema)

export default Cave
