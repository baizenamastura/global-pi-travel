"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Circle, LogIn } from "lucide-react"

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

const ADMIN_USERNAME = "GlobalTravelPiAdmin" //"zenamastura"

export function PiAuth({ onLogin, onBack, onIncompletePaymentFound }: PiAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [manualUsername, setManualUsername] = useState("")
  const [selectedRole, setSelectedRole] = useState<"user" | "merchant" | "admin">("user")
  const [showRoleSelection, setShowRoleSelection] = useState(false)

  const handlePiLogin = async () => {
    setIsAuthenticating(true)
    setError(null)

    try {
      if (typeof window === "undefined" || !(window as any).Pi) {
        setShowRoleSelection(true)
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

  const handleManualLogin = () => {
    if (!manualUsername.trim()) {
      setError("Please enter a Pi username")
      return
    }

    const isAdmin = manualUsername === ADMIN_USERNAME

    const user: PiUser = {
      uid: `${Date.now()}`,
      username: manualUsername,
      accessToken: `token_${Date.now()}`,
      role: isAdmin ? "admin" : selectedRole,
    }

    localStorage.setItem("piUser", JSON.stringify(user))
    onLogin(user)
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center">Global Travel With Pi</h1>
          <p className="text-base text-foreground text-center mt-2">Login with Pi Username</p>
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
            <CardTitle className="text-xl font-bold">Login</CardTitle>
            <CardDescription className="text-sm text-foreground">
              Enter your Pi username to access all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showRoleSelection ? (
              <>
                <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">Login with Pi Network:</h3>
                  <ul className="text-xs space-y-1 text-foreground">
                    <li>✅ Secure Pi Network authentication</li>
                    <li>✅ Access travel community features</li>
                    <li>✅ Book and pay with Pi worldwide</li>
                    <li>✅ Track your transactions</li>
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
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Login with Pi Network
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="username" className="text-sm font-semibold text-foreground">
                      Pi Username
                    </Label>
                    <Input
                      id="username"
                      value={manualUsername}
                      onChange={(e) => setManualUsername(e.target.value)}
                      placeholder="Enter your Pi username"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-foreground">Select Account Type</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <Button
                        variant={selectedRole === "user" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedRole("user")}
                        className="text-xs"
                      >
                        User
                      </Button>
                      <Button
                        variant={selectedRole === "merchant" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedRole("merchant")}
                        className="text-xs"
                      >
                        Merchant
                      </Button>
                      <Button
                        variant={selectedRole === "admin" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedRole("admin")}
                        className="text-xs"
                      >
                        Admin
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <Button onClick={handleManualLogin} className="w-full bg-primary hover:bg-primary/90 text-white">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </div>
              </>
            )}

            <Button variant="ghost" onClick={onBack} className="w-full text-sm text-foreground">
              Back to Home
            </Button>

            <div className="text-center text-xs text-foreground mt-4">
              <p>Powered by Pi Network</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
