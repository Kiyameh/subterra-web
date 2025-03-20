import {SystemFormValues} from '@/database/types/System'

export const EMPTY_SYSTEM: SystemFormValues = {
  instances: [],
  datatype: 'system',

  catalog: '',
  initials: [],
  name: '',
  alt_names: [],

  description: '',
  regulations: false,
  regulation_description: '',
  length: 0,
  depth: 0,
  massif: '',

  geolog_age: '',
  geolog_litology: '',
  arqueolog: '',
  paleontolog: '',
  mineralog: '',
  contamination: '',
  biolog: '',
  hidrolog_system: '',
  hidrolog_subsystem: '',

  pictures: [],
  topographies: [],
  installations: [],
}
