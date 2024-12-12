import React from 'react'
import {UseFormReturn} from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import InfoBadge from '@/components/_Atoms/indicators/info-badge'
import LocationSelector from '@/components/ui/location-input'

/**
 * @version 1
 * @description Campo de selección de país y provincia controlado por RHF.
 * @param form Controlador de RHF
 * @param countryName Path del campo de país
 * @param provinceName Path del campo de provincia
 * @param label Etiqueta del campo
 * @param description Descripción del campo
 */

export default function CountryField({
  form,
  countryName,
  provinceName,
  label,
  description,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  countryName: string
  provinceName: string
  label?: string
  description?: string
}) {
  return (
    <FormField
      control={form.control}
      name="country"
      render={() => (
        <FormItem className="space-y-1">
          <div className="flex gap-2">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <InfoBadge description={description} />}
          </div>

          <FormControl>
            <LocationSelector
              onCountryChange={(country) => {
                form.setValue(countryName, country?.name || '')
              }}
              onStateChange={(state) => {
                form.setValue(provinceName, state?.name || '')
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
