import MultiDateField from '@/components/_Atoms/fields/multi-date-field'
import MultiRefSelectField from '@/components/_Atoms/fields/multi-ref-select-field'
import MultiTextField from '@/components/_Atoms/fields/multi-text-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import TextField from '@/components/_Atoms/fields/text-field'
import TimeField from '@/components/_Atoms/fields/time-field'
import {CaveIndex} from '@/database/services/cave.actions'
import {GroupIndex} from '@/database/services/group.actions'
import {
  ExplorationFormValues,
  explorationMaxCharacters,
} from '@/database/validation/exploration.schemas'

import {UseFormReturn} from 'react-hook-form'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de cuevas para la sección general.
 * @param form - Objeto de formulario de react-hook-form.
 * @param systemIndex - Lista de sistemas karsticos.
 */

export default function ExplorationGeneralFormFragment({
  form,
  groupIndex,
  caveIndex,
}: {
  form: UseFormReturn<ExplorationFormValues>
  groupIndex: GroupIndex[] | undefined
  caveIndex: CaveIndex[] | undefined
}) {
  return (
    <div className="space-y-6 p-2 py-6">
      <MultiRefSelectField
        control={form.control}
        name="groups"
        label="Grupos"
        index={groupIndex}
      />
      <MultiRefSelectField
        control={form.control}
        name="caves"
        label="Cavidades"
        index={caveIndex}
      />
      <TextField
        control={form.control}
        name="name"
        label="Titulo de la exploracion"
        maxCharacters={explorationMaxCharacters.name}
      />
      <MultiDateField
        control={form.control}
        name="dates"
        label="Fechas de la exploración"
      />

      <TimeField
        control={form.control}
        name="cave_time"
        label="Tiempo en cueva"
        description="Tiempo aproximado de trabajo dentro de cavidad"
      />

      <MultiTextField
        control={form.control}
        name="participants"
        label="Participantes"
        description="Introduce los participantes separados por enter"
      />
      <MultiTextField
        control={form.control}
        name="collaborators"
        label="Colaboradores"
        description="Introduce personas o entidades colaboradoras separadas por enter"
      />

      <TextAreaField
        control={form.control}
        name="description"
        label="Relato de la exploración"
        maxCharacters={explorationMaxCharacters.description}
      />

      <TextAreaField
        control={form.control}
        name="incidents"
        label="Incidentes ocurridos"
        maxCharacters={explorationMaxCharacters.incidents}
      />
      <TextAreaField
        control={form.control}
        name="inventory"
        label="Inventario de la exploración"
        maxCharacters={explorationMaxCharacters.inventory}
      />
      <TextAreaField
        control={form.control}
        name="pending_work"
        label="Trabajos pendientes"
        maxCharacters={explorationMaxCharacters.pending_work}
      />
    </div>
  )
}
