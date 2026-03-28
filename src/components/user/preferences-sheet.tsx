import { useState } from "react"
import { Settings, Bell, Tag, Clock, Check } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetTrigger,
} from "../ui/sheet"


interface NotificationPref {
    id: string
    label: string
    description: string
    enabled: boolean
}


const INTEREST_TAGS = [
    "Technology", "Business", "Design", "AI & ML",
    "Startup", "Music", "Health", "Gaming",
    "Education", "Finance", "Marketing", "Science",
]

const REMINDER_OPTIONS = [
    { value: "15m", label: "15 minutes before" },
    { value: "30m", label: "30 minutes before" },
    { value: "1h", label: "1 hour before" },
    { value: "1d", label: "1 day before" },
]

const DEFAULT_NOTIFICATIONS: NotificationPref[] = [
    {
        id: "event_reminders",
        label: "Event Reminders",
        description: "Get reminded before your registered events",
        enabled: true,
    },
    {
        id: "reg_confirmations",
        label: "Registration Confirmations",
        description: "Confirm when you register or cancel",
        enabled: true,
    },
    {
        id: "event_updates",
        label: "Event Updates",
        description: "Venue changes, time updates, and more",
        enabled: true,
    },
    {
        id: "recommendations",
        label: "Recommended Events",
        description: "New events matching your interests",
        enabled: false,
    },
]


function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${enabled ? "bg-slate-800" : "bg-slate-200"
                }`}
        >
            <span
                className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${enabled ? "translate-x-4" : "translate-x-0"
                    }`}
            />
        </button>
    )
}


export default function PreferencesSheet() {
    const [notifications, setNotifications] = useState<NotificationPref[]>(DEFAULT_NOTIFICATIONS)
    const [interests, setInterests] = useState<string[]>(["Technology", "AI & ML"])
    const [reminderTime, setReminderTime] = useState("1h")
    const [saved, setSaved] = useState(false)

    const toggleNotification = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
        )
    }

    const toggleInterest = (tag: string) => {
        setInterests((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        )
    }

    const handleSave = () => {

        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-3.5 w-3.5" />
                    Preferences
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col gap-0 p-0 w-full sm:max-w-sm">

                <SheetHeader className="px-6 pt-6 pb-4 border-b">
                    <SheetTitle className="text-base font-semibold">Preferences</SheetTitle>
                    <SheetDescription className="text-xs">
                        Customize your notification and discovery settings.
                    </SheetDescription>
                </SheetHeader>


                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">


                    <section className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Bell className="h-3.5 w-3.5 text-slate-500" />
                            <h3 className="text-sm font-semibold tracking-tight">Notifications</h3>
                        </div>
                        <div className="space-y-4">
                            {notifications.map((n) => (
                                <div key={n.id} className="flex items-start justify-between gap-4">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium leading-none">{n.label}</p>
                                        <p className="text-xs text-muted-foreground">{n.description}</p>
                                    </div>
                                    <Toggle enabled={n.enabled} onChange={() => toggleNotification(n.id)} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <Separator />


                    <section className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-slate-500" />
                            <h3 className="text-sm font-semibold tracking-tight">Default Reminder</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {REMINDER_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setReminderTime(opt.value)}
                                    className={`relative flex items-center justify-center rounded-lg border px-3 py-2.5 text-xs font-medium transition-all cursor-pointer ${reminderTime === opt.value
                                        ? "border-slate-800 bg-slate-800 text-white shadow-sm"
                                        : "border-border bg-card text-muted-foreground hover:border-slate-400 hover:text-foreground"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    <Separator />


                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Tag className="h-3.5 w-3.5 text-slate-500" />
                                <h3 className="text-sm font-semibold tracking-tight">Event Interests</h3>
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                                {interests.length} selected
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground -mt-2">
                            Select topics to get better event recommendations.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {INTEREST_TAGS.map((tag) => {
                                const active = interests.includes(tag)
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleInterest(tag)}
                                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${active
                                            ? "border-slate-800 bg-slate-800 text-white"
                                            : "border-border bg-card text-muted-foreground hover:border-slate-400 hover:text-foreground"
                                            }`}
                                    >
                                        {active && <Check className="h-3 w-3" />}
                                        {tag}
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                </div>

                <SheetFooter className="px-6 py-4 border-t">
                    <Button
                        className="w-full gap-2"
                        size="sm"
                        onClick={handleSave}
                    >
                        {saved ? (
                            <>
                                <Check className="h-3.5 w-3.5" />
                                Saved!
                            </>
                        ) : (
                            "Save Preferences"
                        )}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
