import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import LocationSelector from '../ui/location-input'
import {UseFormReturn} from 'react-hook-form'
import InfoBadge from '../displaying/info-badge'

interface CountryFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  countryName: string
  provinceName: string
  label?: string
  description?: string
}

export default function CountryField({
  form,
  countryName,
  provinceName,
  label,
  description,
}: CountryFieldProps) {
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
