"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  DollarSign,
  Users,
  Download,
  Eye,
  EyeOff,
  Crown,
  Store,
  CalendarIcon,
  TrendingUp,
  Activity,
  PieChart,
  BarChart3,
  LineChart,
  Target,
  Zap,
  Bell,
  Mail,
  FileText,
  Calculator,
  Globe,
  CreditCard,
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminAssistantBot from "@/components/admin-assistant-bot"

interface AdminDashboardProps {
  onBack: () => void
}

// Mock data - in production, this would come from your database
const mockTransactions = [
  {
    id: 1,
    merchantName: "Sunset Resort",
    planType: "Big Merchant",
    amount: "0.0001592 Pi",
    usdAmount: "$50",
    status: "active",
    paymentDate: "2024-01-15",
    expiryDate: "2024-02-15",
    paymentMethod: "SDK",
    receiptUrl: "receipt-001.jpg",
  },
  {
    id: 2,
    merchantName: "City Cafe",
    planType: "Small Merchant",
    amount: "0.00004775 Pi",
    usdAmount: "$15",
    status: "active",
    paymentDate: "2024-01-10",
    expiryDate: "2024-02-10",
    paymentMethod: "Manual",
    receiptUrl: "receipt-002.jpg",
  },
  {
    id: 3,
    merchantName: "Global Airlines",
    planType: "Enterprise Merchant",
    amount: "0.0004743 Pi",
    usdAmount: "$149",
    status: "expired",
    paymentDate: "2023-12-01",
    expiryDate: "2024-01-01",
    paymentMethod: "SDK",
    receiptUrl: null,
  },
  {
    id: 4,
    merchantName: "Downtown Hotel",
    planType: "Medium Merchant",
    amount: "0.00007958 Pi",
    usdAmount: "$25",
    status: "pending",
    paymentDate: "2024-01-20",
    expiryDate: "2024-02-20",
    paymentMethod: "Manual",
    receiptUrl: "receipt-004.jpg",
  },
]

const mockUserData = [
  {
    id: 1,
    username: "@pioner123",
    country: "Philippines",
    plan: "Ordinary",
    unlockedMerchants: 3,
    totalSpent: "$9",
    dailyIncome: "$0",
    monthlyIncome: "$0",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    username: "@traveler456",
    country: "Japan",
    plan: "Pro",
    unlockedMerchants: 15,
    totalSpent: "$99",
    dailyIncome: "$2.50",
    monthlyIncome: "$99",
    joinDate: "2024-01-12",
    status: "active",
  },
  {
    id: 3,
    username: "@pioneer789",
    country: "USA",
    plan: "Ordinary",
    unlockedMerchants: 2,
    totalSpent: "$6",
    dailyIncome: "$0",
    monthlyIncome: "$0",
    joinDate: "2024-01-20",
    status: "active",
  },
  {
    id: 4,
    username: "@explorer321",
    country: "UK",
    plan: "Pro",
    unlockedMerchants: 28,
    totalSpent: "$99",
    dailyIncome: "$1.80",
    monthlyIncome: "$99",
    joinDate: "2024-01-18",
    status: "active",
  },
  {
    id: 5,
    username: "@nomad999",
    country: "Germany",
    plan: "Ordinary",
    unlockedMerchants: 1,
    totalSpent: "$3",
    dailyIncome: "$0",
    monthlyIncome: "$0",
    joinDate: "2024-01-22",
    status: "active",
  },
  {
    id: 6,
    username: "@globetrotter88",
    country: "Australia",
    plan: "Pro",
    unlockedMerchants: 42,
    totalSpent: "$99",
    dailyIncome: "$3.20",
    monthlyIncome: "$99",
    joinDate: "2024-01-10",
    status: "active",
  },
  {
    id: 7,
    username: "@wanderlust22",
    country: "Canada",
    plan: "Ordinary",
    unlockedMerchants: 4,
    totalSpent: "$12",
    dailyIncome: "$0",
    monthlyIncome: "$0",
    joinDate: "2024-01-25",
    status: "active",
  },
]

const mockMerchantDirectory = [
  {
    id: 1,
    name: "Grand Pi Hotel & Resort",
    category: "Accommodation",
    subcategory: "Hotels",
    country: "France",
    city: "Paris",
    plan: "Big Merchant",
    status: "active",
    monthlyFee: "$50",
    joinDate: "2023-12-01",
    views: 1250,
    unlocks: 45,
    totalUnlocks: 45, // Added for top merchants calculation
    businessName: "Grand Pi Hotel & Resort", // Added for top merchants calculation
  },
  {
    id: 2,
    name: "Pi Cafe Express",
    category: "Food & Beverage",
    subcategory: "Cafes",
    country: "Japan",
    city: "Tokyo",
    plan: "Small Merchant",
    status: "active",
    monthlyFee: "$15",
    joinDate: "2024-01-05",
    views: 890,
    unlocks: 32,
    totalUnlocks: 32, // Added for top merchants calculation
    businessName: "Pi Cafe Express", // Added for top merchants calculation
  },
  {
    id: 3,
    name: "Bella Italia Restaurant",
    category: "Food & Beverage",
    subcategory: "Restaurants",
    country: "Italy",
    city: "Rome",
    plan: "Medium Merchant",
    status: "active",
    monthlyFee: "$25",
    joinDate: "2024-01-10",
    views: 1050,
    unlocks: 38,
    totalUnlocks: 38, // Added for top merchants calculation
    businessName: "Bella Italia Restaurant", // Added for top merchants calculation
  },
  {
    id: 4,
    name: "Pi Travel Tours",
    category: "Travel & Tourism",
    subcategory: "Tour Operators",
    country: "UK",
    city: "London",
    plan: "Medium Merchant",
    status: "expired",
    monthlyFee: "$25",
    joinDate: "2023-11-15",
    views: 750,
    unlocks: 28,
    totalUnlocks: 28, // Added for top merchants calculation
    businessName: "Pi Travel Tours", // Added for top merchants calculation
  },
  {
    id: 5,
    name: "Global Pi Airlines",
    category: "Airlines",
    subcategory: "International Airlines",
    country: "USA",
    city: "New York",
    plan: "Enterprise Merchant",
    status: "active",
    monthlyFee: "$149",
    joinDate: "2023-10-01",
    views: 2100,
    unlocks: 78,
    totalUnlocks: 78, // Added for top merchants calculation
    businessName: "Global Pi Airlines", // Added for top merchants calculation
  },
]

