import Divider from '@/components/Molecules/boxes/divider'
import InfoBox from '@/components/Molecules/boxes/info-box'
import DistanceField from '@/components/Molecules/fields/distance-field'
import MultiTextField from '@/components/Molecules/fields/multi-text-field'
import SelectField from '@/components/Molecules/fields/select-field'
import TextAreaField from '@/components/Molecules/fields/text-area-field'
import TextField from '@/components/Molecules/fields/text-field'
import {CaveFormValues} from '@/database/types/Cave'
import {utmZones} from '@/database/types/UtmCoordinate'
import {bigText, mediumText} from '@/database/validation/validationDefaults'
import {UseFormReturn} from 'react-hook-form'
import {BsExclamationTriangle} from 'react-icons/bs'

/**
 * @version 1
 * @description Fragmento del formulario de edición o creación de cuevas para la sección de localización.
 * @param form - Objeto de formulario de react-hook-form.
 */

export default function CaveLocationFormFragment({
  form,
}: {
  form: UseFormReturn<CaveFormValues>
}) {
  return (
    <div className="space-y-6 p-2 py-6">
      <Divider text="Coordenadas" />
      <InfoBox
        color="warning"
        title="Datum"
        icon={<BsExclamationTriangle />}
        className="mb-4"
      >
        Asegurate de intruducir las coordenadas en Datum ETRS89
      </InfoBox>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <DistanceField
          control={form.control}
          name="coordinates.x_coord"
          label="Coordenada X"
        />
        <DistanceField
          control={form.control}
          name="coordinates.y_coord"
          label="Coordenada Y"
        />
        <DistanceField
          control={form.control}
          name="coordinates.z_coord"
          label="Coordenada Z"
        />
        <SelectField
          control={form.control}
          name="coordinates.hemisphere"
          label="Hemisferio"
          options={['N', 'S']}
        />
        <SelectField
          control={form.control}
          name="coordinates.utm_zone"
          label="Zona UTM"
          options={utmZones as unknown as string[]}
        />
      </div>
      <Divider />
      <TextField
        control={form.control}
        name="municipality"
        label="Municipio"
        placeholder="Isla tortuga"
        maxCharacters={mediumText}
      />
      <TextField
        control={form.control}
        name="locality"
        label="Localidad"
        placeholder="Tortuga"
        maxCharacters={mediumText}
      />
      <MultiTextField
        control={form.control}
        name="toponymy"
        label="Toponimia"
        description="Añade uno o varios topónimos pulsando enter entre ellos"
        placeholder="Mar del sur"
      />
      <TextField
        control={form.control}
        name="massif"
        label="Macizo"
        placeholder="Montes de poniente"
        maxCharacters={mediumText}
      />
      <TextAreaField
        control={form.control}
        name="location_description"
        label="Descripción de la localización"
        maxCharacters={bigText}
      />
    </div>
  )
}
