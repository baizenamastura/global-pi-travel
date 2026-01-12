"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchDestination } from "@/components/search-destination"
import { RegisterBusiness } from "@/components/register-business"
import { MerchantList } from "@/components/merchant-list"
import { BusinessSubmitBot } from "@/components/business-submit-bot"
import { TravelForum } from "@/components/travel-forum"
import { GlobalDirectoryListing } from "@/components/global-directory-listing"
import { PiAuth } from "@/components/pi-auth"
import { UserDashboard } from "@/components/user-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Footer } from "@/components/footer"
import { CustomerServiceBot } from "@/components/customer-service-bot"
import { HelpCircle } from "lucide-react"
import {
  Plane,
  Hotel,
  MapPin,
  Coffee,
  ShoppingBag,
  Store,
  MessageSquare,
  Building,
  LogIn,
  User,
  LogOut,
} from "lucide-react"
import FeaturedEnterprisePartners from "@/components/featured-enterprise-partners"

interface PiUser {
  uid: string
  username: string
  accessToken: string
  role?: "user" | "merchant" | "admin"
}

interface UnlockedMerchant {
  id: number
  name: string
  unlockedAt: string
  amount: string
}

export default function HomePage() {
  const [activeView, setActiveView] = useState<
    | "home"
    | "search"
    | "register"
    | "merchants"
    | "submit"
    | "forum"
    | "globalListing"
    | "login"
    | "dashboard"
    | "admin"
  >("home")

  const [piUser, setPiUser] = useState<PiUser | null>(null)
  const [unlockedMerchants, setUnlockedMerchants] = useState<UnlockedMerchant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCustomerBot, setShowCustomerBot] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("piUser")
      if (stored) {
        const user = JSON.parse(stored)
        setPiUser(user)
        loadUserTransactions(user.uid)
      }
    } catch (error) {
      console.error("[v0] Error loading user data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadUserTransactions = (uid: string) => {
    try {
      const stored = localStorage.getItem(`transactions_${uid}`)
      if (stored) {
        setUnlockedMerchants(JSON.parse(stored))
      }
    } catch (error) {
      console.error("[v0] Error loading transactions:", error)
    }
  }

  const handleLogin = (user: PiUser) => {
    setPiUser(user)
    loadUserTransactions(user.uid)
    setActiveView("home")
  }

  const handleLogout = () => {
    setPiUser(null)
    setUnlockedMerchants([])
    setActiveView("home")
  }

  const handleUnlockSuccess = (merchantId: number, merchantName: string) => {
    if (!piUser) return

    const newTransaction: UnlockedMerchant = {
      id: merchantId,
      name: merchantName,
      unlockedAt: new Date().toLocaleDateString(),
      amount: "0.00000955 Pi",
    }

    const updated = [...unlockedMerchants, newTransaction]
    setUnlockedMerchants(updated)
    localStorage.setItem(`transactions_${piUser.uid}`, JSON.stringify(updated))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">GLOBAL Pi TRAVEL</h1>
          <p className="text-sm text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (activeView === "login") {
    return <PiAuth onLogin={handleLogin} onBack={() => setActiveView("home")} />
  }

  if (activeView === "dashboard") {
    return (
      <UserDashboard
        user={piUser!}
        onLogout={handleLogout}
        onNavigateHome={() => setActiveView("home")}
        unlockedMerchants={unlockedMerchants}
      />
    )
  }

  if (activeView === "search") {
    return <SearchDestination onBack={() => setActiveView("home")} />
  }

  if (activeView === "register") {
    return <RegisterBusiness onBack={() => setActiveView("home")} />
  }

  if (activeView === "merchants") {
    return (
      <MerchantList
        onBack={() => setActiveView("home")}
        user={piUser || undefined}
        onUnlockSuccess={handleUnlockSuccess}
      />
    )
  }

  if (activeView === "submit") {
    return <BusinessSubmitBot onBack={() => setActiveView("home")} />
  }

  if (activeView === "forum") {
    return <TravelForum onBack={() => setActiveView("home")} currentUser={piUser || undefined} />
  }

  if (activeView === "globalListing") {
    return <GlobalDirectoryListing onBack={() => setActiveView("home")} />
  }

  if (activeView === "admin") {
    return <AdminDashboard onBack={() => setActiveView("home")} />
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="flex justify-end items-center mb-4">
            <div className="flex gap-2">
              {piUser ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveView("dashboard")}
                    className="border-primary text-primary hover:bg-primary hover:text-white text-sm"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {piUser.username}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive text-sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveView("login")}
                  className="border-primary text-primary hover:bg-primary hover:text-white text-sm"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login with Pi
                </Button>
              )}
            </div>
          </div>

          {piUser && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4 text-center">
              <p className="text-sm font-semibold text-primary">Welcome back, {piUser.username}!</p>
            </div>
          )}

          <div className="flex items-center justify-center mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">GLOBAL Pi TRAVEL</h1>
          </div>

          <div className="text-center mb-6">
            <p className="text-base md:text-lg font-bold text-foreground mb-2 text-balance">
              Your Ultimate Travel Companion Powered by Pi
            </p>
            <p className="text-sm md:text-base font-semibold text-primary">Explore. Book. Pay with Pi Worldwide</p>
          </div>

          <div className="flex justify-center mb-6">
            <Button
              size="lg"
              onClick={() => setActiveView("search")}
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-base px-6 py-5"
            >
              Start Now
            </Button>
          </div>

          {piUser?.role === "admin" && (
            <div className="text-center mt-6">
              <Card className="border-2 border-amber-500 bg-amber-50">
                <CardContent className="pt-4 pb-4">
                  <Button
                    size="lg"
                    onClick={() => setActiveView("admin")}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-base px-8 py-5 w-full"
                  >
                    🔑 Admin Dashboard Access
                  </Button>
                  <p className="text-xs text-amber-900 mt-2 font-semibold">You are logged in as Administrator</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Featured Enterprise Partners Section */}
      <div className="container mx-auto px-4 py-6">
        <FeaturedEnterprisePartners />
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-3 md:grid-cols-2">
          {/* Search Destinations Card */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-primary/20"
            onClick={() => setActiveView("search")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-primary" />
                Search Destinations
              </CardTitle>
              <CardDescription className="text-xs text-foreground">
                Find flights, hotels, and merchants accepting Pi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <Plane className="h-3 w-3 text-primary" />
                  <span>Flights</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <Hotel className="h-3 w-3 text-primary" />
                  <span>Hotels</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <Coffee className="h-3 w-3 text-primary" />
                  <span>Cafes & Restaurants</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <Building className="h-3 w-3 text-primary" />
                  <span>Resorts</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pi Global Merchants Directory Listing Card */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-[6px]"
            style={{ borderColor: "rgb(21, 128, 61)" }}
            onClick={() => setActiveView("globalListing")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold" style={{ color: "rgb(21, 128, 61)" }}>
                <Store className="h-4 w-4" style={{ color: "rgb(21, 128, 61)" }} />
                Pi Global Merchants Directory Listing
              </CardTitle>
              <CardDescription className="text-xs font-semibold" style={{ color: "rgb(21, 128, 61)" }}>
                Free Directory Listing to all merchants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground">Get your business listed in our global directory</p>
            </CardContent>
          </Card>

          {/* Merchant Subscription Plans Card */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-[6px]"
            style={{ borderColor: "rgb(20, 184, 166)" }}
            onClick={() => setActiveView("register")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Store className="h-4 w-4 text-primary" />
                Merchant Subscription Plans
              </CardTitle>
              <CardDescription className="text-xs text-foreground">Monthly & Yearly Plans Available</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground">Choose from Small, Medium, Big, or Enterprise Merchant Plans</p>
            </CardContent>
          </Card>

          {/* Pi-Accepting Merchants Card */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-[6px]"
            style={{ borderColor: "rgb(0, 153, 255)" }}
            onClick={() => setActiveView("merchants")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Pi-Accepting Merchants
              </CardTitle>
              <CardDescription className="text-xs text-foreground">
                Explore businesses that accept Pi payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground">View and unlock full contact details</p>
            </CardContent>
          </Card>

          {/* Global Pi Pioneers Community Card */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-[6px]"
            style={{ borderColor: "rgb(147, 51, 234)" }}
            onClick={() => setActiveView("forum")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base" style={{ color: "rgb(147, 51, 234)" }}>
                <MessageSquare className="h-4 w-4" style={{ color: "rgb(147, 51, 234)" }} />
                Global Pi Pioneers Community
              </CardTitle>
              <CardDescription className="text-xs text-foreground">Connect with travelers worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground">Share tips and experiences with the global Pi Pioneer community</p>
            </CardContent>
          </Card>

          {/* Submit Business Card */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 md:col-span-2"
            style={{
              borderColor: "rgb(21, 128, 61)",
              backgroundColor: "rgb(21, 128, 61)",
              maxWidth: "100%",
            }}
            onClick={() => setActiveView("submit")}
          >
            <CardHeader className="pb-2 px-3">
              <CardTitle className="flex items-center gap-2 text-sm text-white font-bold">
                <Store className="h-4 w-4 text-white flex-shrink-0" />
                <span className="break-words line-clamp-1">Register My Business FREE</span>
              </CardTitle>
              <CardDescription className="text-xs text-green-100">
                Join our global merchant directory today!
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 px-3">
              <p className="text-xs text-green-50 line-clamp-2">
                Our friendly chatbot will guide you through the registration process
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <h3 className="text-base font-semibold text-foreground mb-1">
                Join the Pi Pioneer Traveler Community Worldwide
              </h3>
              <p className="text-xs text-foreground">
                Connect with travelers and merchants accepting Pi cryptocurrency globally
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Customer Service Bot Button */}
      {!showCustomerBot && (
        <button
          onClick={() => setShowCustomerBot(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center gap-2"
          aria-label="Open customer support chat"
        >
          <HelpCircle className="h-6 w-6" />
          <span className="text-sm font-semibold pr-2">Need Help?</span>
        </button>
      )}

      {/* Customer Service Bot Modal */}
      {showCustomerBot && <CustomerServiceBot onClose={() => setShowCustomerBot(false)} />}

      {/* Footer Component */}
      <Footer />
    </div>
  )
}





































































                
