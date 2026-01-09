"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, Store, Factory, User } from "lucide-react"

interface RegisterBusinessProps {
  onBack: () => void
}

const businessCategories = [
  {
    id: "individual",
    name: "Individual Merchant",
    icon: User,
    employees: "1 person",
    description: "Perfect for solo entrepreneurs and freelancers",
    monthlyUSD: 10,
    monthlyPi: 0.0000318,
  },
  {
    id: "small",
    name: "Small Merchant",
    icon: Store,
    employees: "1-10 employees",
    description: "Ideal for restaurants, small hotels and growing business",
    monthlyUSD: 15,
    monthlyPi: 0.0000477,
  },
  {
    id: "medium",
    name: "Medium Merchant",
    icon: Building2,
    employees: "11-30 employees",
    description: "For established restaurants, hotels, and tour operators",
    monthlyUSD: 25,
    monthlyPi: 0.0000796,
  },
  {
    id: "big",
    name: "Big Merchant",
    icon: Factory,
    employees: "31-50 employees",
    description: "For regional chains and established businesses",
    monthlyUSD: 100,
    monthlyPi: 0.0003183,
  },
  {
    id: "enterprise",
    name: "Large Enterprise",
    icon: Factory,
    employees: "51+ employees",
    description: "Airlines, hotel chains, and major corporations",
    monthlyUSD: 149,
    monthlyPi: 0.0004742,
  },
]

export function RegisterBusiness({ onBack }: RegisterBusinessProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  if (selectedCategory) {
    const selectedCategoryData = businessCategories.find((cat) => cat.id === selectedCategory)
    if (selectedCategoryData) {
      return <MerchantPaymentPage category={selectedCategoryData} onBack={() => setSelectedCategory(null)} />
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Merchant Subscription</h1>
          <p className="text-muted-foreground mt-2">Choose your business type to get started</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businessCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-border hover:border-primary"
              >
                <div className="flex items-start gap-3 mb-3">
                  <IconComponent className="h-10 w-10 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.employees}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <div className="border-t pt-4">
                  <p className="text-3xl font-bold text-primary">${category.monthlyUSD}/mo</p>
                  <p className="text-sm text-muted-foreground mt-1">{category.monthlyPi} Pi</p>
                </div>
                <Button className="w-full mt-4">Select Plan</Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MerchantPaymentPage({
  category,
  onBack,
}: {
  category: any
  onBack: () => void
}) {
  const [autoRenew, setAutoRenew] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"sdk" | "manual" | null>(null)
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null)
  const [copied, setCopied] = useState(false)

  const PERSONAL_WALLET = "GDV4XJJL6DH4G7LAO25DUFW4AEXLRNGZEYHH254NTCRO7MLKT5DIULYO"

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(PERSONAL_WALLET)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReceiptUpload = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentReceipt(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    alert("Payment submitted for verification! You will be notified once approved.")
    onBack()
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Merchant Types
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Complete Payment</h1>
          <p className="text-muted-foreground mt-2">{category.name} Subscription</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Subscription Summary */}
        <div className="bg-card border-2 border-primary/20 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Subscription Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg font-semibold">{category.name}</p>
              <p className="text-sm text-muted-foreground">{category.employees}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${category.monthlyUSD}/month</p>
              <p className="text-sm text-muted-foreground">{category.monthlyPi} Pi</p>
            </div>
          </div>
        </div>

        {/* Auto-Renew Option */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Renewal Preference</h3>
          <div className="space-y-3">
            <div
              onClick={() => setAutoRenew(true)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                autoRenew ? "bg-primary/10 border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <input type="radio" checked={autoRenew} onChange={() => setAutoRenew(true)} className="mt-1" />
                <div>
                  <p className="font-semibold">Auto-Renew (Recommended)</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically renew your subscription each month. No interruption to your listing.
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setAutoRenew(false)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                !autoRenew ? "bg-primary/10 border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <input type="radio" checked={!autoRenew} onChange={() => setAutoRenew(false)} className="mt-1" />
                <div>
                  <p className="font-semibold">Manual Renewal</p>
                  <p className="text-sm text-muted-foreground">
                    You will receive a reminder before renewal. Payment required each month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Payment Method</h3>

          {/* Pi SDK Payment */}
          <div className="mb-4">
            <Button
              onClick={() => {
                setPaymentMethod("sdk")
                window.open(
                  `https://pinetwork.app/pay?amount=${category.monthlyPi}&memo=Monthly%20Subscription&recipient=${PERSONAL_WALLET}`,
                  "_blank",
                )
              }}
              className="w-full h-16 text-lg font-semibold"
              style={{ backgroundColor: "rgb(20, 83, 45)", color: "white" }}
            >
              Pay ${category.monthlyUSD} via Pi SDK ({category.monthlyPi} Pi)
            </Button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or Pay Manually</span>
            </div>
          </div>

          {/* Manual Pi Wallet Payment */}
          <div
            onClick={() => setPaymentMethod("manual")}
            className="border-2 rounded-lg p-4 cursor-pointer hover:border-primary/50"
          >
            <p className="font-semibold mb-2">Send Pi to Wallet Address</p>
            <div className="bg-muted p-3 rounded mb-2 font-mono text-sm break-all">{PERSONAL_WALLET}</div>
            <Button onClick={handleCopyAddress} variant="outline" size="sm" className="w-full bg-transparent">
              {copied ? "Copied!" : "Copy Wallet Address"}
            </Button>
          </div>
        </div>

        {/* Upload Receipt for Manual Payment */}
        {paymentMethod === "manual" && (
          <div className="bg-card border-2 border-primary/20 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Upload Payment Receipt</h3>
            <p className="text-sm text-muted-foreground mb-4">
              After sending {category.monthlyPi} Pi to the wallet address above, please upload a screenshot of your
              payment confirmation.
            </p>
            <input
              type="file"
              onChange={handleReceiptUpload}
              accept="image/*"
              className="w-full border rounded-lg p-2 mb-4"
            />
            {paymentReceipt && (
              <div className="bg-primary/10 rounded-lg p-3 mb-4">
                <p className="text-sm font-semibold text-primary">Receipt uploaded: {paymentReceipt.name}</p>
              </div>
            )}
            <Button
              onClick={handleSubmit}
              disabled={!paymentReceipt}
              className="w-full h-12 text-lg font-semibold"
              style={{ backgroundColor: "rgb(20, 83, 45)", color: "white" }}
            >
              Submit for Verification
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Your business will be visible to users once payment is confirmed by our team.
            </p>
          </div>
        )}

        {paymentMethod === "sdk" && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-sm font-semibold text-primary">
              Payment completed via Pi SDK! Your business will be activated shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
