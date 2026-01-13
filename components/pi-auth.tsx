"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Circle, LogIn, AlertCircle, UserIcon, Store, Crown, Eye, EyeOff, Lock } from "lucide-react"
import { Label } from "@/components/ui/label"

interface User {
  username: string
  uid: string
  accessToken: string
  role?: "user" | "merchant" | "admin"
  isAdmin?: boolean
}

interface PiAuthContextType {
  user: User | null
  login: () => Promise<void>
  loginWithUsername: (username: string, role: "user" | "merchant" | "admin") => void
  logout: () => void
  isLoading: boolean
}

const ADMIN_USERNAME = "zenamastura"

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined)

function isPiSDKAvailable(): boolean {
  if (typeof window === "undefined") return false
  return !!(window as any).Pi && typeof (window as any).Pi.authenticate === "function"
}

function waitForPiSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window not available"))
      return
    }

    if (isPiSDKAvailable()) {
      resolve()
      return
    }

    let attempts = 0
    const maxAttempts = 30
    const checkInterval = setInterval(() => {
      attempts++
      if (isPiSDKAvailable()) {
        clearInterval(checkInterval)
        resolve()
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval)
        reject(new Error("Pi SDK not available. Please open this app in Pi Browser."))
      }
    }, 100)
  })
}

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("piUser")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("piUser")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async () => {
    try {
      if (!isPiSDKAvailable()) {
        await waitForPiSDK()
      }

      const scopes = ["username", "payments"]
      const authResult = await (window as any).Pi.authenticate(scopes, onIncompletePaymentFound)

      const isAdmin = authResult.user.username === ADMIN_USERNAME

      const userData: User = {
        username: authResult.user.username,
        uid: authResult.user.uid,
        accessToken: authResult.accessToken,
        role: isAdmin ? "admin" : "user",
        isAdmin: isAdmin,
      }

      setUser(userData)
      localStorage.setItem("piUser", JSON.stringify(userData))
      console.log("Login successful:", userData.username)
    } catch (error) {
      console.error("Pi authentication failed:", error)
      alert("Login failed. Please open this app in Pi Browser and try again.")
    }
  }

  const loginWithUsername = (username: string, role: "user" | "merchant" | "admin") => {
    if (!username.trim()) {
      alert("Please enter a username")
      return
    }

    const isAdmin = username.trim() === ADMIN_USERNAME

    const userData: User = {
      username: username.trim(),
      uid: `manual_${Date.now()}`,
      accessToken: `manual_token_${Date.now()}`,
      role: role,
      isAdmin: isAdmin,
    }

    setUser(userData)
    localStorage.setItem("piUser", JSON.stringify(userData))
    console.log("Manual login successful:", userData.username, "Role:", role)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("piUser")
  }

  const onIncompletePaymentFound = (payment: any) => {
    console.log("Incomplete payment found:", payment)
  }

  return (
    <PiAuthContext.Provider value={{ user, login, loginWithUsername, logout, isLoading }}>
      {children}
    </PiAuthContext.Provider>
  )
}

export function usePiAuth() {
  const context = useContext(PiAuthContext)
  if (context === undefined) {
    throw new Error("usePiAuth must be used within a PiAuthProvider")
  }
  return context
}