const dailyIncome = [
  { date: "2024-01-15", userUnlocks: 12, amount: "$36", merchants: 3 },
  { date: "2024-01-16", userUnlocks: 18, amount: "$54", merchants: 5 },
  { date: "2024-01-17", userUnlocks: 15, amount: "$45", merchants: 4 },
  { date: "2024-01-18", userUnlocks: 22, amount: "$66", merchants: 6 },
  { date: "2024-01-19", userUnlocks: 19, amount: "$57", merchants: 5 },
  { date: "2024-01-20", userUnlocks: 25, amount: "$75", merchants: 7 },
  { date: "2024-01-21", userUnlocks: 28, amount: "$84", merchants: 8 },
]

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState("")
  const [storedPassword, setStoredPassword] = useState("globalpitravel2025")
  const [showChangePassword, setShowChangePassword] = useState(false)

  // New state variables for password visibility
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedTab, setSelectedTab] = useState("overview")

  const [dateRangeStart, setDateRangeStart] = useState<Date>()
  const [dateRangeEnd, setDateRangeEnd] = useState<Date>()
  const [selectedPreset, setSelectedPreset] = useState<string>("all-time")

  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonPeriod, setComparisonPeriod] = useState("last-month")
  const [expenseAmount, setExpenseAmount] = useState("")
  const [profitMargin, setProfitMargin] = useState(0)

  const filterByDateRange = (date: string) => {
    if (!dateRangeStart && !dateRangeEnd) return true
    const itemDate = new Date(date)
    if (dateRangeStart && itemDate < dateRangeStart) return false
    if (dateRangeEnd && itemDate > dateRangeEnd) return false
    return true
  }

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset)
    const today = new Date()
    switch (preset) {
      case "today":
        setDateRangeStart(today)
        setDateRangeEnd(today)
        break
      case "last-7-days":
        setDateRangeStart(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000))
        setDateRangeEnd(today)
        break
      case "last-30-days":
        setDateRangeStart(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000))
        setDateRangeEnd(today)
        break
      case "this-month":
        setDateRangeStart(new Date(today.getFullYear(), today.getMonth(), 1))
        setDateRangeEnd(today)
        break
      case "last-month":
        setDateRangeStart(new Date(today.getFullYear(), today.getMonth() - 1, 1))
        setDateRangeEnd(new Date(today.getFullYear(), today.getMonth(), 0))
        break
      case "this-year":
        setDateRangeStart(new Date(today.getFullYear(), 0, 1))
        setDateRangeEnd(today)
        break
      case "all-time":
        setDateRangeStart(undefined)
        setDateRangeEnd(undefined)
        break
    }
  }

  const handleAdminLogin = () => {
    if (adminPassword === storedPassword) {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect admin password")
    }
  }

  const handleSetupPassword = () => {
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setStoredPassword(newPassword)
    alert("Password set successfully! Please login with your new password.")
    setIsFirstTimeSetup(false)
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleForgotPassword = () => {
    if (!recoveryEmail) {
      alert("Please enter your recovery email")
      return
    }
    alert(`Password recovery link sent to ${recoveryEmail}. Check your email!`)
    setShowForgotPassword(false)
    setRecoveryEmail("")
  }

  const handleChangePassword = () => {
    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters long")
      return
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setStoredPassword(newPassword)
    alert("Password changed successfully!")
    setShowChangePassword(false)
    setNewPassword("")
    setConfirmPassword("")
    setAdminPassword("")
  }

  const weeklyUserIncome = dailyIncome.reduce((sum, day) => sum + Number.parseFloat(day.amount.replace("$", "")), 0)

  const filteredDailyIncome = dailyIncome.filter((day) => filterByDateRange(day.date))
  const filteredWeeklyUserIncome = filteredDailyIncome.reduce(
    (sum, day) => sum + Number.parseFloat(day.amount.replace("$", "")),
    0,
  )

  const calculateProfitMargin = () => {
    const expense = Number.parseFloat(expenseAmount) || 0
    const profit = filteredWeeklyUserIncome - expense
    const margin = filteredWeeklyUserIncome > 0 ? (profit / filteredWeeklyUserIncome) * 100 : 0
    setProfitMargin(margin)
  }

  const calculateProjection = () => {
    const avgDailyRevenue = filteredDailyIncome.length > 0 ? filteredWeeklyUserIncome / filteredDailyIncome.length : 0
    const next30Days = avgDailyRevenue * 30
    const next90Days = avgDailyRevenue * 90
    const growthRate = 1.15 // 15% growth assumption
    return {
      next30Days: next30Days.toFixed(2),
      next90Days: next90Days.toFixed(2),
      withGrowth30: (next30Days * growthRate).toFixed(2),
      withGrowth90: (next90Days * growthRate).toFixed(2),
    }
  }

  const projection = calculateProjection()

  // Calculations for merchant retention rate
  const totalMerchants = mockMerchantDirectory.length
  const activeMerchants = mockMerchantDirectory.filter((m) => m.status === "active").length
  const merchantRetentionRate = ((activeMerchants / totalMerchants) * 100).toFixed(1)

  const topMerchants = mockMerchantDirectory.sort((a, b) => b.totalUnlocks - a.totalUnlocks).slice(0, 10)

  const paymentMethods = mockTransactions.reduce(
    (acc, t) => {
      acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryPerformance = mockMerchantDirectory.reduce(
    (acc, merchant) => {
      if (!acc[merchant.category]) {
        acc[merchant.category] = { count: 0, revenue: 0, unlocks: 0 }
      }
      acc[merchant.category].count++
      acc[merchant.category].revenue += Number.parseFloat(merchant.monthlyFee.replace("$", ""))
      acc[merchant.category].unlocks += merchant.unlocks // Corrected to use unlocks from mock data
      return acc
    },
    {} as Record<string, { count: number; revenue: number; unlocks: number }>,
  )

  if (isFirstTimeSetup) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Set Up Admin Password</CardTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">Create your secure admin password</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newPassword">New Password (min 8 characters)</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button onClick={handleSetupPassword} className="w-full bg-primary">
              Set Password
            </Button>
            <Button onClick={onBack} variant="outline" className="w-full bg-transparent">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Password Recovery</CardTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Enter your recovery email to reset password
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recoveryEmail">Recovery Email</Label>
              <Input
                id="recoveryEmail"
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                placeholder="your-email@example.com"
              />
            </div>
            <Button onClick={handleForgotPassword} className="w-full bg-primary">
              Send Recovery Link
            </Button>
            <Button onClick={() => setShowForgotPassword(false)} variant="outline" className="w-full bg-transparent">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Current Password: <span className="font-mono font-bold">{storedPassword}</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="adminPassword">Admin Password</Label>
              <div className="relative">
                <Input
                  id="adminPassword"
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button onClick={handleAdminLogin} className="w-full bg-primary">
              Login to Admin Dashboard
            </Button>
            <div className="flex gap-2">
              <Button onClick={() => setShowForgotPassword(true)} variant="link" className="flex-1 text-sm">
                Forgot Password?
              </Button>
              <Button onClick={() => setIsFirstTimeSetup(true)} variant="link" className="flex-1 text-sm">
                Setup New Password
              </Button>
            </div>
            <Button onClick={onBack} variant="outline" className="w-full bg-transparent">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showChangePassword) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Change Admin Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPasswordChange">New Password (min 8 characters)</Label>
              <div className="relative">
                <Input
                  id="newPasswordChange"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPasswordChange">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPasswordChange"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button onClick={handleChangePassword} className="w-full bg-primary">
              Change Password
            </Button>
            <Button onClick={() => setShowChangePassword(false)} variant="outline" className="w-full bg-transparent">
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const countryStats = mockMerchantDirectory.reduce(
    (acc, merchant) => {
      if (!acc[merchant.country]) {
        acc[merchant.country] = { merchants: 0, revenue: 0 }
      }
      acc[merchant.country].merchants++
      acc[merchant.country].revenue += Number.parseFloat(merchant.monthlyFee.replace("$", ""))
      return acc
    },
    {} as Record<string, { merchants: number; revenue: number }>,
  )

  const userCountryStats = mockUserData.reduce(
    (acc, user) => {
      if (!acc[user.country]) {
        acc[user.country] = { users: 0, unlocks: 0 }
      }
      acc[user.country].users++
      acc[user.country].unlocks += user.unlockedMerchants
      return acc
    },
    {} as Record<string, { users: number; unlocks: number }>,
  )

  const totalUsers = mockUserData.length
  const totalMonthlyRevenue = mockMerchantDirectory
    .filter((m) => m.status === "active")
    .reduce((sum, m) => sum + Number.parseFloat(m.monthlyFee.replace("$", "")), 0)

  const filteredTransactions = mockTransactions.filter(
    (t) => t.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) && filterByDateRange(t.paymentDate),
  )

  const activeCount = mockTransactions.filter((t) => t.status === "active").length
  const expiredCount = mockTransactions.filter((t) => t.status === "expired").length
  const pendingCount = mockTransactions.filter((t) => t.status === "pending").length
  const totalRevenue = mockTransactions
    .filter((t) => t.status === "active")
    .reduce((sum, t) => sum + Number.parseFloat(t.usdAmount.replace("$", "")), 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button variant="outline" onClick={() => setShowChangePassword(true)}>
              Change Password
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Comprehensive analytics and management</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6 border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <CalendarIcon className="h-5 w-5" />
              Earnings Date Range Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Preset Options */}
              <div className="space-y-2">
                <Label className="text-amber-900 font-semibold">Quick Presets</Label>
                <Select value={selectedPreset} onValueChange={handlePresetChange}>
                  <SelectTrigger className="bg-white border-amber-300">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date Picker */}
              <div className="space-y-2">
                <Label className="text-amber-900 font-semibold">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white border-amber-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRangeStart ? dateRangeStart.toLocaleDateString() : "Pick start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRangeStart}
                      onSelect={(date) => {
                        setDateRangeStart(date)
                        setSelectedPreset("custom")
                      }}
                      captionLayout="dropdown"
                      fromYear={2020}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date Picker */}
              <div className="space-y-2">
                <Label className="text-amber-900 font-semibold">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white border-amber-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRangeEnd ? dateRangeEnd.toLocaleDateString() : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRangeEnd}
                      onSelect={(date) => {
                        setDateRangeEnd(date)
                        setSelectedPreset("custom")
                      }}
                      captionLayout="dropdown"
                      fromYear={2020}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Filtered Results Summary */}
              <div className="space-y-2">
                <Label className="text-amber-900 font-semibold">Filtered Period Earnings</Label>
                <div className="bg-gradient-to-br from-amber-600 to-yellow-600 border-2 border-amber-400 rounded-lg p-3">
                  <p className="text-2xl font-bold text-white">${filteredWeeklyUserIncome.toFixed(2)}</p>
                  <p className="text-xs text-amber-100 mt-1">
                    {filteredDailyIncome.length} days • {filteredDailyIncome.reduce((sum, d) => sum + d.userUnlocks, 0)}{" "}
                    unlocks
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            {(dateRangeStart || dateRangeEnd) && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDateRangeStart(undefined)
                    setDateRangeEnd(undefined)
                    setSelectedPreset("all-time")
                  }}
                  className="border-amber-400 text-amber-900 hover:bg-amber-100"
                >
                  Reset Date Filter
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="bg-white/50 backdrop-blur-sm border-2 border-purple-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
            <TabsTrigger value="income">Income Tracking</TabsTrigger>
            <TabsTrigger value="analytics">Business Analytics</TabsTrigger>
            <TabsTrigger value="financial">Financial Tools</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {selectedTab === "overview" && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm font-semibold flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Total Monthly Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-white">${totalMonthlyRevenue}</p>
                      <p className="text-xs text-blue-100 mt-1">From {activeMerchants} active merchants</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-600 to-green-700 border-2 border-green-400">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Total Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-white">{totalUsers}</p>
                      <p className="text-xs text-green-100 mt-1">Active users on platform</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-2 border-purple-400">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm font-semibold flex items-center gap-2">
                        <Store className="h-4 w-4" />
                        Total Merchants
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-white">{totalMerchants}</p>
                      <p className="text-xs text-purple-100 mt-1">{activeMerchants} active listings</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-500 to-yellow-500 border-2 border-amber-400">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Filtered Period Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-white">${filteredWeeklyUserIncome.toFixed(2)}</p>
                      <p className="text-xs text-amber-100 mt-1">
                        {dateRangeStart && dateRangeEnd
                          ? `${dateRangeStart.toLocaleDateString()} - ${dateRangeEnd.toLocaleDateString()}`
                          : "All time"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2 border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-900">
                      <Activity className="h-5 w-5" />
                      Period Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="p-4 bg-white rounded-lg border-2 border-indigo-200">
                        <p className="text-sm font-medium text-indigo-700">Total Transactions</p>
                        <p className="text-3xl font-bold text-indigo-900">{filteredTransactions.length}</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-2 border-indigo-200">
                        <p className="text-sm font-medium text-indigo-700">Average per Day</p>
                        <p className="text-3xl font-bold text-indigo-900">
                          $
                          {filteredDailyIncome.length > 0
                            ? (filteredWeeklyUserIncome / filteredDailyIncome.length).toFixed(2)
                            : "0.00"}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-2 border-indigo-200">
                        <p className="text-sm font-medium text-indigo-700">Total Unlocks</p>
                        <p className="text-3xl font-bold text-indigo-900">
                          {filteredDailyIncome.reduce((sum, d) => sum + d.userUnlocks, 0)}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-2 border-indigo-200">
                        <p className="text-sm font-medium text-indigo-700">Avg per Unlock</p>
                        <p className="text-3xl font-bold text-indigo-900">
                          $
                          {filteredDailyIncome.reduce((sum, d) => sum + d.userUnlocks, 0) > 0
                            ? (
                                filteredWeeklyUserIncome /
                                filteredDailyIncome.reduce((sum, d) => sum + d.userUnlocks, 0)
                              ).toFixed(2)
                            : "0.00"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Country-wise Analytics */}
                <Card className="border-2 border-blue-400">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
                    <CardTitle className="text-blue-900 font-bold">Country-wise Merchant Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {Object.entries(countryStats)
                        .sort(([, a], [, b]) => b.merchants - a.merchants)
                        .map(([country, stats]) => (
                          <div
                            key={country}
                            className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-blue-900">{country}</p>
                              <p className="text-sm text-blue-700">{stats.merchants} merchants</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-900">${stats.revenue}/month</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* User Activity Analytics */}
                <Card className="border-2 border-green-400">
                  <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                    <CardTitle className="text-green-900 font-bold">User Activity by Country</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {Object.entries(userCountryStats)
                        .sort(([, a], [, b]) => b.users - a.users)
                        .map(([country, stats]) => (
                          <div
                            key={country}
                            className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-green-900">{country}</p>
                              <p className="text-sm text-green-700">{stats.users} users</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-900">{stats.unlocks} unlocks</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-400">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <CardTitle className="text-purple-900 font-bold">
                      Daily Income Trend {dateRangeStart && dateRangeEnd && "(Filtered Period)"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {filteredDailyIncome.length > 0 ? (
                      <div className="space-y-2">
                        {filteredDailyIncome.map((day) => (
                          <div
                            key={day.date}
                            className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                          >
                            <span className="text-sm font-semibold text-purple-900">{day.date}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-purple-700">{day.userUnlocks} unlocks</span>
                              <span className="text-sm text-purple-700">{day.merchants} merchants</span>
                              <span className="font-bold text-purple-900">{day.amount}</span>
                            </div>
                          </div>
                        ))}
                        <div className="mt-4 p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                          <div className="flex justify-between items-center text-white">
                            <span className="font-bold">TOTAL FOR PERIOD</span>
                            <span className="text-2xl font-bold">${filteredWeeklyUserIncome.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        No data available for selected date range
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{mockUserData.length}</div>
                  <p className="text-xs text-blue-100 mt-1">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-600 to-green-700 border-2 border-green-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Pro Members</CardTitle>
                  <Crown className="h-4 w-4 text-yellow-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {mockUserData.filter((u) => u.plan === "Pro").length}
                  </div>
                  <p className="text-xs text-green-100 mt-1">+8% conversion rate</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-2 border-purple-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Active Merchants</CardTitle>
                  <Store className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{totalMerchants}</div>
                  <p className="text-xs text-purple-100 mt-1">Across {Object.keys(countryStats).length} countries</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500 to-yellow-600 border-2 border-amber-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">${totalMonthlyRevenue}</div>
                  <p className="text-xs text-amber-100 mt-1">+18% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Country Statistics */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Users by Country</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Country</TableHead>
                        <TableHead>Users</TableHead>
                        <TableHead>Total Unlocks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(userCountryStats).map(([country, stats]) => (
                        <TableRow key={country}>
                          <TableCell className="font-medium">{country}</TableCell>
                          <TableCell>{stats.users}</TableCell>
                          <TableCell>{stats.unlocks}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell>{totalUsers}</TableCell>
                        <TableCell>{Object.values(userCountryStats).reduce((sum, s) => sum + s.unlocks, 0)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Merchants by Country</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Country</TableHead>
                        <TableHead>Merchants</TableHead>
                        <TableHead>Monthly Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(countryStats).map(([country, stats]) => (
                        <TableRow key={country}>
                          <TableCell className="font-medium">{country}</TableCell>
                          <TableCell>{stats.merchants}</TableCell>
                          <TableCell>${stats.revenue}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell>TOTAL</TableCell>
                        <TableCell>{totalMerchants}</TableCell>
                        <TableCell>${totalMonthlyRevenue}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab (originally part of Overview) */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Transaction History</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowExportDialog(true)}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Transactions
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Showing filtered results: {filteredTransactions.length} transactions
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search transactions by merchant name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>USD Amount</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.merchantName}</TableCell>
                        <TableCell>{t.planType}</TableCell>
                        <TableCell>{t.amount}</TableCell>
                        <TableCell>{t.usdAmount}</TableCell>
                        <TableCell>{t.paymentDate}</TableCell>
                        <TableCell>{t.expiryDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              t.status === "active" ? "default" : t.status === "expired" ? "destructive" : "outline"
                            }
                          >
                            {t.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{t.paymentMethod}</TableCell>
                        <TableCell>
                          {t.receiptUrl ? (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell colSpan={3}>TOTAL ACTIVE REVENUE</TableCell>
                      <TableCell colSpan={5}>${totalRevenue.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-green-50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-black">User Directory & Subscriptions</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Users
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-black">Username</TableHead>
                      <TableHead className="text-black">Country</TableHead>
                      <TableHead className="text-black">Plan</TableHead>
                      <TableHead className="text-black">Unlocked</TableHead>
                      <TableHead className="text-black">Total Spent</TableHead>
                      <TableHead className="text-black">Daily Income</TableHead>
                      <TableHead className="text-black">Monthly Income</TableHead>
                      <TableHead className="text-black">Status</TableHead>
                      <TableHead className="text-black">Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUserData
                      .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium text-black">{user.username}</TableCell>
                          <TableCell className="text-black">{user.country}</TableCell>
                          <TableCell>
                            <Badge
                              variant={user.plan === "Pro" ? "default" : "secondary"}
                              className={user.plan === "Pro" ? "bg-green-600" : "bg-gray-400"}
                            >
                              {user.plan}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-black">{user.unlockedMerchants}</TableCell>
                          <TableCell className="text-black">{user.totalSpent}</TableCell>
                          <TableCell className="text-black font-semibold">{user.dailyIncome}</TableCell>
                          <TableCell className="text-black font-semibold">{user.monthlyIncome}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell className="text-black">{user.joinDate}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-black">User Subscription Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
                    <p className="text-sm font-medium text-black">Total Users</p>
                    <p className="text-3xl font-bold text-blue-600">{mockUserData.length}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-2 border-gray-300">
                    <p className="text-sm font-medium text-black">Ordinary Plan Users</p>
                    <p className="text-3xl font-bold text-gray-600">
                      {mockUserData.filter((u) => u.plan === "Ordinary").length}
                    </p>
                    <p className="text-sm text-black mt-1">Monthly Revenue: $0</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                    <p className="text-sm font-medium text-black">Pro Plan Users</p>
                    <p className="text-3xl font-bold text-green-600">
                      {mockUserData.filter((u) => u.plan === "Pro").length}
                    </p>
                    <p className="text-sm text-black mt-1">
                      Monthly Revenue: ${mockUserData.filter((u) => u.plan === "Pro").length * 99}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-black mb-4">User Income Breakdown</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black">Plan Type</TableHead>
                        <TableHead className="text-black">Users</TableHead>
                        <TableHead className="text-black">Daily Income</TableHead>
                        <TableHead className="text-black">Monthly Income</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-black">Ordinary Plan</TableCell>
                        <TableCell className="text-black">
                          {mockUserData.filter((u) => u.plan === "Ordinary").length}
                        </TableCell>
                        <TableCell className="text-black font-bold">
                          $
                          {mockUserData
                            .filter((u) => u.plan === "Ordinary")
                            .reduce((sum, u) => sum + Number.parseFloat(u.dailyIncome.replace("$", "")), 0)
                            .toFixed(2)}
                        </TableCell>
                        <TableCell className="text-black font-bold">$0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-black">Pro Plan</TableCell>
                        <TableCell className="text-black">
                          {mockUserData.filter((u) => u.plan === "Pro").length}
                        </TableCell>
                        <TableCell className="text-black font-bold">
                          $
                          {mockUserData
                            .filter((u) => u.plan === "Pro")
                            .reduce((sum, u) => sum + Number.parseFloat(u.dailyIncome.replace("$", "")), 0)
                            .toFixed(2)}
                        </TableCell>
                        <TableCell className="text-black font-bold">
                          ${mockUserData.filter((u) => u.plan === "Pro").length * 99}
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-blue-100 font-bold">
                        <TableCell className="text-black">TOTAL</TableCell>
                        <TableCell className="text-black">{mockUserData.length}</TableCell>
                        <TableCell className="text-black">
                          $
                          {mockUserData
                            .reduce((sum, u) => sum + Number.parseFloat(u.dailyIncome.replace("$", "")), 0)
                            .toFixed(2)}
                        </TableCell>
                        <TableCell className="text-black">
                          ${mockUserData.filter((u) => u.plan === "Pro").length * 99}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Merchants Tab */}
          <TabsContent value="merchants" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Merchant Subscriptions</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Merchants
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Monthly Fee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Unlocks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMerchantDirectory.map((merchant) => (
                      <TableRow key={merchant.id}>
                        <TableCell className="font-medium">{merchant.name}</TableCell>
                        <TableCell>{merchant.country}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{merchant.plan}</Badge>
                        </TableCell>
                        <TableCell>{merchant.monthlyFee}</TableCell>
                        <TableCell>
                          <Badge variant={merchant.status === "active" ? "default" : "destructive"}>
                            {merchant.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{merchant.views}</TableCell>
                        <TableCell>{merchant.unlocks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Income Tab */}
          <TabsContent value="income" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Daily User Income {dateRangeStart && dateRangeEnd && "(Filtered)"}</CardTitle>
                  <p className="text-sm text-muted-foreground">From merchant unlock fees</p>
                </CardHeader>
                <CardContent>
                  {filteredDailyIncome.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Unlocks</TableHead>
                          <TableHead>Merchants</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDailyIncome.map((day) => (
                          <TableRow key={day.date}>
                            <TableCell className="font-medium">{day.date}</TableCell>
                            <TableCell>{day.userUnlocks}</TableCell>
                            <TableCell>{day.merchants}</TableCell>
                            <TableCell className="font-bold">{day.amount}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>TOTAL</TableCell>
                          <TableCell>{filteredDailyIncome.reduce((sum, d) => sum + d.userUnlocks, 0)}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>${filteredWeeklyUserIncome.toFixed(2)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No income data for selected period</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Merchant Revenue</CardTitle>
                  <p className="text-sm text-muted-foreground">Recurring subscription income</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Small Merchant Plans</span>
                      <span className="text-lg font-bold">
                        $
                        {mockMerchantDirectory
                          .filter((m) => m.plan === "Small Merchant" && m.status === "active")
                          .reduce((sum, m) => sum + Number.parseFloat(m.monthlyFee.replace("$", "")), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Medium Merchant Plans</span>
                      <span className="text-lg font-bold">
                        $
                        {mockMerchantDirectory
                          .filter((m) => m.plan === "Medium Merchant" && m.status === "active")
                          .reduce((sum, m) => sum + Number.parseFloat(m.monthlyFee.replace("$", "")), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Big Merchant Plans</span>
                      <span className="text-lg font-bold">
                        $
                        {mockMerchantDirectory
                          .filter((m) => m.plan === "Big Merchant" && m.status === "active")
                          .reduce((sum, m) => sum + Number.parseFloat(m.monthlyFee.replace("$", "")), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Enterprise Plans</span>
                      <span className="text-lg font-bold">
                        $
                        {mockMerchantDirectory
                          .filter((m) => m.plan === "Enterprise Merchant" && m.status === "active")
                          .reduce((sum, m) => sum + Number.parseFloat(m.monthlyFee.replace("$", "")), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-primary/20 rounded-lg border-2 border-primary">
                      <span className="text-sm font-bold">TOTAL MONTHLY REVENUE</span>
                      <span className="text-2xl font-bold">${totalMonthlyRevenue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Directory Tab */}
          <TabsContent value="directory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle>Complete Merchant Directory</CardTitle>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Countries</option>
                    {Array.from(new Set(mockMerchantDirectory.map((m) => m.country))).map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMerchantDirectory
                      .filter((m) => selectedCountry === "all" || m.country === selectedCountry)
                      .map((merchant) => (
                        <TableRow key={merchant.id}>
                          <TableCell className="font-medium">{merchant.name}</TableCell>
                          <TableCell>{merchant.category}</TableCell>
                          <TableCell>{merchant.subcategory}</TableCell>
                          <TableCell>{merchant.country}</TableCell>
                          <TableCell>{merchant.city}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{merchant.plan}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={merchant.status === "active" ? "default" : "destructive"}>
                              {merchant.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {selectedCountry !== "all" && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">
                      Total Merchants in {selectedCountry}:{" "}
                      {mockMerchantDirectory.filter((m) => m.country === selectedCountry).length}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900">
                  <BarChart3 className="h-6 w-6" />
                  Top Performing Merchants
                </CardTitle>
                <p className="text-sm text-emerald-700">Ranked by total unlocks and engagement</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Total Unlocks</TableHead>
                      <TableHead>Monthly Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topMerchants.map((merchant, index) => (
                      <TableRow key={merchant.id}>
                        <TableCell>
                          <Badge variant={index < 3 ? "default" : "secondary"}>#{index + 1}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{merchant.businessName}</TableCell>
                        <TableCell>{merchant.category}</TableCell>
                        <TableCell>{merchant.country}</TableCell>
                        <TableCell className="font-bold text-emerald-700">{merchant.totalUnlocks}</TableCell>
                        <TableCell>{merchant.monthlyFee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <PieChart className="h-6 w-6" />
                    Category Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(categoryPerformance)
                      .sort(([, a], [, b]) => b.revenue - a.revenue)
                      .map(([category, stats]) => (
                        <div key={category} className="p-3 bg-white rounded-lg border border-blue-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-blue-900">{category}</span>
                            <Badge className="bg-blue-600">${stats.revenue}</Badge>
                          </div>
                          <div className="flex gap-4 text-xs text-blue-700">
                            <span>{stats.count} merchants</span>
                            <span>•</span>
                            <span>{stats.unlocks} total unlocks</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <CreditCard className="h-6 w-6" />
                    Payment Method Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(paymentMethods).map(([method, count]) => {
                      const percentage = ((count / mockTransactions.length) * 100).toFixed(1)
                      return (
                        <div key={method} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-purple-900">{method}</span>
                            <span className="text-sm text-purple-700">
                              {count} ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-purple-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <Target className="h-6 w-6" />
                  Merchant Retention Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-white rounded-lg border-2 border-amber-200">
                    <p className="text-sm font-medium text-amber-700">Retention Rate</p>
                    <p className="text-4xl font-bold text-amber-900">{merchantRetentionRate}%</p>
                    <p className="text-xs text-amber-600 mt-1">
                      {activeMerchants} of {totalMerchants} active
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-2 border-amber-200">
                    <p className="text-sm font-medium text-amber-700">Growth This Month</p>
                    <p className="text-4xl font-bold text-emerald-600">+12%</p>
                    <p className="text-xs text-amber-600 mt-1">8 new merchants joined</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-2 border-amber-200">
                    <p className="text-sm font-medium text-amber-700">Churn Rate</p>
                    <p className="text-4xl font-bold text-red-600">3.2%</p>
                    <p className="text-xs text-amber-600 mt-1">2 merchants left this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <LineChart className="h-6 w-6" />
                  Revenue Projections (AI-Powered)
                </CardTitle>
                <p className="text-sm text-green-700">Based on current trends and growth patterns</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-6 bg-white rounded-lg border-2 border-green-200">
                    <p className="text-sm font-medium text-green-700 mb-2">Next 30 Days Projection</p>
                    <p className="text-3xl font-bold text-green-900 mb-1">${projection.next30Days}</p>
                    <p className="text-xs text-green-600">With 15% growth: ${projection.withGrowth30}</p>
                  </div>
                  <div className="p-6 bg-white rounded-lg border-2 border-green-200">
                    <p className="text-sm font-medium text-green-700 mb-2">Next 90 Days Projection</p>
                    <p className="text-3xl font-bold text-green-900 mb-1">${projection.next90Days}</p>
                    <p className="text-xs text-green-600">With 15% growth: ${projection.withGrowth90}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-400 bg-gradient-to-br from-indigo-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-900">
                  <Calculator className="h-6 w-6" />
                  Profit Margin Calculator
                </CardTitle>
                <p className="text-sm text-indigo-700">Calculate your net profit after expenses</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="revenue" className="text-indigo-900">
                        Total Revenue (Selected Period)
                      </Label>
                      <Input
                        id="revenue"
                        value={`$${filteredWeeklyUserIncome.toFixed(2)}`}
                        disabled
                        className="font-bold bg-indigo-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expenses" className="text-indigo-900">
                        Total Expenses
                      </Label>
                      <Input
                        id="expenses"
                        type="number"
                        placeholder="Enter expenses"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={calculateProfitMargin} className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Calculate Profit Margin
                  </Button>
                  {profitMargin !== 0 && (
                    <div className="p-6 bg-white rounded-lg border-2 border-indigo-200">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-indigo-900">Net Profit</span>
                        <span className="text-3xl font-bold text-green-600">
                          ${(filteredWeeklyUserIncome - Number.parseFloat(expenseAmount || "0")).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-indigo-900">Profit Margin</span>
                        <span className={`text-3xl font-bold ${profitMargin > 0 ? "text-green-600" : "text-red-600"}`}>
                          {profitMargin.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-rose-400 bg-gradient-to-br from-rose-50 to-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-900">
                  <FileText className="h-6 w-6" />
                  Export Financial Reports
                </CardTitle>
                <p className="text-sm text-rose-700">Download detailed reports for tax and accounting</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" className="border-rose-300 hover:bg-rose-50 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export as PDF
                  </Button>
                  <Button variant="outline" className="border-rose-300 hover:bg-rose-50 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                  <Button variant="outline" className="border-rose-300 hover:bg-rose-50 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export as Excel
                  </Button>
                  <Button variant="outline" className="border-rose-300 hover:bg-rose-50 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Tax Summary Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="border-2 border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-900">
                  <Zap className="h-6 w-6" />
                  Comparison Mode
                </CardTitle>
                <p className="text-sm text-cyan-700">Compare current period with previous periods</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="comparison-period" className="text-cyan-900">
                      Compare With
                    </Label>
                    <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
                      <SelectTrigger id="comparison-period">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-week">Last Week</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="last-quarter">Last Quarter</SelectItem>
                        <SelectItem value="last-year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-white rounded-lg border-2 border-cyan-200">
                      <p className="text-sm font-medium text-cyan-700">Revenue Change</p>
                      <p className="text-3xl font-bold text-green-600">+23.5%</p>
                      <p className="text-xs text-cyan-600 mt-1">↑ $1,245.80</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border-2 border-cyan-200">
                      <p className="text-sm font-medium text-cyan-700">User Growth</p>
                      <p className="text-3xl font-bold text-green-600">+18.2%</p>
                      <p className="text-xs text-cyan-600 mt-1">↑ 127 new users</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border-2 border-cyan-200">
                      <p className="text-sm font-medium text-cyan-700">Merchant Growth</p>
                      <p className="text-3xl font-bold text-green-600">+12.0%</p>
                      <p className="text-xs text-cyan-600 mt-1">↑ 8 new merchants</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-violet-400 bg-gradient-to-br from-violet-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-violet-900">
                  <Bell className="h-6 w-6" />
                  Real-time Notifications
                </CardTitle>
                <p className="text-sm text-violet-700">Stay updated with important events</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="font-semibold text-green-900">New Payment Received</p>
                      <p className="text-sm text-green-700">Sunset Resort renewed subscription - $50.00</p>
                      <p className="text-xs text-green-600">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900">New Merchant Signup</p>
                      <p className="text-sm text-blue-700">Tokyo Sushi Bar joined as Medium Merchant</p>
                      <p className="text-xs text-blue-600">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="font-semibold text-amber-900">Renewal Reminder</p>
                      <p className="text-sm text-amber-700">5 merchants have subscriptions expiring in 7 days</p>
                      <p className="text-xs text-amber-600">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-900">Payment Failed</p>
                      <p className="text-sm text-red-700">Beach Hotel payment declined - Follow up needed</p>
                      <p className="text-xs text-red-600">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-400 bg-gradient-to-br from-teal-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-900">
                  <Mail className="h-6 w-6" />
                  Automated Email Reports
                </CardTitle>
                <p className="text-sm text-teal-700">Schedule reports to be sent to your email</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-teal-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-teal-900">Daily Revenue Summary</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <p className="text-sm text-teal-700">Sent every day at 9:00 AM to baizenamastura@gmail.com</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-teal-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-teal-900">Weekly Performance Report</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <p className="text-sm text-teal-700">Sent every Monday at 10:00 AM to baizenamastura@gmail.com</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-teal-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-teal-900">Monthly Business Insights</span>
                      <Badge variant="secondary">Inactive</Badge>
                    </div>
                    <p className="text-sm text-teal-700">
                      Sent on 1st of each month at 8:00 AM to baizenamastura@gmail.com
                    </p>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    <Bell className="mr-2 h-4 w-4" />
                    Configure Email Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Globe className="h-6 w-6" />
                  Geographic Performance Insights
                </CardTitle>
                <p className="text-sm text-orange-700">Understand your global performance</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-orange-900">Top Performing Country</p>
                        <p className="text-2xl font-bold text-orange-600">United States</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-orange-700">Revenue</p>
                        <p className="text-2xl font-bold text-green-600">$3,450</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-orange-900">Fastest Growing Market</p>
                        <p className="text-2xl font-bold text-orange-600">Japan</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-orange-700">Growth Rate</p>
                        <p className="text-2xl font-bold text-green-600">+45%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-orange-900">Emerging Opportunity</p>
                        <p className="text-2xl font-bold text-orange-600">Italy</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-orange-700">Potential</p>
                        <p className="text-2xl font-bold text-blue-600">High</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <AdminAssistantBot />
    </div>
  )
}
