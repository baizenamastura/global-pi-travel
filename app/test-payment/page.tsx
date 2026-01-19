"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TestPaymentPage() {
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handlePiPayment = async () => {
    setPaymentStatus("processing")

    try {
      // Check if Pi SDK is available
      if (typeof window === "undefined" || !(window as any).Pi) {
        throw new Error("Pi SDK not available. Please open this in Pi Browser.")
      }

      const Pi = (window as any).Pi

      // Initialize Pi SDK with payment scope
      await Pi.init({ version: "2.0", sandbox: true })

      // Create payment (Pi SDK automatically handles payment permissions)
      const payment = await Pi.createPayment(
        {
          amount: 0.0001,
          memo: "Test transaction for Global Pi Travel",
          metadata: { test: true },
        },
        {
          onReadyForServerApproval: (paymentId: string) => {
            console.log("[v0] Payment approved by user:", paymentId)
            setPaymentStatus("success")
          },
          onReadyForServerCompletion: (paymentId: string, txid: string) => {
            console.log("[v0] Payment completed:", paymentId, txid)
          },
          onCancel: (paymentId: string) => {
            console.log("[v0] Payment cancelled:", paymentId)
            setPaymentStatus("idle")
          },
          onError: (error: Error, payment?: any) => {
            console.error("[v0] Payment error:", error)
            setErrorMessage(error.message)
            setPaymentStatus("error")
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
                  <strong>Amount:</strong> 0.0001 Pi
                </p>
                <p>
                  <strong>Purpose:</strong> App verification test payment
                </p>
                <p>
                  <strong>Mode:</strong> Sandbox/Testnet
                </p>
              </div>
            </div>

            {paymentStatus === "idle" && (
              <Button
                onClick={handlePiPayment}
                className="w-full h-16 text-lg font-semibold"
                style={{ backgroundColor: "rgb(20, 83, 45)", color: "white" }}
              >
                Pay 0.0001 Pi via Pi SDK
              </Button>
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
