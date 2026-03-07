import { TabsList, TabsTrigger } from '../../ui/tabs'

export type Option<T extends string> = {
    value: T
    label: string
}

interface TableTabsProps<T extends string> {
    tabs: readonly Option<T>[]
}

export function TableTabs<T extends string>({ tabs }: TableTabsProps<T>) {
    return (
        <TabsList className="hidden @4xl/main:flex">
            {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                </TabsTrigger>
            ))}
        </TabsList>
    )
}