import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface SelectFieldProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string }[]
  placeholder?: string
}

export function SelectField<T extends string>({ value, onChange, options }: SelectFieldProps<T>) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm">
        <SelectValue placeholder="Select a view" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
