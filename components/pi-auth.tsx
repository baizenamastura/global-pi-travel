"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Circle, LogIn } from "lucide-react"

interface User {
  username: string
  uid: string
  accessToken: string
  isAdmin?: boolean
}

interface PiAuthContextType {
  user: User | null
  login: () => Promise<void>
  logout: () => void
  isLoading: boolean
}

const ADMIN_USERNAME = "zenamastura"

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined)

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("piUser")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).Pi) {
        const scopes = ["username", "payments"]
        const authResult = await (window as any).Pi.authenticate(scopes, onIncompletePaymentFound)

        const userData: User = {
          username: authResult.user.username,
          uid: authResult.user.uid,
          accessToken: authResult.accessToken,
          isAdmin: authResult.user.username === ADMIN_USERNAME,
        }

        setUser(userData)
        localStorage.setItem("piUser", JSON.stringify(userData))
      } else {
        throw new Error("Pi SDK not available. Please open in Pi Browser.")
      }
    } catch (error) {
      console.error("Pi authentication failed:", error)
      alert("Login failed. Please open this app in Pi Browser.")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("piUser")
  }

  const onIncompletePaymentFound = (payment: any) => {
    console.log("Incomplete payment found:", payment)
  }

  return <PiAuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</PiAuthContext.Provider>
}

export function usePiAuth() {
  const context = useContext(PiAuthContext)
  if (context === undefined) {
    throw new Error("usePiAuth must be used within a PiAuthProvider")
  }
  return context
}

export function PiLoginButton() {
  const { login, isLoading } = usePiAuth()

  return (
    <Button onClick={login} disabled={isLoading} size="lg" className="w-full">
      {isLoading ? "Loading..." : "Login with Pi Network"}
    </Button>
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

  const handlePiLogin = async () => {
    setIsAuthenticating(true)
    setError(null)

    try {
      if (typeof window === "undefined" || !(window as any).Pi) {
        setError("Pi SDK not available. Please open this app in Pi Browser.")
        setIsAuthenticating(false)
        return
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
            <CardTitle className="text-xl font-bold">Login with Pi Network</CardTitle>
            <CardDescription className="text-sm text-foreground">
              Authenticate securely using your verified Pi account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Why Pi SDK Login?</h3>
              <ul className="text-xs space-y-1 text-foreground">
                <li>✅ Secure verified authentication</li>
                <li>✅ All users are KYC verified</li>
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
                  Authenticating with Pi...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login with Pi Network
                </>
              )}
            </Button>

            <Button variant="ghost" onClick={onBack} className="w-full text-sm text-foreground">
              Back to Home
            </Button>

            <div className="text-center text-xs text-foreground mt-4 space-y-1">
              <p className="font-semibold">Powered by Pi Network</p>
              <p className="text-muted-foreground">Secure • Verified • Trusted</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

