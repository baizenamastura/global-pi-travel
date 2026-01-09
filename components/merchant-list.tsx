"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Lock,
  Circle,
  Star,
  Navigation,
  Copy,
  Check,
  Info,
  User,
  Crown,
  Heart,
  ArrowUpDown,
  MessageSquare,
  Eye,
  ThumbsUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProUpgradeModal } from "@/components/pro-upgrade-modal"
import { ProPaymentModal } from "@/components/pro-payment-modal"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { analytics } from "@/lib/analytics" // Assuming you have an analytics utility

interface MerchantListProps {
  onBack: () => void
  category?: string
  subcategory?: string
  user?: {
    uid: string
    username: string
    accessToken: string
  }
  onUnlockSuccess?: (merchantId: number, merchantName: string) => void
}

const worldCountriesAndCities = {
  // Asia
  Philippines: ["Manila", "Cebu", "Davao", "Quezon City", "Makati", "Pasig", "Taguig", "Antipolo"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Sapporo", "Fukuoka", "Kobe"],
  China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hong Kong", "Hangzhou", "Xi'an"],
  India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"],
  Thailand: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Krabi", "Ayutthaya", "Hua Hin"],
  Singapore: ["Singapore"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Ulsan"],
  Indonesia: ["Jakarta", "Bali", "Surabaya", "Bandung", "Medan", "Yogyakarta"],
  Malaysia: ["Kuala Lumpur", "Penang", "Johor Bahru", "Malacca", "Ipoh", "Langkawi"],
  Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Nha Trang", "Hoi An", "Hue"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa", "Adana"],
  Israel: ["Tel Aviv", "Jerusalem", "Haifa", "Eilat", "Beersheba"],

  // Europe
  "United Kingdom": ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh", "Glasgow", "Bristol"],
  France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Bordeaux", "Strasbourg"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Dusseldorf"],
  Italy: ["Rome", "Milan", "Venice", "Florence", "Naples", "Turin", "Bologna"],
  Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao", "Malaga", "Granada"],
  Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen"],
  Switzerland: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lucerne"],
  Austria: ["Vienna", "Salzburg", "Innsbruck", "Graz", "Linz"],
  Belgium: ["Brussels", "Antwerp", "Ghent", "Bruges", "Liege"],
  Portugal: ["Lisbon", "Porto", "Faro", "Coimbra", "Braga"],
  Greece: ["Athens", "Thessaloniki", "Mykonos", "Santorini", "Crete"],
  Poland: ["Warsaw", "Krakow", "Wroclaw", "Gdansk", "Poznan"],
  Sweden: ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Vasteras"],
  Norway: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Tromso"],
  Denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
  Finland: ["Helsinki", "Espoo", "Tampere", "Turku", "Oulu"],
  Ireland: ["Dublin", "Cork", "Galway", "Limerick", "Waterford"],
  "Czech Republic": ["Prague", "Brno", "Ostrava", "Plzen"],
  Russia: ["Moscow", "St. Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan"],

  // Americas
  "United States": [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Francisco",
    "Miami",
    "Seattle",
    "Boston",
    "Las Vegas",
    "Washington DC",
  ],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec City", "Winnipeg"],
  Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Cancun", "Tijuana", "Playa del Carmen", "Puerto Vallarta"],
  Brazil: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte"],
  Argentina: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "Bariloche"],
  Chile: ["Santiago", "Valparaiso", "Vina del Mar", "Concepcion"],
  Colombia: ["Bogota", "Medellin", "Cali", "Cartagena", "Barranquilla"],
  Peru: ["Lima", "Cusco", "Arequipa", "Trujillo", "Machu Picchu"],
  "Costa Rica": ["San Jose", "Puerto Limon", "Alajuela", "Puntarenas"],

  // Oceania
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra"],
  "New Zealand": ["Auckland", "Wellington", "Christchurch", "Queenstown", "Rotorua"],

  // Africa
  Egypt: ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Hurghada"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"],
  Morocco: ["Casablanca", "Marrakech", "Rabat", "Fes", "Tangier"],
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
  Nigeria: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
}

const allCountries = Object.keys(worldCountriesAndCities).sort()

