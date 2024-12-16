'use client'
import React from 'react'
import {FieldValues, Path, PathValue, UseFormReturn} from 'react-hook-form'
import InfoBadge from '@/components/_Atoms/indicators/info-badge'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

//? Actualizar con otros países y provincias si necesario:
import EU_countries from '@/database/data/EU_countries.json'
import EU_provinces from '@/database/data/EU_provinces.json'

/**
 * @version 1
 * @description Campo de selección de país y provincia controlado por RHF. Coloreado en [emphasis] si ha sido modificado y no tiene errores.
 * @param form Retorno de hook de RHF
 * @param countryName Path del campo de país
 * @param provinceName Path del campo de provincia
 * @param countryLabel Etiqueta del campo de país
 * @param provinceLabel Etiqueta del campo de provincia
 * @param countryDescription Descripción del campo de país
 * @param provinceDescription Descripción del campo de provincia
 */

export default function CountryField<
  T extends FieldValues,
  U extends FieldValues,
>({
  form,
  countryName,
  provinceName,
  countryLabel = 'País',
  provinceLabel = 'Provincia',
  countryDescription,
  provinceDescription,
}: {
  form: UseFormReturn<T | U>
  countryName: Path<T>
  provinceName: Path<U>
  countryLabel?: string
  provinceLabel?: string
  countryDescription?: string
  provinceDescription?: string
}) {
  const [country, setCountry] = React.useState(form.getValues(countryName))

  return (
    <>
      {/* Selector de País */}
      <FormField
        control={form.control}
        name={countryName}
        render={({field, fieldState}) => (
          <FormItem className="space-y-1">
            <div className="flex gap-2">
              {countryLabel && <FormLabel>{countryLabel}</FormLabel>}
              {countryDescription && (
                <InfoBadge description={countryDescription} />
              )}
            </div>
            <FormControl>
              <Select
                onValueChange={(data) => {
                  setCountry(
                    data as PathValue<T, Path<T>> | PathValue<U, Path<U>>
                  )
                  field.onChange(data)
                }}
                value={field.value}
              >
                <SelectTrigger
                  className={
                    fieldState.isDirty && !fieldState.error
                      ? 'border border-emphasis'
                      : ''
                  }
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EU_countries.map((option, i) => (
                    <SelectItem
                      key={i}
                      value={option.native}
                    >
                      {option.native}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Selector de Provincia */}
      <FormField
        control={form.control}
        name={provinceName}
        render={({field, fieldState}) => (
          <FormItem className="space-y-1">
            <div className="flex gap-2">
              {provinceLabel && <FormLabel>{provinceLabel}</FormLabel>}
              {provinceDescription && (
                <InfoBadge description={provinceDescription} />
              )}
            </div>
            <FormControl>
              <Select
                disabled={(country as string).length < 1}
                onValueChange={field.onChange}
                value={field.value}
                name={field.name}
              >
                <SelectTrigger
                  onBlur={field.onBlur}
                  ref={field.ref}
                  className={
                    fieldState.isDirty && !fieldState.error
                      ? 'border border-emphasis'
                      : ''
                  }
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EU_provinces.filter((pronvince) => {
                    return pronvince.country_native === country
                  }).map((option, i) => (
                    <SelectItem
                      key={i}
                      value={option.name}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
