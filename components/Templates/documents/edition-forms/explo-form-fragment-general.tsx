import {UseFormReturn} from 'react-hook-form'

import {type CaveIndex} from '@/database/services/Cave/getCaveIndex'
import {type GroupIndex} from '@/database/services/Group/getGroupsIndex'
import {type ExplorationFormValues} from '@/database/types/Exploration'
import {hugeText, mediumText} from '@/database/validation/validationDefaults'

import MultiDateField from '@/components/Molecules/fields/multi-date-field'
import MultiRefSelectField from '@/components/Molecules/fields/multi-ref-select-field'
import MultiTextField from '@/components/Molecules/fields/multi-text-field'
import TextAreaField from '@/components/Molecules/fields/text-area-field'
import TextField from '@/components/Molecules/fields/text-field'
import TimeField from '@/components/Molecules/fields/time-field'

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
        maxCharacters={mediumText}
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
        maxCharacters={hugeText}
      />

      <TextAreaField
        control={form.control}
        name="incidents"
        label="Incidentes ocurridos"
        maxCharacters={hugeText}
      />
      <TextAreaField
        control={form.control}
        name="inventory"
        label="Inventario de la exploración"
        maxCharacters={hugeText}
      />
      <TextAreaField
        control={form.control}
        name="pending_work"
        label="Trabajos pendientes"
        maxCharacters={hugeText}
      />
    </div>
  )
}
