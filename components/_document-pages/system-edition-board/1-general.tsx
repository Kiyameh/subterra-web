import BooleanField from '@/components/_Atoms/fields/boolean-field'
import DistanceField from '@/components/_Atoms/fields/distance-field'
import MultiTextField from '@/components/_Atoms/fields/multi-text-field'
import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import TextField from '@/components/_Atoms/fields/text-field'
import {
  SystemFormValues,
  systemMaxCharacters,
} from '@/database/validation/system.schemas'
import {UseFormReturn} from 'react-hook-form'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de sistemas para la sección general.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function SystemGeneralFormFragment({
  form,
}: {
  form: UseFormReturn<SystemFormValues>
}) {
  return (
    <div className="space-y-6 p-2 py-6">
      <TextField
        control={form.control}
        name="catalog"
        label="Número de Catálogo externo"
        description="Referencia de catálogo en algún sistema externo a subterra"
        placeholder="CAT-333"
        maxCharacters={systemMaxCharacters.catalog}
      />
      <MultiTextField
        control={form.control}
        name="initials"
        label="Siglas"
        description="Añade una o varias siglas pulsando enter entre ellas"
        placeholder="PO-01"
      />
      <TextField
        control={form.control}
        name="name"
        label="Nombre del sistema"
        placeholder="Sistema de poniente"
        maxCharacters={systemMaxCharacters.name}
      />
      <MultiTextField
        control={form.control}
        name="alt_names"
        label="Nombres alternativos"
        description="Añade uno o varios nombres alternativos pulsando enter entre ellos"
        placeholder="Sistema de los vientos"
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
        maxCharacters={systemMaxCharacters.regulation_description}
      />
      <TextAreaField
        control={form.control}
        name="exploration_description"
        label="Historia de las exploraciones"
        maxCharacters={systemMaxCharacters.exploration_description}
      />
      <DistanceField
        control={form.control}
        name="length"
        label="Longitud"
        placeholder="23558"
      />
      <DistanceField
        control={form.control}
        name="depth"
        label="Profundidad"
        placeholder="527"
      />

      <TextField
        control={form.control}
        name="massif"
        label="Macizo"
        placeholder="Macizo de poniente"
        maxCharacters={systemMaxCharacters.massif}
      />
    </div>
  )
}
