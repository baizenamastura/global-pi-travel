"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface SubscriptionRulesProps {
  onBack: () => void
  onContinue: () => void
}

export function SubscriptionRules({ onBack, onContinue }: SubscriptionRulesProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "rgb(20, 83, 45)" }}>
            MERCHANT LISTING & SUBSCRIPTION RULES
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "rgb(20, 83, 45)" }}>Fee Types & Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table for mobile */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th
                      className="border border-green-300 p-3 text-left font-bold"
                      style={{ color: "rgb(20, 83, 45)" }}
                    >
                      Fee Type
                    </th>
                    <th
                      className="border border-green-300 p-3 text-left font-bold"
                      style={{ color: "rgb(20, 83, 45)" }}
                    >
                      Duration/Validity
                    </th>
                    <th
                      className="border border-green-300 p-3 text-left font-bold"
                      style={{ color: "rgb(20, 83, 45)" }}
                    >
                      Visibility
                    </th>
                    <th
                      className="border border-green-300 p-3 text-left font-bold"
                      style={{ color: "rgb(20, 83, 45)" }}
                    >
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-green-200 p-3 font-semibold">1. One-time Listing</td>
                    <td className="border border-green-200 p-3">30 days</td>
                    <td className="border border-green-200 p-3">Visible to all Pi Travellers globally</td>
                    <td className="border border-green-200 p-3 text-xs">
                      Listing unlocks after payment. After 30 days listing becomes inactive if no Monthly plan is
                      subscribed.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 p-3 font-semibold">2. Monthly Subscription</td>
                    <td className="border border-green-200 p-3">30 days</td>
                    <td className="border border-green-200 p-3">Listing is active as long as Subscription is paid</td>
                    <td className="border border-green-200 p-3 text-xs">
                      Merchant must pay each month to keep their listing visible. Grace period 3-5 days allowed for late
                      payments (chatbot will remind you before expiration).
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 p-3 font-semibold">3. Yearly Plan</td>
                    <td className="border border-green-200 p-3">12 months</td>
                    <td className="border border-green-200 p-3">Listing stays active all year</td>
                    <td className="border border-green-200 p-3 text-xs">
                      Can offer a 10% discount for annual payments.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                onClick={onContinue}
                className="font-bold text-lg px-8 py-6 rounded-lg"
                style={{ backgroundColor: "rgb(20, 83, 45)", color: "rgb(218, 165, 32)" }}
              >
                Continue to Registration Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
