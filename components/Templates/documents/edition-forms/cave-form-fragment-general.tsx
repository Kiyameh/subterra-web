import {UseFormReturn} from 'react-hook-form'

import {type SystemIndex} from '@/database/services/System/getSystemIndex'
import {type CaveFormValues} from '@/database/types/Cave'
import {caveShapes} from '@/database/types/Cave'

import BooleanField from '@/components/Molecules/fields/boolean-field'
import DistanceField from '@/components/Molecules/fields/distance-field'
import MultiSelectField from '@/components/Molecules/fields/multi-select-field'
import MultiTextField from '@/components/Molecules/fields/multi-text-field'
import RefSelectField from '@/components/Molecules/fields/ref-select-field'
import TextAreaField from '@/components/Molecules/fields/text-area-field'
import TextField from '@/components/Molecules/fields/text-field'

import {
  bigText,
  hugeText,
  smallText,
  tinyText,
} from '@/database/validation/validationDefaults'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de cuevas para la sección general.
 * @param form - Objeto de formulario de react-hook-form.
 * @param systemIndex - Lista de sistemas karsticos.
 */

export default function CaveGeneralFormFragment({
  form,
  systemIndex,
}: {
  form: UseFormReturn<CaveFormValues>
  systemIndex: SystemIndex[] | undefined
}) {
  return (
    <div className="space-y-6 p-2 py-6">
      <RefSelectField
        control={form.control}
        name="system"
        label="Sistema karstico"
        noOptionsText="Todavía no hay ningun sistema creado"
        index={systemIndex}
      />
      <TextField
        control={form.control}
        name="catalog"
        label="Número de Catálogo externo"
        description="Referencia de catálogo en algún sistema externo a subterra"
        placeholder="CAT-123"
        maxCharacters={tinyText}
      />
      <MultiTextField
        control={form.control}
        name="initials"
        label="Siglas de exploración"
        description="Añade una o varias siglas pulsando enter entre ellas"
        placeholder="AR-01"
      />
      <TextField
        control={form.control}
        name="name"
        label="Nombre"
        placeholder="Cueva del pirata"
        maxCharacters={smallText}
      />
      <MultiTextField
        control={form.control}
        name="alt_names"
        label="Nombres alternativos"
        description="Añade uno o varios nombres alternativos pulsando enter entre ellos"
        placeholder="Torca de isla tortuga"
      />
      <MultiSelectField
        control={form.control}
        name="cave_shapes"
        label="Tipo de entrada"
        options={caveShapes as unknown as string[]}
      />
      <TextAreaField
        control={form.control}
        name="description"
        label="Descripción"
        maxCharacters={hugeText}
      />
      <BooleanField
        control={form.control}
        name="regulations"
        label="Regulaciones"
      />
      <TextAreaField
        control={form.control}
        name="regulation_description"
        label="Descripción de las regulaciones"
        maxCharacters={bigText}
      />
      <DistanceField
        control={form.control}
        name="length"
        label="Longitud"
        placeholder="1242"
      />
      <DistanceField
        control={form.control}
        name="depth"
        label="Profundidad"
        placeholder="102"
      />
    </div>
  )
}
