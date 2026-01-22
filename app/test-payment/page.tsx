"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TestPaymentPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [step, setStep] = useState<"login" | "payment">("login")

  // STEP 1: Authenticate with payment scope (required before payment)
  const handleLogin = async () => {
    setPaymentStatus("processing")
    console.log("[v0] Starting authentication with payment scope...")

    try {
      if (typeof window === "undefined" || !(window as any).Pi) {
        throw new Error("Pi SDK not available. Please open in Pi Browser.")
      }

      const Pi = (window as any).Pi
      await Pi.init({ version: "2.0", sandbox: true })

      // REQUIRED: Authenticate with 'payments' scope
      const scopes = ["username", "payments"]
      
      const auth = await Pi.authenticate(scopes, (payment: any) => {
        console.log("[v0] Incomplete payment found:", payment)
      })

      console.log("[v0] Authentication successful:", auth)
      setCurrentUser(auth.user)
      setIsAuthenticated(true)
      setPaymentStatus("idle")
      setStep("payment")
    } catch (error) {
      console.error("[v0] Authentication failed:", error)
      setErrorMessage(error instanceof Error ? error.message : "Authentication failed")
      setPaymentStatus("error")
    }
  }

  // STEP 2: Create payment (only after authentication)
  const handlePayment = async () => {
    if (!isAuthenticated || !currentUser) {
      setErrorMessage("Please authenticate first")
      return
    }
    setPaymentStatus("processing")
    console.log("[v0] Creating payment...")

    try {
      const Pi = (window as any).Pi

      // Create payment (payment scope already granted during authentication)
      await Pi.createPayment(
        {
          amount: 0.1,
          memo: "Test payment - Step 10",
          metadata: { app: "GlobalPiTravel" },
        },
        {
          onReadyForServerApproval: (paymentId: string) => {
            console.log("[v0] Ready for approval:", paymentId)
          },
          onReadyForServerCompletion: (paymentId: string, txid: string) => {
            console.log("[v0] Payment completed:", paymentId, txid)
            setPaymentStatus("success")
          },
          onCancel: (paymentId: string) => {
            console.log("[v0] Payment cancelled:", paymentId)
            setPaymentStatus("error")
            setErrorMessage("Payment was cancelled")
          },
          onError: (error: Error, payment?: any) => {
            console.error("[v0] Payment error:", error, payment)
            setPaymentStatus("error")
            setErrorMessage("Payment error occurred")
          },
        },
      )
    } catch (error) {
      console.error("[v0] Pi payment failed:", error)
      setErrorMessage(error instanceof Error ? error.message : "Payment failed")
      setPaymentStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Test Payment - Step 10 Verification</CardTitle>
            <CardDescription>Complete one transaction to finish your app verification process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Test Transaction Details:</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Amount:</strong> 0.1 Pi
                </p>
                <p>
                  <strong>Purpose:</strong> Step 10 verification payment
                </p>
                <p>
                  <strong>Mode:</strong> Sandbox/Testnet
                </p>
              </div>
            </div>

            {step === "login" && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-blue-900">Step 1: Authenticate with Payment Scope</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Pi Browser will ask you to allow payment permissions.
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Click "Allow" to grant permission.
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full h-16 text-lg font-semibold"
                  style={{ backgroundColor: "rgb(20, 83, 45)", color: "white" }}
                >
                  1. Authenticate & Allow Payments
                </Button>
              </div>
            )}

            {step === "payment" && isAuthenticated && currentUser && paymentStatus === "idle" && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                  <p className="font-semibold text-green-900">Authenticated as: {currentUser.username}</p>
                  <p className="text-sm text-green-700 mt-1">Payment scope granted. Ready to make payment.</p>
                </div>
                <Button
                  onClick={handlePayment}
                  className="w-full h-16 text-lg font-semibold"
                  style={{ backgroundColor: "rgb(20, 83, 45)", color: "white" }}
                >
                  2. Pay 0.1 Pi - Test Payment
                </Button>
              </div>
            )}

            {paymentStatus === "processing" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-900 font-semibold">Processing payment...</p>
                <p className="text-sm text-blue-700 mt-1">Please approve the payment in Pi Browser popup</p>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <p className="text-green-900 font-bold text-lg">Payment Successful!</p>
                <p className="text-sm text-green-700 mt-2">
                  Congratulations! You've completed Step 10. Your app is now verified.
                </p>
              </div>
            )}

            {paymentStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-900 font-semibold">Payment Failed</p>
                <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                <Button
                  onClick={() => {
                    setPaymentStatus("idle")
                    setErrorMessage("")
                  }}
                  variant="outline"
                  className="mt-3 w-full"
                >
                  Try Again
                </Button>
              </div>
            )}

            <div className="text-xs text-muted-foreground text-center">
              <p>This is a test transaction using testnet Pi coins.</p>
              <p>No real Pi will be charged.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
