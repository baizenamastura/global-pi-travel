"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Bot, Upload, Copy, Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"

interface BusinessSubmitBotProps {
  onBack: () => void
}

type Message = {
  role: "bot" | "user"
  content: string
  showPayment?: boolean
}

const PI_WALLET_ADDRESS = "GDV4XJJL6DH4G7LAO25DUFW4AEXLRNGZEYHH254NTCRO7MLKT5DIULYO"

const getMerchantTier = (category: string) => {
  const individualBusiness = ["freelancer", "solo", "individual", "self-employed", "consultant"]

  const smallBusiness = [
    "sari sari stores",
    "small local stores",
    "cooperative shops",
    "repair shops",
    "tailors",
    "homestay",
    "rooms for rent",
    "hostels",
    "souvenir shops",
    "local markets",
    "cafes",
    "food stalls",
    "massage",
    "laundry",
    "bike rentals",
    "motorcycle taxis",
  ]

  const mediumBusiness = [
    "hotels",
    "resorts",
    "restaurants",
    "boutiques",
    "travel agencies",
    "car rentals",
    "taxi services",
    "shuttle services",
    "salon",
    "spa",
    "event organizers",
    "photographers",
    "clinics",
    "pharmacies",
    "wellness centers",
    "fitness gyms",
    "bars",
    "cinemas",
    "real estate agents",
    "tourist guides",
    "tours",
  ]

  const bigBusiness = ["airlines", "hotel chains", "car dealerships", "manufacturing", "distribution"]

  const categoryLower = category.toLowerCase()

  for (const business of individualBusiness) {
    if (categoryLower.includes(business)) {
      return {
        tier: "Individual Merchant",
        monthly: { usd: 10, pi: 0.0000318 },
        yearly: { usd: 108, pi: 0.0003437, discount: "10% discount applied" },
      }
    }
  }

  for (const business of smallBusiness) {
    if (categoryLower.includes(business)) {
      return {
        tier: "Small Merchant",
        monthly: { usd: 15, pi: 0.0000477 },
        yearly: { usd: 162, pi: 0.0005156, discount: "10% discount applied" },
      }
    }
  }

  for (const business of mediumBusiness) {
    if (categoryLower.includes(business)) {
      return {
        tier: "Medium Merchant",
        monthly: { usd: 25, pi: 0.0000796 },
        yearly: { usd: 270, pi: 0.0008594, discount: "10% discount applied" },
      }
    }
  }

  for (const business of bigBusiness) {
    if (categoryLower.includes(business)) {
      return {
        tier: "Big Merchant",
        monthly: { usd: 100, pi: 0.0003183 },
        yearly: { usd: 1080, pi: 0.0034373, discount: "10% discount applied" },
      }
    }
  }

  return {
    tier: "Large Enterprise",
    monthly: { usd: 149, pi: 0.0004742 },
    yearly: { usd: 1609, pi: 0.0051217, discount: "10% discount applied" },
  }
}

