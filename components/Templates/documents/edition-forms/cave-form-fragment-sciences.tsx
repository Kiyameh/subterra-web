import {UseFormReturn} from 'react-hook-form'
import {type CaveFormValues} from '@/database/types/Cave'
import {bigText} from '@/database/validation/validationDefaults'

import TextAreaField from '@/components/Molecules/fields/text-area-field'
import TextField from '@/components/Molecules/fields/text-field'

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
        maxCharacters={bigText}
      />
      <TextAreaField
        control={form.control}
        name="geolog_litology"
        label="Litología"
        placeholder="Datos de interes litológicos"
        maxCharacters={bigText}
      />
      <TextAreaField
        control={form.control}
        name="arqueolog"
        label="Arqueología"
        placeholder="Datos de interes arqueológicos"
        maxCharacters={bigText}
      />
      <TextAreaField
        control={form.control}
        name="paleontolog"
        label="Paleontología"
        placeholder="Datos de interes paleontológicos"
        maxCharacters={bigText}
      />
      <TextAreaField
        control={form.control}
        name="mineralog"
        label="Mineralogía"
        placeholder="Datos de interes mineralógicos"
        maxCharacters={bigText}
      />
      <TextAreaField
        control={form.control}
        name="contamination"
        label="Contaminación"
        placeholder="Presencia de residuos humanos"
        maxCharacters={bigText}
      />
      <TextAreaField
        control={form.control}
        name="biolog"
        label="Biología"
        placeholder="Datos de interes biológicos"
        maxCharacters={bigText}
      />
      <TextField
        control={form.control}
        name="hidrolog_system"
        label="Cuenca hidrológica"
        placeholder="Datos hidrológicos de la cuenca"
        maxCharacters={bigText}
      />
      <TextField
        control={form.control}
        name="hidrolog_subsystem"
        label="Subsistema hidrológico"
        placeholder="Datos hidrológicos locales"
        maxCharacters={bigText}
      />
    </div>
  )
}
