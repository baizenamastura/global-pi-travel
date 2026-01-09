"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  HelpCircle,
  Info,
  LogOut,
  History,
  Lock,
  CheckCircle,
  ArrowLeft,
  Globe,
  Crown,
  Unlock,
  Upload,
  Users,
  Bell,
  Video,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"
import { VideoInvitationHub } from "@/components/video-invitation-hub"

interface PiUser {
  uid: string
  username: string
  accessToken: string
}

interface UserDashboardProps {
  user: PiUser
  onLogout: () => void
  onNavigateHome: () => void
  unlockedMerchants: Array<{ id: number; name: string; unlockedAt: string; amount: string }>
}

export function UserDashboard({ user, onLogout, onNavigateHome, unlockedMerchants }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"home" | "faq" | "about" | "videos">("home")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"sdk" | "manual">("sdk")
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [referralCode, setReferralCode] = useState(() => {
    return user?.username.substring(0, 4).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase()
  })
  const [referralCount, setReferralCount] = useState(0)
  const REFERRAL_CREDIT_AMOUNT = 2
  const referralCredits = referralCount * REFERRAL_CREDIT_AMOUNT

  const handleLogout = () => {
    localStorage.removeItem("piUser")
    onLogout()
  }

  const handleProUpgrade = () => {
    setShowPaymentModal(true)
  }

  const handleSDKPayment = () => {
    alert("Pi SDK Payment will be integrated here")
  }

  const handleManualPayment = () => {
    if (!receiptFile) {
      alert("Please upload your payment receipt")
      return
    }
    alert("Receipt uploaded! Admin will verify and activate your Pro account within 24 hours.")
    setShowPaymentModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-cyan-50 to-blue-50">
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b-4 border-primary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onNavigateHome} className="text-sm text-foreground font-semibold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to App
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-sm text-destructive font-semibold">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-full">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Welcome, {user.username}!</h1>
              <p className="text-sm text-foreground font-medium">Your Travel Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              onClick={() => setActiveTab("home")}
              className="text-sm"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant={activeTab === "videos" ? "default" : "ghost"}
              onClick={() => setActiveTab("videos")}
              className="text-sm"
            >
              <Video className="mr-2 h-4 w-4" />
              Videos
            </Button>
            <Button
              variant={activeTab === "faq" ? "default" : "ghost"}
              onClick={() => setActiveTab("faq")}
              className="text-sm"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </Button>
            <Button
              variant={activeTab === "about" ? "default" : "ghost"}
              onClick={() => setActiveTab("about")}
              className="text-sm"
            >
              <Info className="mr-2 h-4 w-4" />
              About Us
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === "home" && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-600 to-green-700 border-4 border-yellow-400">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Refer Friends & Earn Credits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur">
                  <Label className="text-white font-bold">Your Referral Code</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={referralCode}
                      readOnly
                      className="bg-white text-green-900 font-bold text-xl text-center"
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(referralCode)
                        alert("Referral code copied!")
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 p-4 rounded-lg backdrop-blur text-center">
                    <p className="text-white text-sm font-semibold">Friends Referred</p>
                    <p className="text-white text-3xl font-bold">{referralCount}</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg backdrop-blur text-center">
                    <p className="text-white text-sm font-semibold">Earned Credits</p>
                    <p className="text-yellow-300 text-3xl font-bold">${referralCredits}</p>
                  </div>
                </div>
                <Alert className="bg-yellow-100 border-yellow-500">
                  <AlertDescription className="text-green-900 font-semibold">
                    Get $2 credit when a friend upgrades to Pro! Credits can be used for unlocks or Pro subscription.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="border-4 border-amber-400 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-amber-400/30 to-yellow-400/30 border-b-2 border-amber-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="h-8 w-8 text-amber-600" />
                    <div>
                      <CardTitle className="text-2xl text-amber-900">Upgrade to PRO</CardTitle>
                      <CardDescription className="text-amber-800 font-semibold">
                        Unlimited Access to All Merchants
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-amber-600 text-white text-lg px-4 py-2">
                    <Crown className="mr-2 h-4 w-4" />
                    PRO
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="text-center space-y-4">
                  <div className="bg-white/80 p-6 rounded-xl border-3 border-amber-300 shadow-lg">
                    <p className="text-sm text-foreground font-semibold mb-2">Monthly Subscription</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-primary">$9.99</span>
                      <span className="text-2xl text-foreground">USD</span>
                    </div>
                    <div className="mt-4 pt-4 border-t-2 border-amber-200">
                      <p className="text-sm text-foreground font-semibold mb-1">Equivalent Pi Value</p>
                      <div className="flex items-center justify-center gap-2 bg-amber-100 p-3 rounded-lg">
                        <span className="text-2xl font-bold text-secondary">0.0000318</span>
                        <span className="text-lg text-foreground font-semibold">Pi</span>
                      </div>
                      <p className="text-xs text-foreground mt-2">(Based on GCV 314,159)</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/80 p-4 rounded-lg border-2 border-primary/30">
                      <Unlock className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-bold text-foreground mb-1">Unlimited Unlocks</h4>
                      <p className="text-sm text-foreground">Access all merchant details without per-unlock fees</p>
                    </div>
                    <div className="bg-white/80 p-4 rounded-lg border-2 border-secondary/30">
                      <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <h4 className="font-bold text-foreground mb-1">Auto Renewal</h4>
                      <p className="text-sm text-foreground">Monthly subscription with 3-day advance notification</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleProUpgrade}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-lg py-6 shadow-xl"
                  >
                    <Crown className="mr-2 h-5 w-5" />
                    Upgrade to PRO Now
                  </Button>

                  <p className="text-xs text-foreground">
                    Cancel anytime • Full refund within 7 days • Support via email
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-foreground">Unlocked Merchants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{unlockedMerchants.length}</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-foreground">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-secondary">
                    {(unlockedMerchants.length * 0.00000159).toFixed(8)} Pi
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-foreground">Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-primary/10 text-primary border border-primary/20">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Transaction History */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <History className="h-5 w-5 text-primary" />
                  Your Unlocked Merchants
                </CardTitle>
                <CardDescription className="text-foreground">Merchants you have access to</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {unlockedMerchants.length === 0 ? (
                  <Alert className="border-primary/20 bg-primary/5">
                    <Lock className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-foreground">
                      You haven't unlocked any merchants yet. Start exploring and unlock merchant details to see them
                      here.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {unlockedMerchants.map((merchant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{merchant.name}</p>
                          <p className="text-xs text-foreground">Unlocked on {merchant.unlockedAt}</p>
                        </div>
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                          {merchant.amount}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={onNavigateHome}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  Explore More Merchants
                </Button>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="border-2 border-purple-500">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="text-purple-900 font-bold flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences (Pro Feature)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <div className="flex-1">
                      <p className="font-semibold text-purple-900">New Merchants in Favorite Locations</p>
                      <p className="text-sm text-purple-700">
                        Get notified when new merchants join in your favorite cities
                      </p>
                    </div>
                  </label>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <div className="flex-1">
                      <p className="font-semibold text-purple-900">Special Offers & Discounts</p>
                      <p className="text-sm text-purple-700">Receive exclusive deals from merchants you unlocked</p>
                    </div>
                  </label>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <div className="flex-1">
                      <p className="font-semibold text-purple-900">Price Drops & Updates</p>
                      <p className="text-sm text-purple-700">Alert me when merchants update their prices or services</p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "videos" && <VideoInvitationHub user={user} />}

        {activeTab === "faq" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>

            {[
              {
                question: "How do I unlock merchant details?",
                answer:
                  "To unlock merchant contact details, pay a one-time fee of $0.50 (0.00000159 Pi based on 314,159 GCV) per merchant. Once paid and receipt uploaded, you'll have permanent access to their contact information.",
              },
              {
                question: "Can I share unlocked merchant details with others?",
                answer:
                  "No, unlocked merchant details are tied to your Pi Network account only. Each user must unlock merchants individually to ensure fair payment to merchants and maintain security.",
              },
              {
                question: "What payment methods are accepted?",
                answer:
                  "We accept Pi cryptocurrency payments through the Pi Network SDK. You can pay via Pi Wallet directly or manually send Pi to our wallet address.",
              },
              {
                question: "How do merchant subscriptions work?",
                answer:
                  "Merchants can choose from Small ($10/month), Medium ($20/month), Big ($50/month), or Enterprise ($100/month) plans. Yearly subscriptions receive a 10% discount. Free basic listings are also available.",
              },
              {
                question: "Is my Pi Network account secure?",
                answer:
                  "Yes! We use Pi Network's official SDK for authentication. Your credentials are never stored locally, and all transactions are secured by Pi Network blockchain.",
              },
              {
                question: "What if I have payment issues?",
                answer:
                  "If you encounter payment issues, please ensure you're using the correct Pi wallet address and amount. Upload your payment receipt after sending Pi, and our system will verify and unlock access within 24 hours.",
              },
              {
                question: "Can merchants update their information?",
                answer:
                  "Yes, merchants with active subscriptions can update their business information, photos, hours, and contact details at any time through their merchant dashboard.",
              },
              {
                question: "What categories of businesses are listed?",
                answer:
                  "We list 10 main categories: Accommodation, Travel & Tourism, Shopping, Food & Beverage, Transportation (including Airlines), Services, Health & Wellness, Entertainment, Real Estate, and Community & Local Businesses.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardTitle className="text-base text-foreground">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="text-2xl text-foreground">About Global Pi Travel</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-sm text-foreground leading-relaxed">
              <section>
                <h3 className="font-bold text-base mb-2">Our Mission</h3>
                <p>
                  Global Pi Travel is the world's first global travel directory exclusively for Pi-accepting merchants.
                  We're building the infrastructure for a borderless travel economy powered by Pi cryptocurrency.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">What We Offer</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Global directory of Pi-accepting businesses in 195+ countries</li>
                  <li>10 comprehensive categories covering all travel needs</li>
                  <li>Secure Pi Network authentication and payment processing</li>
                  <li>Direct contact with hotels, restaurants, airlines, and more</li>
                  <li>Interactive maps and directions to merchant locations</li>
                  <li>Community forum for Pi travelers worldwide</li>
                  <li>Featured Enterprise Partners section</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">For Travelers</h3>
                <p>
                  Search and discover Pi-accepting businesses globally. Unlock merchant contact details with small
                  one-time fees. Book hotels, flights, restaurants, and experiences using Pi cryptocurrency. Connect
                  with a global community of Pi travelers.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">For Merchants</h3>
                <p>
                  Join our free global directory and reach millions of Pi Pioneers worldwide. Choose from flexible
                  subscription plans (Small, Medium, Big, or Enterprise) to unlock full features including contact
                  details, photos, promotions, and premium placement. Grow your business with the expanding Pi economy.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">Why Choose Pi for Travel</h3>
                <p>
                  Pi Network is creating accessible cryptocurrency for everyday people. By using Pi for travel services.
                  Global Pi Travel accelerates this vision by creating the infrastructure for Pi-based travel commerce
                  at scale.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Global Directory: Discover Pi-accepting merchants worldwide</li>
                  <li>Secure Payments: All transactions secured by Pi Network blockchain</li>
                  <li>Direct Connections: Connect directly with hotels, restaurants, tours & more</li>
                  <li>Community Driven: Join thousands of Pi pioneers transforming travel</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-base mb-2">Contact & Support</h3>
                <p>Email: baizenamastura@gmail.com</p>
                <p>Community Forum: Join Global Pi Travel Community</p>
                <p>Business Inquiries: merchants@globalpitravel.com</p>
              </section>

              <div className="pt-4 border-t border-border text-center">
                <p>© 2025 Global Pi Travel. All rights reserved.</p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Building the future of travel, one Pi at a time.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-blue-500/40 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-amber-400">
            <CardHeader className="bg-gradient-to-r from-amber-400/30 to-yellow-400/30 border-b-2 border-amber-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-amber-600" />
                  <CardTitle className="text-xl text-foreground">Complete Your PRO Upgrade</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentModal(false)}
                  className="text-foreground"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Payment Summary */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border-2 border-amber-300">
                <h3 className="font-bold text-foreground mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground">PRO Subscription (Monthly)</span>
                    <span className="font-bold text-foreground">$9.99 USD</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-foreground">Pi Amount (GCV 314,159)</span>
                    <span className="font-bold text-secondary">0.0000318 Pi</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Select Payment Method</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant={paymentMethod === "sdk" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("sdk")}
                    className="h-auto py-4 flex flex-col items-start"
                  >
                    <span className="font-bold">Pi SDK Payment</span>
                    <span className="text-xs opacity-80">Pay directly via Pi Wallet</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "manual" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("manual")}
                    className="h-auto py-4 flex flex-col items-start"
                  >
                    <span className="font-bold">Manual Payment</span>
                    <span className="text-xs opacity-80">Send Pi & upload receipt</span>
                  </Button>
                </div>
              </div>

              {/* SDK Payment */}
              {paymentMethod === "sdk" && (
                <div
                  className="space-y-4 p-4 rounded-lg border-2"
                  style={{ backgroundColor: "#0099FF", borderColor: "#00D9FF" }}
                >
                  <h4 className="font-bold text-white">Pay with Pi SDK</h4>
                  <p className="text-sm text-white">
                    Click the button below to open your Pi Wallet and complete the payment of 0.0000318 Pi.
                  </p>
                  <Button
                    onClick={handleSDKPayment}
                    className="w-full bg-white hover:bg-gray-100 text-blue-600 font-bold"
                  >
                    Open Pi Wallet to Pay
                  </Button>
                </div>
              )}

              {/* Manual Payment */}
              {paymentMethod === "manual" && (
                <div
                  className="space-y-4 p-4 rounded-lg border-2"
                  style={{ backgroundColor: "#0099FF", borderColor: "#00D9FF" }}
                >
                  <h4 className="font-bold text-white">Manual Pi Payment</h4>

                  {/* Pi Wallet Address */}
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Send Pi to this wallet address:</Label>
                    <div className="bg-white p-3 rounded border-2 border-gray-300 break-all">
                      <p className="text-xs font-mono text-gray-900">
                        GDV4XJJL6DH4G7LAO25DUFW4AEXLRNGZEYHH254NTCRO7MLKT5DIULYO
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Amount to Send:</Label>
                    <div className="bg-white p-3 rounded border-2 border-gray-300">
                      <p className="text-2xl font-bold text-blue-600">0.0000318 Pi</p>
                      <p className="text-xs text-gray-900">For PRO Monthly Subscription</p>
                    </div>
                  </div>

                  {/* Upload Receipt */}
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Upload Payment Receipt:</Label>
                    <div className="border-2 border-dashed border-white rounded-lg p-4 text-center bg-white/10">
                      <Upload className="h-8 w-8 text-white mx-auto mb-2" />
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                        className="text-sm bg-white"
                      />
                      {receiptFile && <p className="text-xs text-white mt-2">Selected: {receiptFile.name}</p>}
                    </div>
                  </div>

                  <Alert className="border-white bg-white/20">
                    <AlertDescription className="text-white text-xs">
                      After uploading your receipt, our admin will verify your payment within 24 hours and activate your
                      PRO account.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleManualPayment}
                    disabled={!receiptFile}
                    className="w-full bg-white hover:bg-gray-100 text-blue-600 font-bold"
                  >
                    Submit Payment Receipt
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}
