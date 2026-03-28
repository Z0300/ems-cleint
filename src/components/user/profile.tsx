import { useState, useRef } from "react"
import {
    User,
    Mail,
    Phone,
    Lock,
    Camera,
    Save,
    ShieldCheck,
    Eye,
    EyeOff,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
} from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"

interface UserProfile {
    id: string
    fullName: string
    email: string
    mobileNo?: string
    role?: string
}

interface ProfileProps {
    user: UserProfile | null
    onBack?: () => void
}

function getInitials(fullName?: string | null): string {
    if (!fullName || !fullName.trim()) return "?"
    return fullName
        .trim()
        .split(/\s+/)
        .filter(n => n.length > 0)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
}

type SaveStatus = "idle" | "saving" | "success" | "error"

export default function Profile({ user, onBack }: ProfileProps) {
    const initials = getInitials(user?.fullName)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    // Personal info state
    const [fullName, setFullName] = useState(user?.fullName ?? "")
    const [email, setEmail] = useState(user?.email ?? "")
    const [mobileNo, setMobileNo] = useState(user?.mobileNo ?? "")
    const [infoStatus, setInfoStatus] = useState<SaveStatus>("idle")

    // Password state
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [passwordStatus, setPasswordStatus] = useState<SaveStatus>("idle")
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => setAvatarPreview(ev.target?.result as string)
        reader.readAsDataURL(file)
    }

    const handleSaveInfo = async () => {
        setInfoStatus("saving")
        // Simulate API call — swap with real mutation when available
        await new Promise((r) => setTimeout(r, 1000))
        setInfoStatus("success")
        setTimeout(() => setInfoStatus("idle"), 3000)
    }

    const handleChangePassword = async () => {
        setPasswordError(null)
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("Please fill in all password fields.")
            return
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.")
            return
        }
        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters.")
            return
        }
        setPasswordStatus("saving")
        // Simulate API call — swap with real mutation when available
        await new Promise((r) => setTimeout(r, 1200))
        setPasswordStatus("success")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setTimeout(() => setPasswordStatus("idle"), 3000)
    }

    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return null
        if (pwd.length < 6) return { label: "Weak", color: "bg-rose-500", width: "w-1/4" }
        if (pwd.length < 8) return { label: "Fair", color: "bg-amber-400", width: "w-2/4" }
        if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd))
            return { label: "Strong", color: "bg-emerald-500", width: "w-full" }
        return { label: "Good", color: "bg-slate-600", width: "w-3/4" }
    }

    const strength = getPasswordStrength(newPassword)

    return (
        <div className="flex flex-col gap-6 pb-10 max-w-3xl mx-auto">

            <div className="flex items-center gap-4">
                {onBack && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="gap-1.5 text-muted-foreground hover:text-foreground -ml-1"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                )}
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Edit Profile</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Manage your personal information and account security.
                    </p>
                </div>
            </div>


            <div className="relative rounded-2xl overflow-hidden border bg-card">

                <div className="h-28 bg-linear-to-br from-slate-800 to-slate-950" />

                <div className="px-6 pb-6">

                    <div className="relative -mt-14 mb-4 flex items-end gap-4">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                                <AvatarImage src={avatarPreview ?? ""} />
                                <AvatarFallback className="text-2xl font-bold bg-slate-100 text-slate-700">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <button
                                onClick={handleAvatarClick}
                                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                <Camera className="h-6 w-6 text-white" />
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="pb-1">
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-bold">{user?.fullName ?? "—"}</p>
                                <Badge
                                    variant="secondary"
                                    className="rounded-full text-[10px] capitalize tracking-wide"
                                >
                                    {user?.role?.toLowerCase() ?? "user"}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>

                        <div className="ml-auto pb-1">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleAvatarClick}
                                className="gap-2 text-xs"
                            >
                                <Camera className="h-3.5 w-3.5" />
                                Change Photo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="info" className="w-full">
                <TabsList className="h-9 px-1">
                    <TabsTrigger value="info" className="text-sm px-4 gap-2">
                        <User className="h-3.5 w-3.5" />
                        Personal Info
                    </TabsTrigger>
                    <TabsTrigger value="security" className="text-sm px-4 gap-2">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Security
                    </TabsTrigger>
                </TabsList>


                <TabsContent value="info" className="mt-4">
                    <Card className="border shadow-none">
                        <CardHeader className="px-6 pt-5 pb-2">
                            <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
                            <CardDescription className="text-sm">
                                Update your name, email address, and phone number.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <div className="flex flex-col gap-5">

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium" htmlFor="profile-fullname">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="profile-fullname"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Your full name"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium" htmlFor="profile-email">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="profile-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium" htmlFor="profile-mobile">
                                        Mobile Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="profile-mobile"
                                            type="tel"
                                            value={mobileNo}
                                            onChange={(e) => setMobileNo(e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between gap-3">
                                    {infoStatus === "success" && (
                                        <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Profile updated successfully!
                                        </div>
                                    )}
                                    {infoStatus === "error" && (
                                        <div className="flex items-center gap-2 text-destructive text-sm font-medium">
                                            <AlertCircle className="h-4 w-4" />
                                            Failed to update. Try again.
                                        </div>
                                    )}
                                    {infoStatus === "idle" && <div />}

                                    <Button
                                        onClick={handleSaveInfo}
                                        disabled={infoStatus === "saving"}
                                        className="gap-2 ml-auto"
                                        size="sm"
                                    >
                                        {infoStatus === "saving" ? (
                                            <>
                                                <span className="h-3.5 w-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                                                Saving…
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-3.5 w-3.5" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>


                <TabsContent value="security" className="mt-4">
                    <Card className="border shadow-none">
                        <CardHeader className="px-6 pt-5 pb-2">
                            <CardTitle className="text-base font-semibold">Change Password</CardTitle>
                            <CardDescription className="text-sm">
                                Choose a strong password you haven't used before.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <div className="flex flex-col gap-5">

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium" htmlFor="profile-current-pw">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="profile-current-pw"
                                            type={showCurrent ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            className="pl-9 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrent((v) => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showCurrent ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>


                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium" htmlFor="profile-new-pw">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="profile-new-pw"
                                            type={showNew ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Create new password"
                                            className="pl-9 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNew((v) => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>


                                    {strength && (
                                        <div className="mt-1.5 flex flex-col gap-1">
                                            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Password strength:{" "}
                                                <span
                                                    className={`font-semibold ${strength.label === "Weak"
                                                        ? "text-rose-500"
                                                        : strength.label === "Fair"
                                                            ? "text-amber-500"
                                                            : strength.label === "Good"
                                                                ? "text-slate-600"
                                                                : "text-emerald-500"
                                                        }`}
                                                >
                                                    {strength.label}
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>


                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium" htmlFor="profile-confirm-pw">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="profile-confirm-pw"
                                            type={showConfirm ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Re-enter new password"
                                            className="pl-9 pr-10"
                                            aria-invalid={
                                                confirmPassword.length > 0 && confirmPassword !== newPassword
                                                    ? true
                                                    : undefined
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm((v) => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showConfirm ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {confirmPassword.length > 0 && confirmPassword !== newPassword && (
                                        <p className="text-xs text-destructive flex items-center gap-1">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            Passwords do not match.
                                        </p>
                                    )}
                                    {confirmPassword.length > 0 && confirmPassword === newPassword && (
                                        <p className="text-xs text-emerald-600 flex items-center gap-1">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Passwords match.
                                        </p>
                                    )}
                                </div>


                                <div className="rounded-xl border border-dashed bg-muted/30 px-4 py-3 text-xs text-muted-foreground space-y-1">
                                    <p className="font-medium text-foreground mb-1">Password requirements</p>
                                    <p>• At least 8 characters long</p>
                                    <p>• Include uppercase and lowercase letters</p>
                                    <p>• Include at least one number or symbol</p>
                                </div>

                                <Separator />


                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        {passwordError && (
                                            <div className="flex items-center gap-2 text-destructive text-sm font-medium">
                                                <AlertCircle className="h-4 w-4 shrink-0" />
                                                {passwordError}
                                            </div>
                                        )}
                                        {passwordStatus === "success" && (
                                            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Password updated successfully!
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        onClick={handleChangePassword}
                                        disabled={passwordStatus === "saving"}
                                        className="gap-2 ml-auto"
                                        size="sm"
                                    >
                                        {passwordStatus === "saving" ? (
                                            <>
                                                <span className="h-3.5 w-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                                                Updating…
                                            </>
                                        ) : (
                                            <>
                                                <ShieldCheck className="h-3.5 w-3.5" />
                                                Update Password
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
