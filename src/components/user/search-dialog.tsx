import { useState } from "react"
import { Search, History, TrendingUp, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Link } from "@tanstack/react-router"

const RECENT_SEARCHES = ["AI Summit", "React Conference", "Local Hackathon"]
const TRENDING_TAGS = ["Machine Learning", "Web3", "UI/UX", "Startups", "Health Tech"]

export default function SearchEventsDialog() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)


  const showResults = query.length > 0

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="rounded-2xl border bg-card p-5 flex flex-col gap-4 h-full min-h-[140px] cursor-pointer group hover:bg-accent/50 transition-colors">
          <div className="p-2.5 bg-slate-100 rounded-xl w-fit group-hover:bg-slate-800 group-hover:text-white transition-colors">
            <Search className="h-5 w-5 text-slate-600 group-hover:text-white" />
          </div>
          <div>
            <p className="font-bold text-base leading-snug">Search Events</p>
            <p className="text-xs text-muted-foreground mt-1">Find something specific fast.</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden bg-background">
        <DialogHeader className="p-4 pb-0 items-center justify-between flex-row border-b">
          <div className="flex items-center w-full px-2 pb-3">
            <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
            <input
              autoFocus
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-base placeholder:text-muted-foreground"
              placeholder="Search for events, venues, or topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-full hover:bg-accent"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <DialogTitle className="sr-only">Search Events</DialogTitle>
        </DialogHeader>

        <div className="max-h-[350px] overflow-y-auto">
          {!showResults && (
            <div className="p-6 space-y-6">

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <History className="h-4 w-4" />
                  Recent Searches
                </div>
                <div className="flex flex-col gap-1 text-sm text-slate-600">
                  {RECENT_SEARCHES.map((search) => (
                    <button
                      key={search}
                      className="flex items-center px-2 py-2 w-full text-left rounded-md hover:bg-slate-100 transition-colors"
                      onClick={() => setQuery(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>


              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <TrendingUp className="h-4 w-4" />
                  Trending Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_TAGS.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-slate-200 text-xs font-normal px-3 py-1 bg-slate-100 text-slate-700"
                      onClick={() => setQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showResults && (
            <div className="p-4 space-y-2">
              <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Search Results
              </p>

              <Link to="/events" className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                <div className="h-10 w-10 shrink-0 bg-slate-100 rounded-md flex items-center justify-center">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">View all events matching "{query}"</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Press Enter to search</p>
                </div>
              </Link>

              {query.toLowerCase().includes("ai") && (
                <div className="flex flex-col mt-2">
                  <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">
                    Top Event Matches
                  </p>
                  <Link to="/events" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-border" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 font-bold text-xs text-center leading-none min-w-[40px]">
                        Nov<br /><span className="text-sm">15</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 leading-snug">Global AI Summit 2026</p>
                        <p className="text-xs text-muted-foreground mt-0.5">San Francisco, CA</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {showResults && (
          <div className="p-4 bg-slate-50 border-t flex justify-end">
            <Link to="/events" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="bg-slate-800 text-white hover:bg-slate-900">
                Search All
              </Button>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
