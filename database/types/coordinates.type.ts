import {coordProyections, utmZones} from '@/database/models/Cave.enums'

export interface UtmCoordinate {
  x_coord: number
  y_coord: number
  z_coord?: number
  coord_proyec: (typeof coordProyections)[number]
  coord_format: 'UTM'
  utm_zone: (typeof utmZones)[number]
  hemisphere: 'N' | 'S'
}
