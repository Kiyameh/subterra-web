import {z} from 'zod'

const ObstacleSchema = z.object({
  obstacle: z.string(),
  obstacle_annotation: z.string().optional(),
  ropes: z
    .array(
      z.object({
        length: z.number(),
        rope_annotation: z.string().optional(),
        anchors: z.array(
          z.object({
            amount: z.number(),
            type: z.enum(['Sp', 'Spx', 'Qm', 'Pb8', 'Pb10', 'Na']),
            purpose: z.enum(['Cab.', 'Frac.', 'Desv.']).optional(),
            anchor_annotation: z.string().optional(),
          })
        ),
      })
    )
    .optional(),
})

export const InstallationSchema = z.object({
  metadata: z.object({
    cave: z.string(),
    name: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
  }),
  obstacles: z.array(ObstacleSchema),
})

export type Installation = z.infer<typeof InstallationSchema>
