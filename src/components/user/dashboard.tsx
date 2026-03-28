import {
    Calendar,
    Bell,
    MapPin,
    Clock,
    ChevronRight,
    User,
    Compass,
} from "lucide-react"
import { Link } from "@tanstack/react-router"
import PreferencesSheet from "./preferences-sheet"
import SearchEventsDialog from "./search-dialog"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

import { useUserDashboard } from "../../features/users/queries/user.queries"
import { differenceInCalendarDays, format, isAfter, isToday, isTomorrow, parseISO } from "date-fns"

interface User {
    id: string
    fullName: string
    email: string
}

function getInitials(fullName?: string | null): string {
    if (!fullName) return '?'
    return fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join('')
}

export default function Dashboard({ user }: { user: User | null }) {
    const initials = getInitials(user?.fullName);
    const { data: dashboardData } = useUserDashboard()

    const now = new Date()

    const firstUpcomingEvent = dashboardData?.registered
        .map((e) => ({ ...e, dateTime: parseISO(`${e.eventDate}T${e.startTime}`) }))
        .filter((e) => isAfter(e.dateTime, now))
        .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())[0]

    if (!firstUpcomingEvent) return null

    const getLiveLabel = (event: { dateTime: Date }) => {
        if (isToday(event.dateTime)) return "LIVE TODAY"
        if (isTomorrow(event.dateTime)) return "LIVE TOMORROW"

        const diffDays = differenceInCalendarDays(event.dateTime, now)
        return `LIVE IN ${diffDays} DAYS`
    }

    return (
        <div className="flex flex-col gap-6 pb-10 max-w-7xl mx-auto">


            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border bg-card px-6 py-5">
                <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 shrink-0 border border-border">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-base font-semibold bg-slate-100 text-slate-700">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            Welcome back, {user?.fullName?.split(' ')[0]} 👋
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            You have 2 events coming up this week.
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <Link to="/profile">
                        <Button variant="outline" size="sm" className="gap-2">
                            <User className="h-3.5 w-3.5" />
                            Edit Profile
                        </Button>
                    </Link>
                    <PreferencesSheet />
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                <div className="lg:col-span-2 flex flex-col gap-6">


                    {firstUpcomingEvent && (
                        <div className="rounded-2xl border bg-linear-to-br from-slate-800 to-slate-900 p-6 text-white flex flex-col gap-4">

                            <div className="flex items-center justify-between">
                                <Badge className="bg-white/20 text-white border-white/30 text-[10px] tracking-widest">
                                    {getLiveLabel(firstUpcomingEvent)}
                                </Badge>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    {firstUpcomingEvent.title}
                                </h2>

                                <div className="text-sm mt-2">
                                    {format(parseISO(`${firstUpcomingEvent.eventDate}T${firstUpcomingEvent.startTime}`), "MMM dd, yyyy")} ·{" "}
                                    {format(parseISO(`${firstUpcomingEvent.eventDate}T${firstUpcomingEvent.startTime}`), "h:mm a")}
                                </div>
                            </div>

                        </div>
                    )}


                    <div className="space-y-3">
                        <h2 className="text-base font-semibold tracking-tight">Discover</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <Link to="/events" className="group">
                                <div className="rounded-2xl bg-linear-to-br from-slate-800 to-slate-950 text-white p-5 flex flex-col gap-4 h-full min-h-[140px] relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                    <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Compass className="h-28 w-28" />
                                    </div>
                                    <div className="p-2.5 bg-white/20 rounded-xl w-fit">
                                        <Compass className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-base leading-snug">Browse All Events</p>
                                        <p className="text-xs text-slate-300/80 mt-1">
                                            Explore conferences, meetups & workshops worldwide.
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <SearchEventsDialog />

                        </div>
                    </div>


                    <div className="space-y-3">
                        <Tabs defaultValue="registered" className="w-full">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold tracking-tight">Your Events</h2>
                                <TabsList className="h-8 px-1">
                                    <TabsTrigger value="registered" className="text-xs h-6 px-3">Registered</TabsTrigger>
                                    <TabsTrigger value="past" className="text-xs h-6 px-3">Past</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="registered" className="mt-4 outline-none">
                                {dashboardData?.registered && dashboardData.registered.length > 0 ? (
                                    <div className="space-y-3">
                                        <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {dashboardData.registered.slice(0, 5).map((event) => (
                                                <Card key={event.id} className="w-[85%] sm:w-[320px] shrink-0 snap-start group overflow-hidden hover:shadow-sm transition-all border">
                                                    <CardContent className="p-4 space-y-3">
                                                        <div className="flex justify-between items-start gap-2">
                                                            <h3 className="font-semibold text-sm leading-snug group-hover:text-slate-900 transition-colors">
                                                                {event.title}
                                                            </h3>
                                                            <Badge
                                                                variant={event.type === 'Online' ? 'outline' : 'secondary'}
                                                                className="rounded-full text-[10px] shrink-0"
                                                            >
                                                                {event.type}
                                                            </Badge>
                                                        </div>
                                                        <div className="space-y-1 text-xs text-muted-foreground">
                                                            <p className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {event.eventDate}</p>
                                                            <p className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {event.startTime}</p>
                                                            <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {event.location}</p>
                                                        </div>
                                                        <div className="flex gap-2 pt-1">
                                                            <Button size="sm" className="h-7 text-xs flex-1">Details</Button>
                                                            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:bg-destructive/10">Cancel</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                        <div className="flex justify-end pr-1">
                                            <Link to="/events" className="inline-flex items-center text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                                See all <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground border rounded-2xl border-dashed">
                                        <p className="text-sm">You haven't registered for any events yet.</p>
                                        <Link to="/events">
                                            <Button variant="link" size="sm" className="mt-1 text-xs">Browse upcoming events</Button>
                                        </Link>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="past" className="mt-4 outline-none">
                                {dashboardData?.past && dashboardData.past.length > 0 ? (
                                    <div className="space-y-3">
                                        <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {dashboardData.past.slice(0, 5).map((event) => (
                                                <Card key={event.id} className="w-[85%] sm:w-[320px] shrink-0 snap-start group overflow-hidden hover:shadow-sm transition-all border bg-slate-50/50 dark:bg-slate-900/20">
                                                    <CardContent className="p-4 space-y-3 opacity-90 group-hover:opacity-100 transition-opacity">
                                                        <div className="flex justify-between items-start gap-2">
                                                            <h3 className="font-semibold text-sm leading-snug text-slate-700 dark:text-slate-300 transition-colors">
                                                                {event.title}
                                                            </h3>
                                                            <Badge
                                                                variant="secondary"
                                                                className="rounded-full text-[10px] shrink-0 bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                                            >
                                                                {event.type}
                                                            </Badge>
                                                        </div>
                                                        <div className="space-y-1 text-xs text-muted-foreground">
                                                            <p className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {event.eventDate}</p>
                                                            <p className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {event.startTime}</p>
                                                            <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3 items-start" /> <span className="truncate">{event.location}</span></p>
                                                        </div>
                                                        <div className="flex gap-2 pt-1">
                                                            <Button variant="outline" size="sm" className="h-7 text-xs flex-1">View Details</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                        <div className="flex justify-end pr-1">
                                            <Link to="/events" className="inline-flex items-center text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                                See all <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground border rounded-2xl border-dashed">
                                        <p className="text-sm">You haven't attended any events yet.</p>
                                        <Link to="/events">
                                            <Button variant="link" size="sm" className="mt-1 text-xs">Browse past events</Button>
                                        </Link>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>

                </div>


                <div className="flex flex-col gap-6">

                    <Card className="border shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4">
                            <CardTitle className="text-sm font-semibold">Notifications</CardTitle>
                            <Bell className="h-3.5 w-3.5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-2">
                            <div className="flex gap-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                                <div>
                                    <p className="text-[11px] font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wide">Venue Change</p>
                                    <p className="text-xs text-orange-700 dark:text-orange-400 mt-0.5">Startup Meetup moved to Hall B.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-3 rounded-xl border border-transparent">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-700 shrink-0" />
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wide">Registration Open</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">AI Summit early bird is now open.</p>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full h-7 text-xs mt-1" size="sm">
                                View All Notifications
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold">Recommended</h2>
                            <Button variant="ghost" size="sm" className="h-auto py-0 text-xs text-slate-700 font-semibold hover:text-slate-900">
                                See all
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {dashboardData?.recommended.map((event) => (
                                <Card key={event.id} className="group cursor-pointer hover:bg-accent/50 transition-colors border">
                                    <CardContent className="px-3 py-3 flex items-center gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold leading-snug line-clamp-1">{event.title}</h4>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">{event.eventDate}</p>
                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                {event.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-muted">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-slate-800 transition-colors" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
