import {ExplorationFormValues} from '@/database/types/Exploration.type'

export const EMPTY_EXPLORATION: ExplorationFormValues = {
  instances: [],
  groups: [],
  caves: [],
  datatype: 'exploration',

  name: '',
  dates: [],
  cave_time: 0,
  participants: [],
  collaborators: [],

  description: '',
  incidents: '',
  inventory: '',
  pending_work: '',
}
