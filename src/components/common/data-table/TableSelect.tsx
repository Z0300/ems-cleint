import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select'

interface TableSelectProps<T extends string> {
    value: T
    onChange: (value: T) => void
    options: readonly { value: T; label: string }[]
}

export function TableSelect<T extends string>({
    value,
    onChange,
    options,
}: TableSelectProps<T>) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm">
                <SelectValue />
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