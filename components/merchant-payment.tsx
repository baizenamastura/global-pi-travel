"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { SubscriptionRules } from "@/components/subscription-rules"
import { MerchantRegistrationForm } from "@/components/merchant-registration-form"

interface MerchantPaymentProps {
  onBack: () => void
}

export function MerchantPayment({ onBack }: MerchantPaymentProps) {
  const [step, setStep] = useState<"payment" | "rules" | "form" | "success">("payment")
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const LISTING_FEE_PI = "0.0001273"
  const PI_WALLET_ADDRESS = "GDV4XJJL6DH4G7LAO25DUFW4AEXLRNGZEYHH254NTCRO7MLKT5DIULYO"

  const handlePaymentSuccess = () => {
    setPaymentConfirmed(true)
    setStep("rules")
  }

  const handleRulesAccepted = () => {
    setStep("form")
  }

  const handleFormSubmitted = () => {
    setStep("success")
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "rgb(20, 83, 45)" }}>
              Thank You!
            </h2>
            <p className="text-lg mb-6">
              Your business is now listed on Global Pi Travel.
              <br />
              <span className="font-semibold">Pi Travelers around the world can now discover your services!</span>
            </p>
            <Button
              onClick={onBack}
              size="lg"
              style={{ backgroundColor: "rgb(20, 83, 45)", color: "rgb(218, 165, 32)" }}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "form") {
    return <MerchantRegistrationForm onBack={() => setStep("rules")} onSubmit={handleFormSubmitted} />
  }

  if (step === "rules") {
    return <SubscriptionRules onBack={() => setStep("payment")} onContinue={handleRulesAccepted} />
  }

  // Payment Page
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "rgb(20, 83, 45)" }}>
            MERCHANT LISTING FEE - Global Pi Travel
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-2" style={{ borderColor: "rgb(20, 83, 45, 0.3)" }}>
          <CardHeader className="text-center">
            <CardTitle className="text-xl md:text-2xl font-bold mb-2" style={{ color: "rgb(218, 165, 32)" }}>
              SECURE YOUR MERCHANT LISTING GLOBALLY TODAY!
            </CardTitle>
            <CardDescription className="text-base">
              List your Business and reach millions of Pi Travelers worldwide.
              <br />
              To proceed, please pay the Merchant Listing fee using your Pi wallet.
              <br />
              After payment you will be directed to the Registration Form to submit your business details.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div
              className="bg-green-50 border-2 p-6 rounded-lg text-center"
              style={{ borderColor: "rgb(20, 83, 45, 0.3)" }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: "rgb(20, 83, 45)" }}>
                Payment Amount & Memo:
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Listing Fee:</span>
                  <div className="text-2xl font-bold" style={{ color: "rgb(20, 83, 45)" }}>
                    {LISTING_FEE_PI} Pi
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Memo:</strong> "Merchant Listing fee - Global Pi Travel"
                </div>
              </div>
            </div>

            {/* SDK Payment Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-6 text-lg font-bold rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#00D9FF", color: "white" }}
                onClick={handlePaymentSuccess}
              >
                Pay Listing Fee via Pi Wallet
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-4 border-t">
              <p className="italic">
                Ensure your Pi wallet is on <strong>Testnet</strong> (for testing) or <strong>Mainnet</strong> (live).
                <br />
                Only paid merchants can access the Registration form.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
