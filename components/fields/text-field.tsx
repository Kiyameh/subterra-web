import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {UseFormReturn} from 'react-hook-form'

interface TextFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  name: string
  label?: string
  description?: string
  placeholder?: string
}

export default function TextField({
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
          <FormItem className="space-y-0">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <FormControl>
              <Input
                className={fieldState.isDirty ? 'border border-purple-500' : ''}
                id={name}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}{' '}
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  )
}
