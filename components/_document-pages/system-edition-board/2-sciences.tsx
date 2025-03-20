import TextAreaField from '@/components/_Atoms/fields/text-area-field'
import TextField from '@/components/_Atoms/fields/text-field'
import {SystemFormValues} from '@/database/types/System'
import {bigText} from '@/database/validation/validationDefaults'
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
