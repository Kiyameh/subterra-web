import {groupCategories} from '@/database/models/Group.enums'
import React from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from '../ui/multi-select'
import {UseFormReturn} from 'react-hook-form'
import InfoBadge from '../displaying/info-badge'

interface MultipleSelectionFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  name: string
  label?: string
  description?: string
  placeholder?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}

export default function MultipleSelectionField({
  form,
  name,
  label,
  description,
  placeholder,
}: MultipleSelectionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="group_categories"
      render={({field}) => (
        <FormItem>
          <div className="flex gap-2">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            {description && <InfoBadge description={description} />}
          </div>
          <FormControl>
            <MultiSelector
              values={field.value as string[]}
              onValuesChange={field.onChange}
              loop
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder={placeholder} />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {groupCategories.map((category) => (
                    <MultiSelectorItem
                      key={category}
                      value={category}
                    >
                      {category}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
