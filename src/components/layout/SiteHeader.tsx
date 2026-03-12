import { useMatches } from '@tanstack/react-router'
import { SidebarTrigger } from '../../components/ui/sidebar'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { ModeToggle } from '../global/mode-toggle'


export function SiteHeader() {
  const matches = useMatches()
  const currentMatch = matches[matches.length - 1]
  const title = currentMatch?.staticData?.title ?? ''

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>

    </>
  )
}