const mockMerchants = [
  {
    id: 1,
    name: "Grand Pi Hotel & Resort",
    category: "Hotel",
    subcategory: "Luxury",
    merchantType: "Big Merchant",
    country: "France",
    city: "Paris",
    location: "Paris, France",
    address: "15 Avenue des Champs-Élysées, 75008 Paris",
    coordinates: { lat: 48.8698, lng: 2.3078 },
    rating: 4.8,
    reviews: 245,
    description: "Luxury hotel in the heart of Paris accepting Pi for bookings",
    locked: false,
    priceRange: "luxury",
    totalReviews: 245,
    likeCount: 1250,
    viewCount: 8420,
  },
  {
    id: 2,
    name: "Pi Cafe Express",
    category: "Cafe",
    subcategory: "Modern",
    merchantType: "Small Merchant",
    country: "Japan",
    city: "Tokyo",
    location: "Tokyo, Japan",
    address: "1-1-2 Shibuya, Shibuya City, Tokyo 150-0002",
    coordinates: { lat: 35.6595, lng: 139.7004 },
    rating: 4.6,
    reviews: 128,
    description: "Modern cafe serving specialty coffee, payment in Pi welcomed",
    locked: true,
    priceRange: "budget",
    totalReviews: 128,
    likeCount: 645,
    viewCount: 3210,
  },
  {
    id: 3,
    name: "Bella Italia Pi Restaurant",
    category: "Restaurant",
    subcategory: "Authentic",
    merchantType: "Medium Merchant",
    country: "Italy",
    city: "Rome",
    location: "Rome, Italy",
    address: "Via dei Fori Imperiali, 00186 Roma RM",
    coordinates: { lat: 41.8902, lng: 12.4922 },
    rating: 4.9,
    reviews: 312,
    description: "Authentic Italian cuisine, accepting Pi cryptocurrency",
    locked: true,
    priceRange: "mid",
    totalReviews: 312,
    likeCount: 1890,
    viewCount: 9450,
  },
  {
    id: 4,
    name: "Pi Travel Tours",
    category: "Tourist Services",
    subcategory: "Guided",
    merchantType: "Medium Merchant",
    country: "United Kingdom",
    city: "London",
    location: "London, UK",
    address: "Westminster Bridge Rd, Lambeth, London SE1 7PB",
    coordinates: { lat: 51.5007, lng: -0.1246 },
    rating: 4.7,
    reviews: 189,
    description: "Guided city tours and experiences, pay with Pi",
    locked: false,
    priceRange: "mid",
    totalReviews: 189,
    likeCount: 987,
    viewCount: 5670,
  },
  {
    id: 5,
    name: "Pi Fashion Boutique",
    category: "Shop",
    subcategory: "Trendy",
    merchantType: "Small Merchant",
    country: "United States",
    city: "New York",
    location: "New York, USA",
    address: "5th Avenue, New York, NY 10022",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    rating: 4.5,
    reviews: 156,
    description: "Trendy fashion boutique accepting Pi payments",
    locked: true,
    priceRange: "mid",
    totalReviews: 156,
    likeCount: 734,
    viewCount: 4320,
  },
  {
    id: 6,
    name: "Sydney Pi Beach Resort",
    category: "Hotel",
    subcategory: "Beach",
    merchantType: "Big Merchant",
    country: "Australia",
    city: "Sydney",
    location: "Sydney, Australia",
    address: "1 Bondi Beach, Sydney NSW 2026",
    coordinates: { lat: -33.8915, lng: 151.2767 },
    rating: 4.7,
    reviews: 198,
    description: "Beachfront resort accepting Pi cryptocurrency",
    locked: true,
    priceRange: "luxury",
    totalReviews: 198,
    likeCount: 1456,
    viewCount: 7890,
  },
  {
    id: 7,
    name: "Manila Pi Restaurant",
    category: "Restaurant",
    subcategory: "Filipino",
    merchantType: "Medium Merchant",
    country: "Philippines",
    city: "Manila",
    location: "Manila, Philippines",
    address: "Makati Avenue, Makati City 1200",
    coordinates: { lat: 14.5547, lng: 121.0244 },
    rating: 4.6,
    reviews: 142,
    description: "Authentic Filipino cuisine, Pi payments accepted",
    locked: true,
    priceRange: "budget",
    totalReviews: 142,
    likeCount: 823,
    viewCount: 4560,
  },
  {
    id: 8,
    name: "Dubai Pi Mall",
    category: "Shop",
    subcategory: "Shopping",
    merchantType: "Enterprise Merchant",
    country: "United Arab Emirates",
    city: "Dubai",
    location: "Dubai, UAE",
    address: "Sheikh Zayed Road, Dubai",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    rating: 4.9,
    reviews: 567,
    description: "Luxury shopping destination accepting Pi",
    locked: false,
    priceRange: "luxury",
    totalReviews: 567,
    likeCount: 3240,
    viewCount: 15670,
  },
  {
    id: 9,
    name: "Singapore Pi Hotel",
    category: "Hotel",
    subcategory: "Luxury",
    merchantType: "Big Merchant",
    country: "Singapore",
    city: "Singapore",
    location: "Singapore",
    address: "Marina Bay, Singapore 018956",
    coordinates: { lat: 1.2868, lng: 103.8545 },
    rating: 4.8,
    reviews: 423,
    description: "5-star hotel in Marina Bay accepting Pi",
    locked: true,
    priceRange: "luxury",
    totalReviews: 423,
    likeCount: 2345,
    viewCount: 12340,
  },
  {
    id: 10,
    name: "Bangkok Pi Street Food",
    category: "Restaurant",
    subcategory: "Street Food",
    merchantType: "Small Merchant",
    country: "Thailand",
    city: "Bangkok",
    location: "Bangkok, Thailand",
    address: "Khao San Road, Bangkok 10200",
    coordinates: { lat: 13.7563, lng: 100.5018 },
    rating: 4.4,
    reviews: 89,
    description: "Authentic Thai street food, pay with Pi",
    locked: true,
    priceRange: "budget",
    totalReviews: 89,
    likeCount: 567,
    viewCount: 2890,
  },
  {
    id: 11,
    name: "Berlin Pi Cafe",
    category: "Cafe",
    subcategory: "Artisan",
    merchantType: "Small Merchant",
    country: "Germany",
    city: "Berlin",
    location: "Berlin, Germany",
    address: "Alexanderplatz, 10178 Berlin",
    coordinates: { lat: 52.52, lng: 13.405 },
    rating: 4.5,
    reviews: 167,
    description: "Artisan coffee shop accepting Pi cryptocurrency",
    locked: false,
    priceRange: "mid",
    totalReviews: 167,
    likeCount: 892,
    viewCount: 5120,
  },
  {
    id: 12,
    name: "Barcelona Pi Tours",
    category: "Tourist Services",
    subcategory: "City Tours",
    merchantType: "Medium Merchant",
    country: "Spain",
    city: "Barcelona",
    location: "Barcelona, Spain",
    address: "La Rambla, 08002 Barcelona",
    coordinates: { lat: 41.3851, lng: 2.1734 },
    rating: 4.7,
    reviews: 234,
    description: "Guided tours of Barcelona, Pi payments welcome",
    locked: true,
    priceRange: "mid",
    totalReviews: 234,
    likeCount: 1123,
    viewCount: 6780,
  },
  {
    id: 13,
    name: "Toronto Pi Hotel",
    category: "Hotel",
    subcategory: "Downtown",
    merchantType: "Big Merchant",
    country: "Canada",
    city: "Toronto",
    location: "Toronto, Canada",
    address: "301 Front St W, Toronto, ON M5V 2T6",
    coordinates: { lat: 43.6426, lng: -79.3871 },
    rating: 4.6,
    reviews: 312,
    description: "Downtown hotel accepting Pi for all bookings",
    locked: true,
    priceRange: "mid",
    totalReviews: 312,
    likeCount: 1678,
    viewCount: 8900,
  },
  {
    id: 14,
    name: "Mexico City Pi Restaurant",
    category: "Restaurant",
    subcategory: "Mexican",
    merchantType: "Medium Merchant",
    country: "Mexico",
    city: "Mexico City",
    location: "Mexico City, Mexico",
    address: "Paseo de la Reforma, 06600 CDMX",
    coordinates: { lat: 19.4326, lng: -99.1332 },
    rating: 4.8,
    reviews: 201,
    description: "Traditional Mexican cuisine, Pi payments accepted",
    locked: false,
    priceRange: "budget",
    totalReviews: 201,
    likeCount: 1034,
    viewCount: 6230,
  },
  {
    id: 15,
    name: "Rio Pi Beach Club",
    category: "Tourist Services",
    subcategory: "Beach",
    merchantType: "Medium Merchant",
    country: "Brazil",
    city: "Rio de Janeiro",
    location: "Rio de Janeiro, Brazil",
    address: "Copacabana Beach, Rio de Janeiro",
    coordinates: { lat: -22.9068, lng: -43.1729 },
    rating: 4.5,
    reviews: 178,
    description: "Beach club and water sports, accepting Pi",
    locked: true,
    priceRange: "mid",
    totalReviews: 178,
    likeCount: 945,
    viewCount: 5670,
  },
  {
    id: 16,
    name: "Cairo Pi Tours",
    category: "Tourist Services",
    subcategory: "Historical",
    merchantType: "Medium Merchant",
    country: "Egypt",
    city: "Cairo",
    location: "Cairo, Egypt",
    address: "Giza Pyramid Complex, Giza",
    coordinates: { lat: 30.0444, lng: 31.2357 },
    rating: 4.9,
    reviews: 445,
    description: "Pyramid tours and Egyptian adventures, Pi accepted",
    locked: true,
    priceRange: "mid",
    totalReviews: 445,
    likeCount: 2567,
    viewCount: 13450,
  },
  {
    id: 17,
    name: "Seoul Pi Fashion",
    category: "Shop",
    subcategory: "Fashion",
    merchantType: "Medium Merchant",
    country: "South Korea",
    city: "Seoul",
    location: "Seoul, South Korea",
    address: "Gangnam-gu, Seoul 06011",
    coordinates: { lat: 37.5665, lng: 126.978 },
    rating: 4.7,
    reviews: 289,
    description: "K-fashion boutique accepting Pi cryptocurrency",
    locked: false,
    priceRange: "mid",
    totalReviews: 289,
    likeCount: 1789,
    viewCount: 8760,
  },
  {
    id: 18,
    name: "Mumbai Pi Spice Market",
    category: "Shop",
    subcategory: "Market",
    merchantType: "Small Merchant",
    country: "India",
    city: "Mumbai",
    location: "Mumbai, India",
    address: "Crawford Market, Mumbai 400001",
    coordinates: { lat: 19.076, lng: 72.8777 },
    rating: 4.4,
    reviews: 156,
    description: "Authentic spices and goods, Pi payments welcome",
    locked: true,
    priceRange: "budget",
    totalReviews: 156,
    likeCount: 678,
    viewCount: 3890,
  },
  {
    id: 19,
    name: "Amsterdam Pi Canal Tours",
    category: "Tourist Services",
    subcategory: "Boat Tours",
    merchantType: "Medium Merchant",
    country: "Netherlands",
    city: "Amsterdam",
    location: "Amsterdam, Netherlands",
    address: "Damrak 26, 1012 LJ Amsterdam",
    coordinates: { lat: 52.3676, lng: 4.9041 },
    rating: 4.8,
    reviews: 367,
    description: "Canal boat tours, accepting Pi cryptocurrency",
    locked: true,
    priceRange: "mid",
    totalReviews: 367,
    likeCount: 1987,
    viewCount: 10230,
  },
  {
    id: 20,
    name: "Istanbul Pi Restaurant",
    category: "Restaurant",
    subcategory: "Turkish",
    merchantType: "Medium Merchant",
    country: "Turkey",
    city: "Istanbul",
    location: "Istanbul, Turkey",
    address: "Sultanahmet Square, Istanbul 34122",
    coordinates: { lat: 41.0082, lng: 28.9784 },
    rating: 4.6,
    reviews: 223,
    description: "Traditional Turkish cuisine, Pi payments accepted",
    locked: false,
    priceRange: "mid",
    totalReviews: 223,
    likeCount: 1234,
    viewCount: 7120,
  },
]

