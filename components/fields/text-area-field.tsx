import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {UseFormReturn} from 'react-hook-form'
import InfoBadge from '../displaying/info-badge'
import {Textarea} from '../ui/textarea'

interface TextFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  name: string
  label?: string
  description?: string
  placeholder?: string
}

export default function TextAreaField({
  form,
  name,
  label,
  description,
  placeholder,
}: TextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({field, fieldState}) => (
        <>
          <FormItem className="space-y-1">
            <div className="flex gap-2">
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
              {description && <InfoBadge description={description} />}
            </div>
            <FormControl>
              <Textarea
                className={
                  fieldState.isDirty
                    ? 'border border-purple-500 resize-none'
                    : 'resize-none'
                }
                id={name}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  )
}
