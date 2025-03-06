import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import TextField from '@/components/_Atoms/fields/text-field'
import {
  CaveFormValues,
  caveMaxCharacters,
} from '@/database/validation/cave.schemas'
import {UseFormReturn} from 'react-hook-form'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de cuevas para la sección de ciencia.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function CaveScienceFormFragment({
  form,
}: {
  form: UseFormReturn<CaveFormValues>
}) {
  return (
    <div className="space-y-6 p-2 py-6">
      <TextField
        control={form.control}
        name="geolog_age"
        label="Edad geológica"
        maxCharacters={caveMaxCharacters.geolog_age}
      />
      <TextAreaField
        control={form.control}
        name="geolog_litology"
        label="Litología"
        placeholder="Datos de interes litológicos"
        maxCharacters={caveMaxCharacters.geolog_litology}
      />
      <TextAreaField
        control={form.control}
        name="arqueolog"
        label="Arqueología"
        placeholder="Datos de interes arqueológicos"
        maxCharacters={caveMaxCharacters.arqueolog}
      />
      <TextAreaField
        control={form.control}
        name="paleontolog"
        label="Paleontología"
        placeholder="Datos de interes paleontológicos"
        maxCharacters={caveMaxCharacters.paleontolog}
      />
      <TextAreaField
        control={form.control}
        name="mineralog"
        label="Mineralogía"
        placeholder="Datos de interes mineralógicos"
        maxCharacters={caveMaxCharacters.mineralog}
      />
      <TextAreaField
        control={form.control}
        name="contamination"
        label="Contaminación"
        placeholder="Presencia de residuos humanos"
        maxCharacters={caveMaxCharacters.contamination}
      />
      <TextAreaField
        control={form.control}
        name="biolog"
        label="Biología"
        placeholder="Datos de interes biológicos"
        maxCharacters={caveMaxCharacters.biolog}
      />
      <TextField
        control={form.control}
        name="hidrolog_system"
        label="Cuenca hidrológica"
        placeholder="Datos hidrológicos de la cuenca"
        maxCharacters={caveMaxCharacters.hidrolog_system}
      />
      <TextField
        control={form.control}
        name="hidrolog_subsystem"
        label="Subsistema hidrológico"
        placeholder="Datos hidrológicos locales"
        maxCharacters={caveMaxCharacters.hidrolog_subsystem}
      />
    </div>
  )
}
