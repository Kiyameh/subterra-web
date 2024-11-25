import React from 'react'
import {UseFormReturn} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import InfoBadge from '../displaying/info-badge'
import {PhoneInput} from '../ui/phone-input'

interface PhoneFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  name: string
  label?: string
  description?: string
  placeholder?: string
}
export default function PhoneField({
  form,
  name,
  label,
  description,
  placeholder,
}: PhoneFieldProps) {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({field}) => (
        <FormItem className="flex flex-col items-start">
          <div className="flex gap-2">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            {description && <InfoBadge description={description} />}
          </div>
          <FormControl className="w-full">
            <PhoneInput
              placeholder={placeholder}
              {...field}
              defaultCountry="ES"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
