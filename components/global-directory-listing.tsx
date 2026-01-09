"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { MerchantRegistrationForm } from "@/components/merchant-registration-form"
import { DisclaimerFooter } from "@/components/disclaimer-footer"

interface GlobalDirectoryListingProps {
  onBack: () => void
}

export function GlobalDirectoryListing({ onBack }: GlobalDirectoryListingProps) {
  const [step, setStep] = useState<"invitation" | "form" | "success">("invitation")

  const handleProceedToForm = () => {
    setStep("form")
  }

  const handleFormSubmit = () => {
    setStep("success")
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-2" style={{ borderColor: "rgb(21, 128, 61)" }}>
          <CardContent className="pt-12 pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12" style={{ color: "rgb(21, 128, 61)" }} />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "rgb(21, 128, 61)" }}>
              Thank You!
            </h2>
            <p className="text-base mb-6">
              Your business is now listed on <span className="font-bold">Global Pi Travel</span>.
              <br />
              <span className="font-semibold">Pi Pioneers around the world can now discover your services!</span>
            </p>
            <Button
              onClick={onBack}
              size="lg"
              className="rounded-lg font-bold text-base"
              style={{ backgroundColor: "rgb(21, 128, 61)", color: "white" }}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "form") {
    return <MerchantRegistrationForm onBack={() => setStep("invitation")} onSubmit={handleFormSubmit} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-lime-50 to-background">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "rgb(21, 128, 61)" }}>
            Pi Global Directory Listing
          </h1>
          <p className="text-base text-black mt-2">Free listing for all merchants accepting Pi payment</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-2" style={{ borderColor: "rgb(21, 128, 61)" }}>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "rgb(21, 128, 61)" }}>
              FREE DIRECTORY LISTING FOR ALL MERCHANTS!
            </CardTitle>
            <div
              className="border-2 rounded-lg p-4 md:p-5 text-left space-y-4 max-w-5xl mx-auto"
              style={{ borderColor: "rgb(21, 128, 61)", backgroundColor: "rgb(240, 253, 244)" }}
            >
              <p className="text-lg font-semibold" style={{ color: "rgb(21, 128, 61)" }}>
                Join the Global Pi Pioneer Community Today!
              </p>
              <p className="text-base text-black leading-relaxed">
                We invite all local and global merchants who accept <strong>Pi as payment</strong> to list your business
                on <strong>Global Pi Travel</strong> absolutely{" "}
                <strong style={{ color: "rgb(21, 128, 61)" }}>FREE</strong>!
              </p>
              <p className="text-base text-black leading-relaxed">
                Whether you're a small local shop or a large enterprise. if you accept Pi cryptocurrency. we want to
                help Pi Pioneers around the world discover your business.
              </p>
              <div className="bg-white border-2 rounded-lg p-4 space-y-3" style={{ borderColor: "rgb(21, 128, 61)" }}>
                <p className="text-base font-semibold mb-3" style={{ color: "rgb(21, 128, 61)" }}>
                  What's Included in FREE Listing:
                </p>
                <p className="text-sm text-black">• Business Name</p>
                <p className="text-sm text-black">• Category & Location</p>
                <p className="text-sm text-black">• Basic business information visible to all Pi travelers</p>
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-3 mt-4">
                  <p className="text-sm font-semibold text-amber-800 mb-2">🔒 LOCKED Until You SUBSCRIBE:</p>
                  <p className="text-xs text-black">• Contact Number</p>
                  <p className="text-xs text-black">• Email. Website. Social Links</p>
                  <p className="text-xs text-black">• Photos & Gallery</p>
                  <p className="text-xs text-black">• Promotions & Special Offers</p>
                  <p className="text-xs text-black">• Customer Reviews & Ratings</p>
                  <p className="text-xs text-black">• Interactive Map & Directions</p>
                  <p className="text-xs text-black">• Full Business Details</p>
                  <p className="text-sm font-semibold text-amber-800 mt-2">
                    Subscribe to unlock all premium features and maximize your visibility!
                  </p>
                </div>
              </div>
              <p className="text-base text-black leading-relaxed">
                List your business details. connect with travelers. and grow your customer base within the Pi ecosystem.
              </p>
            </div>
          </CardHeader>

          <CardContent className="text-center pb-8">
            <Button
              size="lg"
              onClick={handleProceedToForm}
              className="px-8 py-4 text-base font-bold rounded-lg"
              style={{ backgroundColor: "rgb(21, 128, 61)", color: "white" }}
            >
              Register for FREE
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Join thousands of merchants accepting Pi payment worldwide
            </p>
          </CardContent>
        </Card>
      </div>
      <DisclaimerFooter />
    </div>
  )
}