export function PiLoginButton() {
  const { login, loginWithUsername, isLoading } = usePiAuth()
  const [isPiBrowser, setIsPiBrowser] = useState(false)
  const [showManualLogin, setShowManualLogin] = useState(false)
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const [username, setUsername] = useState("")
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [showAdminAccessButton, setShowAdminAccessButton] = useState(false)
  const [showAdminPassword, setShowAdminPassword] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    setIsPiBrowser(isPiSDKAvailable())
  }, [])

  const handleSdkLogin = async () => {
    setIsAuthenticating(true)
    try {
      await login()
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleUsernameSubmit = () => {
    if (!username.trim()) {
      alert("Please enter your Pi username")
      return
    }
    setShowRoleSelection(true)
  }

  const handleRoleSelection = (role: "user" | "merchant" | "admin") => {
    if (role === "admin") {
      setShowRoleSelection(false)
      setShowAdminAccessButton(true)
    } else {
      loginWithUsername(username, role)
      setUsername("")
      setShowManualLogin(false)
      setShowRoleSelection(false)
    }
  }

  const handleAdminAccessClick = () => {
    setShowAdminAccessButton(false)
    setShowAdminPassword(true)
  }

  const handleAdminPasswordSubmit = () => {
    const ADMIN_PASSWORD = "globalpitravel2025"

    if (adminPassword === ADMIN_PASSWORD) {
      loginWithUsername(username, "admin")
      setUsername("")
      setAdminPassword("")
      setShowManualLogin(false)
      setShowRoleSelection(false)
      setShowAdminPassword(false)
      setShowAdminAccessButton(false)
      setPasswordError("")
    } else {
      setPasswordError("Incorrect admin password. Please try again.")
    }
  }

  const handleBackToUsername = () => {
    setShowRoleSelection(false)
    setShowAdminPassword(false)
    setShowAdminAccessButton(false)
    setAdminPassword("")
    setPasswordError("")
  }

  const handleBackToRoleSelection = () => {
    setShowAdminPassword(false)
    setShowAdminAccessButton(false)
    setAdminPassword("")
    setPasswordError("")
  }

  const handleBackFromAccessButton = () => {
    setShowAdminAccessButton(false)
    setShowRoleSelection(true)
  }

  return (
    <div className="space-y-3">
      {!isPiBrowser && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-800">For full Pi SDK authentication, please open this app in Pi Browser.</p>
        </div>
      )}

      {/* SDK Login Button */}
      <Button
        onClick={handleSdkLogin}
        disabled={isLoading || isAuthenticating}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90"
      >
        {isAuthenticating ? (
          <>
            <Circle className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Login via Pi SDK
          </>
        )}
      </Button>

      {/* Manual Login Section */}
      {!showManualLogin ? (
        <Button
          variant="outline"
          onClick={() => setShowManualLogin(true)}
          size="lg"
          className="w-full border-primary/50"
        >
          <UserIcon className="mr-2 h-4 w-4" />
          Login with Username
        </Button>
      ) : (
        <div className="space-y-3 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
          {showAdminAccessButton ? (
            <>
              {/* Admin Access Button Step */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Admin Access</p>
                  <p className="text-xs text-muted-foreground">@{username}</p>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Crown className="h-6 w-6 text-purple-600" />
                    <h3 className="text-sm font-semibold text-purple-900">Administrator Login</h3>
                  </div>
                  <p className="text-xs text-purple-800">
                    You are about to access the admin dashboard which contains sensitive financial records and system
                    controls. Password verification is required.
                  </p>
                </div>

                <Button
                  onClick={handleAdminAccessClick}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6"
                  size="lg"
                >
                  <Lock className="mr-2 h-5 w-5" />
                  ACCESS DASHBOARD
                </Button>

                <Button
                  variant="outline"
                  onClick={handleBackFromAccessButton}
                  className="w-full bg-transparent"
                  size="sm"
                >
                  Back to Role Selection
                </Button>
              </div>
            </>
          ) : showAdminPassword ? (
            <>
              {/* Admin Password Step */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Enter Admin Password:</p>
                  <p className="text-xs text-muted-foreground">@{username}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value)
                        setPasswordError("")
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAdminPasswordSubmit()
                        }
                      }}
                      placeholder="Enter admin password"
                      className={passwordError ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-xs text-purple-800">
                    <Crown className="h-3 w-3 inline mr-1" />
                    Only authorized admin can access the admin dashboard with financial records.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAdminPasswordSubmit} className="flex-1" size="sm">
                    Login as Admin
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBackToRoleSelection}
                    className="flex-1 bg-transparent"
                    size="sm"
                  >
                    Back
                  </Button>
                </div>
              </div>
            </>
          ) : !showRoleSelection ? (
            <>
              {/* Username Entry Step */}
              <p className="text-sm font-semibold text-foreground">Enter your Pi username:</p>
              <Input
                type="text"
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUsernameSubmit()
                  }
                }}
                className="w-full"
              />
              <div className="flex gap-2">
                <Button onClick={handleUsernameSubmit} className="flex-1" size="sm">
                  Next
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowManualLogin(false)
                    setUsername("")
                  }}
                  className="flex-1"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Role Selection Step */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Select your role:</p>
                  <p className="text-xs text-muted-foreground">@{username}</p>
                </div>

                <Button
                  onClick={() => handleRoleSelection("user")}
                  variant="outline"
                  className="w-full h-auto py-4 flex items-start gap-3 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                >
                  <UserIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-blue-900">Login as User</p>
                    <p className="text-xs text-blue-700">Access travel directory and unlock merchants</p>
                  </div>
                </Button>

                <Button
                  onClick={() => handleRoleSelection("merchant")}
                  variant="outline"
                  className="w-full h-auto py-4 flex items-start gap-3 border-2 border-green-200 hover:border-green-400 hover:bg-green-50"
                >
                  <Store className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-green-900">Login as Merchant</p>
                    <p className="text-xs text-green-700">Manage your business listing and subscriptions</p>
                  </div>
                </Button>

                <Button
                  onClick={() => handleRoleSelection("admin")}
                  variant="outline"
                  className="w-full h-auto py-4 flex items-start gap-3 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                >
                  <Crown className="h-6 w-6 text-purple-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-purple-900">Login as Admin</p>
                    <p className="text-xs text-purple-700">Requires password - Access admin dashboard</p>
                  </div>
                </Button>

                <Button variant="ghost" onClick={handleBackToUsername} className="w-full" size="sm">
                  Back to Username
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="bg-primary/5 rounded-lg p-3 space-y-1">
        <p className="text-xs font-semibold text-primary">Why Two Login Options?</p>
        <ul className="text-xs space-y-0.5 text-muted-foreground">
          <li>✓ Pi SDK Login: For verified Pi Pioneers in Pi Browser</li>
          <li>✓ Username Login: Choose your role (User/Merchant/Admin)</li>
          <li>✓ Admin access requires password verification</li>
          <li>✓ All users are trusted Pi community members</li>
        </ul>
      </div>
    </div>
  )
}