export function BusinessSubmitBot({ onBack }: BusinessSubmitBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Welcome to Global Pi Travel! 🌍 I'm here to warmly assist you with listing your business in our global directory. Do you accept Pi cryptocurrency payments? If yes, I'd love to help you get discovered by travelers worldwide! Please type 'Yes' to continue.",
    },
  ])
  const [input, setInput] = useState("")
  const [step, setStep] = useState(0)
  const [businessData, setBusinessData] = useState({
    acceptsPi: "",
    name: "",
    location: "",
    description: "",
    category: "",
    phone: "",
    email: "",
    whatsapp: "",
    photo: null as File | null,
    rating: "",
    tier: { tier: "", monthly: { usd: 0, pi: 0 }, yearly: { usd: 0, pi: 0, discount: "" } },
    isFeatured: false,
  })
  const [copied, setCopied] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null)
  const [renewalChoice, setRenewalChoice] = useState("")

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(PI_WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])

    setTimeout(() => {
      let botResponse = ""

      if (step === 0) {
        setBusinessData({ ...businessData, acceptsPi: input })
        botResponse =
          "Wonderful! That's fantastic to hear. Let's get your business discovered by Pi travelers around the globe. What is your business name?"
        setStep(1)
      } else if (step === 1) {
        setBusinessData({ ...businessData, name: input })
        botResponse =
          "Great! Where is your business located? Please provide the complete address including city and country."
        setStep(2)
      } else if (step === 2) {
        setBusinessData({ ...businessData, location: input })
        botResponse =
          "Perfect location! Now, what category best describes your business?\n\nChoose from:\n• Accommodation (Hotels, Resorts, Hostels, Homestay, Vacation Rentals)\n• Travel & Tourism (Tourist Attractions, Museums, Parks, Tours, Travel Agencies)\n• Shopping (Souvenir Shops, Local Markets, Boutiques, Malls)\n• Food & Beverage (Restaurants, Cafes, Bakeries, Bars)\n• Transportation (Car Dealers, Car Rentals, Taxis, Motorcycle Taxis, Shuttles)\n• Services (Laundry, Salon, Spa, Massage, Event Organizers)\n• Health & Wellness (Clinics, Pharmacies, Wellness Centers, Gyms)\n• Entertainment (Bars, Clubs, Cinemas, Gaming Centers)\n• Real Estate (Apartment Rentals, Condo Leasing, Real Estate Agents)\n• Community & Local Businesses (Small Stores, Sari Sari, Cooperatives, Repair Shops)\n• Freelancers & Consultants (Freelancer, Solo, Individual, Self-employed, Consultant)"
        setStep(3)
      } else if (step === 3) {
        const tier = getMerchantTier(input)
        setBusinessData({ ...businessData, category: input, tier })
        botResponse = `Excellent choice! Your business falls under our "${tier.tier}" category. Please provide a brief description of your business - what makes it special and what services or products you offer:`
        setStep(4)
      } else if (step === 4) {
        setBusinessData({ ...businessData, description: input })
        botResponse =
          "Thank you for that detailed information! What is your business phone number? (Include country code)"
        setStep(5)
      } else if (step === 5) {
        setBusinessData({ ...businessData, phone: input })
        botResponse = "Great! What is your business email address?"
        setStep(6)
      } else if (step === 6) {
        setBusinessData({ ...businessData, email: input })
        botResponse =
          "Perfect! Do you have a WhatsApp number for customer inquiries? (Include country code, or type 'Same' if same as phone)"
        setStep(7)
      } else if (step === 7) {
        setBusinessData({ ...businessData, whatsapp: input })
        botResponse =
          "Wonderful! Would you like to share your business rating or reviews? (e.g., 4.5 stars, or type 'New Business' if no ratings yet)"
        setStep(8)
      } else if (step === 8) {
        setBusinessData({ ...businessData, rating: input })
        const tier = businessData.tier
        const isBigOrEnterprise = tier.tier === "Big Merchant" || tier.tier === "Large Enterprise"
        const featuredText = isBigOrEnterprise
          ? `\n\n✨ PREMIUM OPTION: Add $30/monthly to be featured in top search results (3x more visibility!)\nWould you like to add Featured Listing? Type 'Yes' or 'No'`
          : ""

        botResponse = `Excellent! Here's your business summary:\n\n📋 Business: ${businessData.name}\n📍 Location: ${businessData.location}\n📂 Category: ${businessData.category}\n⭐ Rating: ${input}\n\nYour merchant tier: ${tier.tier}\n💰 Monthly Fee: $${tier.monthly.usd} USD (${tier.monthly.pi} Pi)\n💰 Yearly Fee: $${tier.yearly.usd} USD (${tier.yearly.pi} Pi) - ${tier.yearly.discount}${featuredText}\n\n${isBigOrEnterprise ? "First, answer about Featured Listing, then " : ""}Would you prefer:\n1. Auto-renew my listing (automatic renewal)\n2. Remind me manually each cycle\n\nPlease type 1 or 2:`
        setStep(9)
      } else if (step === 9) {
        const tier = businessData.tier
        const isBigOrEnterprise = tier.tier === "Big Merchant" || tier.tier === "Large Enterprise"
        if (isBigOrEnterprise) {
          setBusinessData({ ...businessData, isFeatured: input.toLowerCase() === "yes" })
          botResponse =
            "Great! Now, would you prefer:\n1. Auto-renew my listing (automatic renewal)\n2. Remind me manually each cycle\n\nPlease type 1 or 2:"
          setStep(10)
        } else {
          setRenewalChoice(input === "1" ? "Auto-renewal enabled" : "Manual reminders enabled")
          botResponse = `Perfect! ${input === "1" ? "Auto-renewal is set up" : "You'll receive manual reminders 7 days before renewal"}. Now let's complete your registration payment. You'll see the payment options below.`
          setStep(11)
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { role: "bot", content: botResponse },
              {
                role: "bot",
                content: "Complete Registration Payment",
                showPayment: true,
              },
            ])
          }, 500)
        }
      } else if (step === 10) {
        setRenewalChoice(input === "1" ? "Auto-renewal enabled" : "Manual reminders enabled")
        botResponse = `Perfect! ${input === "1" ? "Auto-renewal is set up" : "You'll receive manual reminders 7 days before renewal"}. Now let's complete your registration payment. You'll see the payment options below.`
        setStep(11)
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "bot", content: botResponse },
            {
              role: "bot",
              content: "Complete Registration Payment",
              showPayment: true,
            },
          ])
        }, 500)
      } else if (step === 11) {
        if (hasPaid && paymentReceipt) {
          handleFinalSubmit()
        }
      }

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }, 500)

    setInput("")
  }

  const handleSubmitPayment = () => {
    if (hasPaid && paymentReceipt) {
      handleFinalSubmit()
    }
  }

  const handleFinalSubmit = () => {
    if (hasPaid && paymentReceipt) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Perfect! ✅ Your payment receipt has been received successfully!\n\n🎉 Registration Complete!\n\nYour business "${businessData.name}" is now submitted for verification. Our team will:\n• Verify your payment within 24 hours\n• Activate your listing in our directory\n• Make you visible to Pi travelers worldwide\n\nYou'll receive:\n• ${renewalChoice}\n• Reminder notifications 7 days before renewal\n• Access to your business dashboard\n\nThank you for joining Global Pi Travel! Welcome to our growing community of Pi-accepting businesses! 🌍💜`,
        },
      ])
      setStep(12)
    }
  }

  const getPaymentLink = () => {
    const amount = businessData.tier.monthly.pi + (businessData.isFeatured ? 30 : 0)
    return `https://wallet.pi/pay?address=${PI_WALLET_ADDRESS}&amount=${amount}&memo=Business Registration - ${businessData.name}`
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-50 to-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "rgb(20, 83, 45)" }}>
            Submit Your Business
          </h1>
          <p className="text-muted-foreground mt-2">Chat with our friendly assistant to get listed</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
        <Card className="h-full flex flex-col bg-white">
          <CardHeader className="border-b" style={{ backgroundColor: "rgb(20, 83, 45, 0.05)" }}>
            <div className="flex items-center gap-3">
              <Avatar style={{ backgroundColor: "rgb(20, 83, 45)" }}>
                <AvatarFallback style={{ backgroundColor: "rgb(20, 83, 45)", color: "white" }}>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Pi Travel Assistant</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "rgb(20, 83, 45)" }} />
                  Here to help
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message, index) => (
              <div key={index}>
                {message.showPayment ? (
                  // Updated payment box colors to neon blue with white
                  <div
                    className="border rounded-lg p-4 space-y-4"
                    style={{ backgroundColor: "#E6F9FF", borderColor: "#00D9FF" }}
                  >
                    <h4 className="font-semibold" style={{ color: "#0099FF" }}>
                      Complete Registration Payment
                    </h4>

                    <div className="text-white p-4 rounded-lg space-y-2" style={{ backgroundColor: "#00D9FF" }}>
                      <p className="font-semibold text-lg text-white">{businessData.tier.tier}</p>
                      <p className="text-sm text-white">
                        Monthly: ${businessData.tier.monthly.usd} USD = {businessData.tier.monthly.pi} Pi
                      </p>
                      <p className="text-sm text-white">
                        Yearly: ${businessData.tier.yearly.usd} USD = {businessData.tier.yearly.pi} Pi
                      </p>
                      <p className="text-xs opacity-90 text-white">Save 10% with yearly payment! • {renewalChoice}</p>
                    </div>

                    <div className="space-y-2">
                      <a href={getPaymentLink()} target="_blank" rel="noopener noreferrer" className="block">
                        <Button
                          variant="outline"
                          className="w-full h-auto py-4 border-2 hover:opacity-90 transition-opacity bg-transparent"
                          style={{ backgroundColor: "#00D9FF", color: "white", borderColor: "#00D9FF" }}
                        >
                          <div className="text-center">
                            <div className="font-semibold text-white">Pay with Pi Wallet</div>
                            <div className="text-xs opacity-90 mt-1 text-white">
                              Click to open Pi Wallet and complete payment
                            </div>
                          </div>
                        </Button>
                      </a>
                      <div className="text-center text-sm text-muted-foreground">OR</div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Send Pi to this wallet address:</Label>
                      <div className="flex gap-2">
                        <Input value={PI_WALLET_ADDRESS} readOnly className="font-mono text-xs bg-white" />
                        <Button
                          onClick={handleCopyAddress}
                          variant="outline"
                          size="icon"
                          style={{ borderColor: "#0099FF" }}
                        >
                          {copied ? (
                            <Check className="h-4 w-4" style={{ color: "#0099FF" }} />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {copied && (
                        <p className="text-xs font-semibold flex items-center gap-1" style={{ color: "#0099FF" }}>
                          <Check className="h-3 w-3" />
                          Address copied to clipboard!
                        </p>
                      )}
                    </div>

                    <div
                      className="border-2 p-3 rounded"
                      style={{ backgroundColor: "#E6F9FF", borderColor: "#00D9FF" }}
                    >
                      <p className="text-sm font-medium" style={{ color: "#0099FF" }}>
                        Amount to Send: {businessData.tier.monthly.pi} Pi (${businessData.tier.monthly.usd} USD){" "}
                        {businessData.isFeatured ? "+ $30/monthly for Featured Listing" : ""}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Please send the exact amount to complete your registration
                      </p>
                    </div>

                    <div className="space-y-3 border-t pt-4" style={{ borderColor: "#00D9FF" }}>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="paid-bot"
                          checked={hasPaid}
                          onChange={(e) => setHasPaid(e.target.checked)}
                          className="h-4 w-4"
                          style={{ accentColor: "#0099FF" }}
                        />
                        <Label htmlFor="paid-bot" className="cursor-pointer text-sm font-semibold">
                          ✓ I have already paid
                        </Label>
                      </div>

                      {hasPaid && (
                        <div className="space-y-2 bg-white p-3 rounded border" style={{ borderColor: "#00D9FF" }}>
                          <Label className="text-sm font-semibold">Upload Payment Receipt:</Label>
                          <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => e.target.files && setPaymentReceipt(e.target.files[0])}
                            className="cursor-pointer text-sm"
                          />
                          {paymentReceipt && (
                            <p className="text-xs font-semibold flex items-center gap-1" style={{ color: "#0099FF" }}>
                              <Check className="h-3 w-3" />
                              {paymentReceipt.name} uploaded
                            </p>
                          )}
                        </div>
                      )}

                      {hasPaid && paymentReceipt && (
                        <Button
                          onClick={handleSubmitPayment}
                          className="w-full hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: "#00D9FF", color: "white" }}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Payment Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === "user" ? "" : "bg-gray-100 text-foreground border border-gray-200"
                      }`}
                      style={
                        message.role === "user"
                          ? { backgroundColor: "rgb(20, 83, 45)", color: "rgb(218, 165, 32)" }
                          : {}
                      }
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>

          {/* Input Area */}
          {step < 12 && step !== 11 && (
            <div className="border-t p-4 bg-white">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  style={{ backgroundColor: "rgb(20, 83, 45)", color: "rgb(218, 165, 32)" }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
