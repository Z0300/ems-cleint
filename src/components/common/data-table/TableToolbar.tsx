'use client'

import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { Tabs } from '../../ui/tabs'
import { LucidePlus } from 'lucide-react'
import { TableTabs, type Option } from './TableTabs'
import { TableSelect } from './TableSelect'
import { Link } from '@tanstack/react-router'

interface TableToolbarProps<T extends string> {
    value: T
    to: string
    onChange: (value: T) => void
    searchValue: string
    onSearchChange?: (search: string) => void
    tabs: readonly Option<T>[]
    searchPlaceholder?: string
}

export function TableToolbar<T extends string>({
    tabs,
    to,
    value,
    onChange,
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search...',
}: TableToolbarProps<T>) {
    return (
        <Tabs value={value} onValueChange={(v) => onChange(v as T)} className='w-full flex-col justify-start gap-6'>
            <div className="flex items-center justify-between px-4 lg:px-6">
                <Label className="sr-only">View</Label>

                <TableSelect value={value} onChange={onChange} options={tabs} />

                <TableTabs tabs={tabs} />

                <div className="flex items-center gap-2">
                    <Input
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        className="w-64 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    <Link to={to}>
                        <Button variant="outline" size="sm">
                            <LucidePlus />
                            <span className="hidden lg:inline">Add New</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </Tabs>
    )
}