export function PiLoginCard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Global Pi Travel</CardTitle>
          <CardDescription>Connect with verified travelers and merchants worldwide using Pi Network</CardDescription>
        </CardHeader>
        <CardContent>
          <PiLoginButton />
          <p className="text-sm text-muted-foreground text-center mt-4">Please open this app in Pi Browser to login</p>
        </CardContent>
      </Card>
    </div>
  )
}

interface PiUser {
  uid: string
  username: string
  accessToken: string
  role?: "user" | "merchant" | "admin"
}

interface PiAuthProps {
  onLogin: (user: PiUser) => void
  onBack: () => void
  onIncompletePaymentFound?: (payment: any) => void
}

export function PiAuth({ onLogin, onBack, onIncompletePaymentFound }: PiAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPiBrowser, setIsPiBrowser] = useState(false)

  useEffect(() => {
    setIsPiBrowser(isPiSDKAvailable())
  }, [])

  const handlePiLogin = async () => {
    setIsAuthenticating(true)
    setError(null)

    try {
      if (!isPiSDKAvailable()) {
        await waitForPiSDK()
      }

      const scopes = ["username", "payments"]
      const authResult = await (window as any).Pi.authenticate(scopes, onIncompletePaymentFound)

      const isAdmin = authResult.user.username === ADMIN_USERNAME

      const user: PiUser = {
        uid: authResult.user.uid,
        username: authResult.user.username,
        accessToken: authResult.accessToken,
        role: isAdmin ? "admin" : "user",
      }

      localStorage.setItem("piUser", JSON.stringify(user))
      onLogin(user)
    } catch (err: any) {
      const errorMsg = err.message || "Failed to authenticate with Pi Network. Please try again."
      setError(errorMsg)
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center">Global Pi Travel</h1>
          <p className="text-base text-foreground text-center mt-2">Secure Login with Pi Network</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Circle className="h-12 w-12 text-primary fill-primary" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold">Login via Pi SDK</CardTitle>
            <CardDescription className="text-sm text-foreground">
              Authenticate securely using your verified Pi Network account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isPiBrowser && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-yellow-900">Pi Browser Required</p>
                    <p className="text-xs text-yellow-800">
                      This app must be opened in Pi Browser to use Pi SDK authentication. Please copy this URL and open
                      it in Pi Browser.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-primary/5 p-4 rounded-lg space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Pi SDK Benefits</h3>
              <ul className="text-xs space-y-1 text-foreground">
                <li>✅ KYC-verified secure authentication</li>
                <li>✅ All users are trusted Pi Pioneers</li>
                <li>✅ Direct Pi payments integration</li>
                <li>✅ Access travel community features</li>
                <li>✅ Book and pay with Pi worldwide</li>
              </ul>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handlePiLogin}
              disabled={isAuthenticating}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-base py-6"
            >
              {isAuthenticating ? (
                <>
                  <Circle className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating via Pi SDK...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login via Pi SDK
                </>
              )}
            </Button>

            <Button variant="ghost" onClick={onBack} className="w-full text-sm text-foreground">
              Back to Home
            </Button>

            <div className="text-center text-xs text-foreground mt-4 space-y-1">
              <p className="font-semibold">Powered by Pi Network SDK</p>
              <p className="text-muted-foreground">Secure • Verified • Policy Compliant</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
