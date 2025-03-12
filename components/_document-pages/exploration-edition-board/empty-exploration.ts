import {ExplorationFormValues} from '@/database/validation/exploration.schemas'

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
