import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import TextField from '@/components/_Atoms/fields/text-field'
import {
  SystemFormValues,
  systemMaxCharacters,
} from '@/database/validation/system.schemas'
import {UseFormReturn} from 'react-hook-form'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de sistemas para la sección de ciencia.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function SystemScienceFormFragment({
  form,
}: {
  form: UseFormReturn<SystemFormValues>
}) {
  return (
    <div className="space-y-6 p-2 py-6">
      <TextField
        control={form.control}
        name="geolog_age"
        label="Edad geológica"
        maxCharacters={systemMaxCharacters.geolog_age}
      />
      <TextAreaField
        control={form.control}
        name="geolog_litology"
        label="Litología"
        placeholder="Datos de interes litológicos"
        maxCharacters={systemMaxCharacters.geolog_litology}
      />
      <TextAreaField
        control={form.control}
        name="arqueolog"
        label="Arqueología"
        placeholder="Datos de interes arqueológicos"
        maxCharacters={systemMaxCharacters.arqueolog}
      />
      <TextAreaField
        control={form.control}
        name="paleontolog"
        label="Paleontología"
        placeholder="Datos de interes paleontológicos"
        maxCharacters={systemMaxCharacters.paleontolog}
      />
      <TextAreaField
        control={form.control}
        name="mineralog"
        label="Mineralogía"
        placeholder="Datos de interes mineralógicos"
        maxCharacters={systemMaxCharacters.mineralog}
      />
      <TextAreaField
        control={form.control}
        name="contamination"
        label="Contaminación"
        placeholder="Presencia de residuos humanos"
        maxCharacters={systemMaxCharacters.contamination}
      />
      <TextAreaField
        control={form.control}
        name="biolog"
        label="Biología"
        placeholder="Datos de interes biológicos"
        maxCharacters={systemMaxCharacters.biolog}
      />
      <TextField
        control={form.control}
        name="hidrolog_system"
        label="Cuenca hidrológica"
        placeholder="Datos hidrológicos de la cuenca"
        maxCharacters={systemMaxCharacters.hidrolog_system}
      />
      <TextField
        control={form.control}
        name="hidrolog_subsystem"
        label="Subsistema hidrológico"
        placeholder="Datos hidrológicos locales"
        maxCharacters={systemMaxCharacters.hidrolog_subsystem}
      />
    </div>
  )
}
