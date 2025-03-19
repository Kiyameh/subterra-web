import {z} from 'zod'

const maxCharMsg = {message: 'Demasiado largo'}

export const anchorTypes = ['Sp', 'Spx', 'Qm', 'Pb8', 'Pb10', 'Na'] as const

export const anchorPurposes = ['Cab.', 'Frac.', 'Desv.'] as const

const ObstacleSchema = z.object({
  obstacle: z.string().max(200, maxCharMsg),
  obstacle_annotation: z.string().max(200, maxCharMsg).optional(),
  ropes: z
    .array(
      z.object({
        length: z.coerce.number().max(250, {message: 'Cuerda demasiado larga'}),
        rope_annotation: z.string().max(200, maxCharMsg).optional(),
        anchors: z.array(
          z.object({
            amount: z.coerce.number().max(10, {message: 'Demasiados anclajes'}),
            type: z.enum(anchorTypes),
            purpose: z.enum(anchorPurposes).optional(),
            anchor_annotation: z.string().max(200, maxCharMsg).optional(),
          })
        ),
      })
    )
    .optional(),
})

export const InstallationSchema = z.object({
  metadata: z.object({
    cave: z.string().max(200, maxCharMsg),
    name: z.string().max(200, maxCharMsg),
    description: z.string().max(500, maxCharMsg).optional(),
    date: z.coerce.date().optional(),
  }),
  obstacles: z.array(ObstacleSchema),
})

export type Installation = z.infer<typeof InstallationSchema>