const PI_WALLET_ADDRESS = "GDV4XJJL6DH4G7LAO25DUFW4AEXLRNGZEYHH254NTCRO7MLKT5DIULYO"
const ACCESS_FEE_PI = "0.00000159 Pi"
const ACCESS_FEE_USD = "$0.50"
const PRO_PRICE_PI = "0.0000318 Pi"
const PRO_PRICE_USD = "$9.99/month"

export function MerchantList({ onBack, category, subcategory, user, onUnlockSuccess }: MerchantListProps) {
  const [unlockedMerchants, setUnlockedMerchants] = useState<number[]>(() => {
    if (!user) return []
    const stored = localStorage.getItem(`unlocked_${user.uid}`)
    return stored ? JSON.parse(stored) : []
  })
  const [showUnlockPayment, setShowUnlockPayment] = useState<number | null>(null)
  const [hasPaid, setHasPaid] = useState(false)
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null)
  const [copied, setCopied] = useState(false)
  const [showProUpgrade, setShowProUpgrade] = useState<number | null>(null)
  const [showProPayment, setShowProPayment] = useState(false)
  const [isProMember, setIsProMember] = useState<boolean>(() => {
    if (!user) return false
    return localStorage.getItem(`pro_member_${user.uid}`) === "true"
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [priceFilter, setPriceFilter] = useState<"all" | "budget" | "mid" | "luxury">("all")
  const [ratingFilter, setRatingFilter] = useState<number>(0)
  const [selectedCountry, setSelectedCountry] = useState<string>("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [merchantTypeFilter, setMerchantTypeFilter] = useState<string>("all")
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (!user) return []
    const stored = localStorage.getItem(`favorites_${user.uid}`)
    return stored ? JSON.parse(stored) : []
  })
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name" | "newest">("rating")
  const [showReviewModal, setShowReviewModal] = useState<number | null>(null)
  const [userReview, setUserReview] = useState({ rating: 5, comment: "" })
  const [showReviewsModal, setShowReviewsModal] = useState<number | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const [userLikes, setUserLikes] = useState<number[]>(() => {
    if (!user) return []
    const stored = localStorage.getItem(`likes_${user.uid}`)
    return stored ? JSON.parse(stored) : []
  })

  const [merchantMetrics, setMerchantMetrics] = useState<Record<number, { likeCount: number; viewCount: number }>>(
    () => {
      const stored = localStorage.getItem("globalMerchantMetrics")
      if (stored) {
        return JSON.parse(stored)
      }
      // Initialize with default values from mockMerchants
      const initial: Record<number, { likeCount: number; viewCount: number }> = {}
      mockMerchants.forEach((m) => {
        initial[m.id] = { likeCount: m.likeCount, viewCount: m.viewCount }
      })
      return initial
    },
  )

  // Moved trackView to the top level to fix the lint error
  const trackView = (merchantId: number) => {
    const sessionKey = `viewed_${merchantId}_session`
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "true")
      const updated = { ...merchantMetrics }
      if (!updated[merchantId]) {
        updated[merchantId] = { likeCount: 0, viewCount: 0 }
      }
      updated[merchantId].viewCount++
      setMerchantMetrics(updated)
      localStorage.setItem("globalMerchantMetrics", JSON.stringify(updated))
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(PI_WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUnlockClick = (merchantId: number) => {
    if (!isProMember) {
      setShowProUpgrade(merchantId)
    } else {
      const newUnlocked = [...unlockedMerchants, merchantId]
      setUnlockedMerchants(newUnlocked)
      localStorage.setItem(`unlocked_${user.uid}`, JSON.stringify(newUnlocked))

      const merchant = mockMerchants.find((m) => m.id === merchantId)
      if (merchant && onUnlockSuccess) {
        onUnlockSuccess(merchant.id, merchant.name)
      }
    }
  }

  const handleProUpgrade = () => {
    setShowProUpgrade(null)
    setShowProPayment(true)
  }

  const handleProPaymentSuccess = () => {
    setIsProMember(true)
    setShowProPayment(false)
  }

  const handlePayPerUnlock = () => {
    if (showProUpgrade) {
      setShowUnlockPayment(showProUpgrade)
      setShowProUpgrade(null)
    }
  }

  const handleSubmitUnlock = () => {
    const merchantId = showUnlockPayment
    if (merchantId && paymentReceipt) {
      const newUnlocked = [...unlockedMerchants, merchantId]
      setUnlockedMerchants(newUnlocked)
      localStorage.setItem(`unlocked_${user.uid}`, JSON.stringify(newUnlocked))

      const merchant = mockMerchants.find((m) => m.id === merchantId)
      if (merchant && onUnlockSuccess) {
        onUnlockSuccess(merchant.id, merchant.name)
      }

      setShowUnlockPayment(null)
      setHasPaid(false)
      setPaymentReceipt(null)
    }
  }

  const getDirectionsLink = (merchant: (typeof mockMerchants)[0]) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${merchant.coordinates.lat},${merchant.coordinates.lng}`
  }

  const getMapEmbedUrl = (merchant: (typeof mockMerchants)[0]) => {
    return `https://maps.google.com/maps?q=${merchant.coordinates.lat},${merchant.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  }

  const getPaymentLink = () => {
    return `https://wallet.pi/pay?address=${PI_WALLET_ADDRESS}&amount=0.00000159&memo=Unlock Merchant Details`
  }

  const toggleFavorite = (merchantId: number) => {
    if (!user) return
    const newFavorites = favorites.includes(merchantId)
      ? favorites.filter((id) => id !== merchantId)
      : [...favorites, merchantId]
    setFavorites(newFavorites)
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites))
  }

  const toggleLike = (merchantId: number) => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    const hasLiked = userLikes.includes(merchantId)
    const newUserLikes = hasLiked ? userLikes.filter((id) => id !== merchantId) : [...userLikes, merchantId]

    setUserLikes(newUserLikes)
    localStorage.setItem(`likes_${user.uid}`, JSON.stringify(newUserLikes))

    // Update global metrics
    const updated = { ...merchantMetrics }
    if (!updated[merchantId]) {
      updated[merchantId] = { likeCount: 0, viewCount: 0 }
    }
    updated[merchantId].likeCount += hasLiked ? -1 : 1
    setMerchantMetrics(updated)
    localStorage.setItem("globalMerchantMetrics", JSON.stringify(updated))

    analytics.trackEvent("engagement", hasLiked ? "unlike" : "like", `merchant_${merchantId}`)
  }

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"
    }
    return count.toString()
  }

  const submitReview = (merchantId: number) => {
    if (!user) return
    const reviews = localStorage.getItem(`reviews_${merchantId}`) || "[]"
    const parsed = JSON.parse(reviews)
    parsed.push({
      user: user.username,
      rating: userReview.rating,
      comment: userReview.comment,
      date: new Date().toLocaleDateString(),
    })
    localStorage.setItem(`reviews_${merchantId}`, JSON.stringify(parsed))
    setShowReviewModal(null)
    setUserReview({ rating: 5, comment: "" })
  }

  const getMerchantReviews = (merchantId: number) => {
    const reviews = localStorage.getItem(`reviews_${merchantId}`)
    return reviews ? JSON.parse(reviews) : []
  }

  const availableCountries = useMemo(() => {
    const countries = [...new Set(mockMerchants.map((m) => m.country))].sort()
    return countries
  }, [])

  const availableCities = useMemo(() => {
    if (selectedCountry === "all") {
      return [...new Set(mockMerchants.map((m) => m.city))].sort()
    }
    return [...new Set(mockMerchants.filter((m) => m.country === selectedCountry).map((m) => m.city))].sort()
  }, [selectedCountry])

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setSelectedCity("all")
  }

  const filteredMerchants = useMemo(() => {
    const filtered = mockMerchants.filter((merchant) => {
      if (category && merchant.category !== category) return false
      if (subcategory && merchant.subcategory !== subcategory) return false
      if (selectedCountry !== "all" && merchant.country !== selectedCountry) return false
      if (selectedCity !== "all" && merchant.city !== selectedCity) return false
      if (merchantTypeFilter !== "all" && merchant.merchantType !== merchantTypeFilter) return false
      if (priceFilter !== "all" && merchant.priceRange !== priceFilter) return false
      if (showFavoritesOnly && !favorites.includes(merchant.id)) return false
      if (
        searchQuery &&
        !merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !merchant.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false
      if (ratingFilter > 0 && merchant.rating < ratingFilter) return false
      return true
    })

    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.totalReviews - a.totalReviews)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    return filtered
  }, [
    category,
    subcategory,
    selectedCountry,
    selectedCity,
    merchantTypeFilter,
    priceFilter,
    searchQuery,
    ratingFilter,
    sortBy,
    showFavoritesOnly,
    favorites,
  ])

  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(240, 253, 244)" }}>
      {showProUpgrade && (
        <ProUpgradeModal
          onClose={() => setShowProUpgrade(null)}
          onUpgrade={handleProUpgrade}
          onPayPerUnlock={handlePayPerUnlock}
          merchantName={mockMerchants.find((m) => m.id === showProUpgrade)?.name || ""}
        />
      )}

      {showProPayment && user && (
        <ProPaymentModal onClose={() => setShowProPayment(false)} onSuccess={handleProPaymentSuccess} user={user} />
      )}

      {showReviewModal && user && (
        <Dialog open={!!showReviewModal} onOpenChange={() => setShowReviewModal(null)}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle style={{ color: "rgb(21, 128, 61)" }}>
                Leave a Review for {mockMerchants.find((m) => m.id === showReviewModal)?.name}
              </DialogTitle>
              <DialogDescription>Share your experience with this merchant</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label style={{ color: "rgb(21, 128, 61)" }}>Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer ${
                        star <= userReview.rating ? "text-amber-500 fill-amber-500" : "text-gray-800"
                      }`}
                      onClick={() => setUserReview({ ...userReview, rating: star })}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label style={{ color: "rgb(21, 128, 61)" }}>Your Review</Label>
                <Textarea
                  placeholder="Tell us about your experience..."
                  value={userReview.comment}
                  onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setShowReviewModal(null)}
                variant="outline"
                style={{ borderColor: "rgb(21, 128, 61)", color: "rgb(21, 128, 61)" }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => submitReview(showReviewModal)}
                style={{ backgroundColor: "rgb(21, 128, 61)", color: "white" }}
                disabled={!userReview.comment.trim()}
              >
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showReviewsModal && (
        <Dialog open={!!showReviewsModal} onOpenChange={() => setShowReviewsModal(null)}>
          <DialogContent className="bg-white max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle style={{ color: "rgb(21, 128, 61)" }}>
                Reviews for {mockMerchants.find((m) => m.id === showReviewsModal)?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {getMerchantReviews(showReviewsModal).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No reviews yet. Be the first to leave a review!
                </p>
              ) : (
                getMerchantReviews(showReviewsModal).map((review: any, index: number) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg" style={{ color: "rgb(21, 128, 61)" }}>
                            {review.user}
                          </CardTitle>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "text-amber-500 fill-amber-500" : "text-gray-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm" style={{ color: "rgb(21, 128, 61)" }}>
                        {review.comment}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Header */}
      <div className="bg-gradient-to-b from-blue-100 to-transparent">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-sm"
              style={{ color: "rgb(0, 102, 204)", fontWeight: "bold" }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {user && (
              <div className="flex items-center gap-2">
                {isProMember && (
                  <Badge style={{ backgroundColor: "rgb(0, 102, 204)", color: "white" }}>
                    <Crown className="mr-1 h-3 w-3" />
                    Pro
                  </Badge>
                )}
                <Badge variant="outline" style={{ borderColor: "rgb(0, 102, 204)", color: "rgb(0, 102, 204)" }}>
                  <User className="mr-1 h-3 w-3" />
                  {user.username}
                </Badge>
              </div>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-4" style={{ color: "rgb(0, 102, 204)" }}>
            Pi-Accepting Merchants
          </h1>
          <p className="mt-2" style={{ color: "rgb(0, 153, 255)", fontWeight: "600" }}>
            Browse businesses worldwide that accept Pi
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6" style={{ backgroundColor: "rgb(240, 248, 255)" }}>
        {!user && (
          <Alert
            className="mb-6 border-2"
            style={{ backgroundColor: "rgb(224, 242, 254)", borderColor: "rgb(0, 153, 255)" }}
          >
            <Lock className="h-4 w-4" style={{ color: "rgb(12, 74, 110)" }} />
            <AlertTitle style={{ color: "rgb(12, 74, 110)", fontWeight: "bold" }}>Login Required</AlertTitle>
            <AlertDescription style={{ color: "rgb(12, 74, 110)" }}>
              Please login with your Pi Network account to unlock merchant details and track your transactions.
            </AlertDescription>
          </Alert>
        )}

        {user && !isProMember && (
          <Alert
            className="mb-6 border-2"
            style={{ backgroundColor: "rgb(191, 219, 254)", borderColor: "rgb(0, 153, 255)" }}
          >
            <Crown className="h-4 w-4" style={{ color: "rgb(0, 102, 204)" }} />
            <AlertTitle style={{ color: "rgb(0, 102, 204)", fontWeight: "bold" }}>
              Upgrade to Pro for Unlimited Access
            </AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span style={{ color: "rgb(0, 102, 204)" }}>
                Get unlimited merchant unlocks for just {PRO_PRICE_USD} ({PRO_PRICE_PI})
              </span>
              <Button
                size="sm"
                onClick={() => setShowProPayment(true)}
                style={{ backgroundColor: "rgb(0, 102, 204)", color: "white" }}
                className="ml-2"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Now
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {!isProMember && (
          <Alert
            className="mb-6 border-2"
            style={{ backgroundColor: "rgb(224, 242, 254)", borderColor: "rgb(0, 153, 255)" }}
          >
            <Lock className="h-4 w-4" style={{ color: "rgb(12, 74, 110)" }} />
            <AlertTitle style={{ color: "rgb(12, 74, 110)", fontWeight: "bold" }}>Unlock Business Details</AlertTitle>
            <AlertDescription style={{ color: "rgb(12, 74, 110)" }}>
              Pay {ACCESS_FEE_USD} ({ACCESS_FEE_PI}) one-time fee per merchant to unlock full contact information.
              Access is permanent and tied to your Pi account forever.
            </AlertDescription>
          </Alert>
        )}

        {isProMember && (
          <Alert
            className="mb-6 border-2"
            style={{ backgroundColor: "rgb(191, 219, 254)", borderColor: "rgb(0, 153, 255)" }}
          >
            <Crown className="h-4 w-4" style={{ color: "rgb(0, 102, 204)" }} />
            <AlertTitle style={{ color: "rgb(0, 102, 204)", fontWeight: "bold" }}>
              Pro Member - Unlimited Access
            </AlertTitle>
            <AlertDescription style={{ color: "rgb(0, 102, 204)" }}>
              You have unlimited access to all merchant contact details. Click any "Unlock" button to view details
              instantly!
            </AlertDescription>
          </Alert>
        )}

        <Card
          className="mb-6"
          style={{
            backgroundColor: "rgb(0, 102, 204)",
            borderColor: "rgb(0, 153, 255)",
            borderWidth: "18px",
            borderStyle: "solid",
          }}
        >
          <CardContent className="pt-4 pb-4 px-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label className="text-white font-semibold">Country</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="mt-2 bg-white">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="all">All Countries</SelectItem>
                    {allCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white font-semibold">City</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="mt-2 bg-white">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="all">All Cities</SelectItem>
                    {selectedCountry === "all"
                      ? Object.values(worldCountriesAndCities)
                          .flat()
                          .sort()
                          .map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))
                      : worldCountriesAndCities[selectedCountry]?.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white font-semibold">Search Merchants</Label>
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-2 bg-white"
                  style={{ color: "rgb(21, 128, 61)" }}
                />
              </div>

              <div>
                <Label className="text-white font-semibold">Merchant Type</Label>
                <select
                  value={merchantTypeFilter}
                  onChange={(e) => setMerchantTypeFilter(e.target.value)}
                  className="w-full mt-2 p-2 rounded-md border"
                  style={{ color: "rgb(21, 128, 61)", fontWeight: "600" }}
                >
                  <option value="all">All Types</option>
                  <option value="Individual Merchant">Individual Merchant</option>
                  <option value="Small Merchant">Small Merchant</option>
                  <option value="Medium Merchant">Medium Merchant</option>
                  <option value="Big Merchant">Big Merchant</option>
                  <option value="Enterprise Merchant">Enterprise Merchant</option>
                </select>
              </div>

              <div>
                <Label className="text-white font-semibold">Min Rating</Label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(Number(e.target.value))}
                  className="w-full mt-2 p-2 rounded-md border"
                  style={{ color: "rgb(21, 128, 61)", fontWeight: "600" }}
                >
                  <option value={0}>All Ratings</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>

              <div>
                <Label className="text-white font-semibold">Price Range</Label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value as any)}
                  className="w-full mt-2 p-2 rounded-md border"
                  style={{ color: "rgb(21, 128, 61)", fontWeight: "600" }}
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget ($)</option>
                  <option value="mid">Mid-Range ($$)</option>
                  <option value="luxury">Luxury ($$$)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" style={{ color: "rgb(0, 102, 204)" }} />
            <Label style={{ color: "rgb(0, 102, 204)", fontWeight: "bold" }}>Sort By:</Label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-2 rounded-md border"
              style={{ color: "rgb(0, 102, 204)", fontWeight: "600" }}
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Popular</option>
              <option value="name">Name (A-Z)</option>
              <option value="newest">Newest Listings</option>
            </select>
          </div>

          {user && favorites.length > 0 && (
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              style={
                showFavoritesOnly
                  ? { backgroundColor: "#f59e0b", color: "white" }
                  : { borderColor: "#f59e0b", color: "#f59e0b" }
              }
            >
              <Heart className={`mr-2 h-4 w-4 ${showFavoritesOnly ? "fill-white" : ""}`} />
              {showFavoritesOnly ? "Show All" : `My Favorites (${favorites.length})`}
            </Button>
          )}
        </div>

        {/* Merchant Cards */}
        <div className="grid gap-6">
          {filteredMerchants.length === 0 ? (
            <Card style={{ backgroundColor: "white" }}>
              <CardContent className="py-12 text-center">
                <p className="text-lg" style={{ color: "rgb(21, 128, 61)", fontWeight: "600" }}>
                  No merchants found matching your filters
                </p>
                <p className="text-sm mt-2" style={{ color: "#1e40af" }}>
                  Try adjusting your search criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMerchants.map((merchant) => {
              const isUnlocked = unlockedMerchants.includes(merchant.id) || isProMember
              const isFavorite = favorites.includes(merchant.id)
              const merchantReviews = getMerchantReviews(merchant.id)
              const currentMetrics = merchantMetrics[merchant.id] || {
                likeCount: merchant.likeCount,
                viewCount: merchant.viewCount,
              }
              const hasLiked = userLikes.includes(merchant.id)

              return (
                <Card key={merchant.id} className="overflow-hidden" style={{ backgroundColor: "white" }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg" style={{ color: "rgb(21, 128, 61)" }}>
                            {merchant.name}
                          </CardTitle>
                          {user && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(merchant.id)}
                              className="p-0 h-auto"
                            >
                              <Heart
                                className={`h-5 w-5 ${isFavorite ? "fill-amber-500 text-amber-500" : "text-gray-400"}`}
                              />
                            </Button>
                          )}
                          {isUnlocked && (
                            <Badge variant="outline" className="bg-green-700 text-white border-green-800">
                              Unlocked
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                            <Eye className="h-3.5 w-3.5 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-600">
                              {formatCount(currentMetrics.viewCount)} views
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(merchant.id)}
                            className="p-0 h-auto flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md hover:bg-red-100 transition-colors"
                          >
                            <ThumbsUp
                              className={`h-3.5 w-3.5 ${hasLiked ? "fill-red-500 text-red-500" : "text-red-400"}`}
                            />
                            <span className={`text-xs font-semibold ${hasLiked ? "text-red-600" : "text-red-500"}`}>
                              {formatCount(currentMetrics.likeCount)}
                            </span>
                          </Button>
                        </div>

                        <div className="flex items-center gap-4 text-sm" style={{ color: "#1e40af" }}>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{merchant.location}</span>
                          </div>
                          <Badge style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>{merchant.category}</Badge>
                          {merchant.merchantType && (
                            <Badge style={{ backgroundColor: "#f3e8ff", color: "#6b21a8" }}>
                              {merchant.merchantType}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>
                        <Circle className="h-3 w-3 mr-1" style={{ fill: "#1e40af" }} />
                        Pi
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-black" style={{ color: "rgb(21, 128, 61)" }}>
                        {merchant.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= merchant.rating
                                  ? "text-amber-500 fill-amber-500"
                                  : star <= Math.ceil(merchant.rating)
                                    ? "text-amber-500"
                                    : "text-gray-800"
                              }`}
                            />
                          ))}
                          <span className="text-sm font-semibold ml-1" style={{ color: "rgb(21, 128, 61)" }}>
                            {merchant.rating}
                          </span>
                          <span className="text-xs text-black ml-1">({merchant.reviews})</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowReviewsModal(merchant.id)}
                          style={{ color: "#1e40af" }}
                        >
                          <MessageSquare className="mr-1 h-3 w-3" />
                          {merchant.totalReviews + merchantReviews.length} reviews
                        </Button>
                      </div>

                      {isUnlocked && user && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowReviewModal(merchant.id)}
                          style={{ borderColor: "rgb(21, 128, 61)", color: "rgb(21, 128, 61)" }}
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Leave a Review
                        </Button>
                      )}

                      {isUnlocked ? (
                        <div className="space-y-3 bg-green-50 p-4 rounded-lg border-2 border-green-200">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" style={{ color: "rgb(21, 128, 61)" }} />
                            <span className="text-sm font-semibold" style={{ color: "rgb(21, 128, 61)" }}>
                              +1 555-0123
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" style={{ color: "rgb(21, 128, 61)" }} />
                            <span className="text-sm" style={{ color: "rgb(21, 128, 61)" }}>
                              contact@merchant.com
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" style={{ color: "rgb(21, 128, 61)" }} />
                            <span className="text-sm" style={{ color: "rgb(21, 128, 61)" }}>
                              WhatsApp: +1 555-0123
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" style={{ color: "rgb(21, 128, 61)" }} />
                            <span className="text-sm" style={{ color: "rgb(21, 128, 61)" }}>
                              {merchant.address}
                            </span>
                          </div>

                          <Button
                            className="w-full"
                            onClick={() => window.open(getDirectionsLink(merchant), "_blank")}
                            style={{ backgroundColor: "rgb(21, 128, 61)", color: "white" }}
                          >
                            <Navigation className="mr-2 h-4 w-4" />
                            Get Directions
                          </Button>

                          <div
                            className="mt-4 rounded-lg overflow-hidden border-2"
                            style={{ borderColor: "rgb(21, 128, 61)" }}
                          >
                            <iframe
                              width="100%"
                              height="200"
                              frameBorder="0"
                              scrolling="no"
                              marginHeight={0}
                              marginWidth={0}
                              src={getMapEmbedUrl(merchant)}
                              title="Merchant Location"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                            <span className="text-sm">Contact details locked</span>
                          </div>
                          {/* CHANGE: Changed text color to dark blue for better visibility on neon blue background */}
                          <Button
                            className="w-full text-sm font-bold uppercase"
                            style={{ backgroundColor: "rgb(0, 153, 255)", color: "#1e3a8a" }}
                            onClick={() => handleUnlockClick(merchant.id)}
                            disabled={!user}
                          >
                            {user
                              ? isProMember
                                ? "UNLOCK (PRO ACCESS)"
                                : `UNLOCK FOR ${ACCESS_FEE_USD}`
                              : "LOGIN TO UNLOCK"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Payment Modal */}
        {showUnlockPayment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full bg-white">
              <CardHeader>
                <CardTitle style={{ color: "rgb(21, 128, 61)" }}>Complete Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm" style={{ color: "#1e40af" }}>
                    Amount: {ACCESS_FEE_USD} ({ACCESS_FEE_PI})
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: "rgb(21, 128, 61)", fontWeight: "600" }}>Pi Wallet Address:</span>
                    <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="p-0 h-auto">
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" style={{ color: "#1e40af" }} />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs break-all font-mono bg-muted p-2 rounded" style={{ color: "rgb(21, 128, 61)" }}>
                    {PI_WALLET_ADDRESS}
                  </p>
                </div>

                <Alert style={{ backgroundColor: "#dbeafe", borderColor: "#1e40af" }}>
                  <Info className="h-4 w-4" style={{ color: "#1e40af" }} />
                  <AlertDescription style={{ color: "#1e40af" }}>
                    After sending Pi, please upload your payment receipt/screenshot
                  </AlertDescription>
                </Alert>

                <Button
                  className="w-full"
                  onClick={() => window.open(getPaymentLink(), "_blank")}
                  style={{ backgroundColor: "#1e40af", color: "white" }}
                >
                  Open Pi Wallet to Pay
                </Button>

                <div className="space-y-2">
                  <Label style={{ color: "rgb(21, 128, 61)" }}>Upload Payment Receipt</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPaymentReceipt(e.target.files?.[0] || null)}
                    style={{ borderColor: "rgb(21, 128, 61)" }}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowUnlockPayment(null)}
                    style={{ borderColor: "rgb(21, 128, 61)", color: "rgb(21, 128, 61)" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSubmitUnlock}
                    disabled={!paymentReceipt}
                    style={{ backgroundColor: "rgb(21, 128, 61)", color: "white" }}
                  >
                    Confirm & Unlock
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please login with your Pi Network account to like merchants and interact with the community.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowLoginPrompt(false)
                onBack()
              }}
              className="bg-primary"
            >
              Go to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
