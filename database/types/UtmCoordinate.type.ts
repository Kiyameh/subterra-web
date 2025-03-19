import {z} from 'zod'

const maxXCoord = 999999
const maxYCoord = 9999999
const maxZCoord = 8849

export const coordProyections = ['WGS84', 'ETRS89', 'ED50'] as const

export const utmZones = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
] as const

export type CoordProyection = (typeof coordProyections)[number]

export type UtmZone = (typeof utmZones)[number]

export const UtmCoordinateSchema = z.object({
  x_coord: z.coerce
    .number()
    .min(1, {message: 'Coordenada requerida'})
    .max(maxXCoord, {message: 'Coordenada inválida'}),
  y_coord: z.coerce
    .number()
    .min(1, {message: 'Coordenada requerida'})
    .max(maxYCoord, {message: 'Coordenada inválida'}),
  z_coord: z.coerce
    .number()
    .min(0, {message: 'Coordenada inválida'})
    .max(maxZCoord, {message: '¿Más alto que el Everest?'})
    .optional(),
  coord_proyec: z.enum(coordProyections),
  coord_format: z.literal('UTM'),
  utm_zone: z.enum(utmZones),
  hemisphere: z.enum(['N', 'S']),
})

export type UtmCoordinate = z.infer<typeof UtmCoordinateSchema>
