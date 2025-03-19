import {CaveFormValues} from '@/database/types/Cave.type'

export const EMPTY_CAVE: CaveFormValues = {
  datatype: 'cave',
  instances: [],
  system: undefined,

  catalog: '',
  initials: [],
  name: '',
  alt_names: [],

  cave_shapes: [],
  description: '',
  regulations: undefined,
  regulation_description: '',
  length: 0,
  depth: 0,

  municipality: '',
  locality: '',
  toponymy: [],
  massif: '',
  location_description: '',

  geolog_age: '',
  geolog_litology: '',
  arqueolog: '',
  paleontolog: '',
  mineralog: '',
  contamination: '',
  biolog: '',
  hidrolog_system: '',
  hidrolog_subsystem: '',

  coordinates: {
    x_coord: 0,
    y_coord: 0,
    z_coord: 0,
    coord_format: 'UTM',
    coord_proyec: 'ETRS89',
    hemisphere: 'N',
    utm_zone: '30',
  },

  pictures: [],
  topographies: [],
  installations: [],
}
