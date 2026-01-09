"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Star, Award, ChevronLeft, ChevronRight } from "lucide-react"

export default function FeaturedEnterprisePartners() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const enterprisePartners = [
    {
      name: "Global Airways",
      category: "Airline Company",
      description: "International flights to 150+ destinations worldwide",
      badge: "Featured Partner",
    },
    {
      name: "Royal Hotel Chain",
      category: "5-Star Hotels",
      description: "Luxury accommodations across 50 countries",
      badge: "Premium Partner",
    },
    {
      name: "AutoWorld Motors",
      category: "Car Manufacturer",
      description: "Leading automotive brand with global presence",
      badge: "Enterprise Partner",
    },
    {
      name: "MegaCorp Logistics",
      category: "Large Logistics",
      description: "Worldwide shipping and distribution services",
      badge: "Featured Partner",
    },
    {
      name: "TechGlobal Industries",
      category: "Technology Provider",
      description: "Cutting-edge technology solutions worldwide",
      badge: "Premium Partner",
    },
  ]

  const visiblePartners = enterprisePartners.slice(currentIndex, currentIndex + 3)

  const handleNext = () => {
    if (currentIndex + 3 < enterprisePartners.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="py-8 bg-gradient-to-b from-lime-50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary">FEATURED ENTERPRISE PARTNERS</h2>
          </div>
          <p className="text-base text-black max-w-2xl mx-auto">
            Trusted by leading corporations worldwide accepting Pi payment
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Partners Grid - showing 3 on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-2 md:px-12">
            {visiblePartners.map((partner, index) => (
              <Card
                key={currentIndex + index}
                className="border-2 hover:shadow-xl transition-all"
                style={{ borderColor: "rgb(132, 204, 22)" }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className="h-6 w-6" style={{ color: "rgb(132, 204, 22)" }} />
                    <Badge className="text-xs bg-primary text-white">{partner.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <p className="text-sm text-black">{partner.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black">{partner.description}</p>
                  <div className="flex items-center gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 px-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-white shadow disabled:opacity-30 h-9 w-9 p-0"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </Button>

            <span className="text-xs text-muted-foreground">
              {currentIndex + 1}-{Math.min(currentIndex + 3, enterprisePartners.length)} of {enterprisePartners.length}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentIndex + 3 >= enterprisePartners.length}
              className="bg-white shadow disabled:opacity-30 h-9 w-9 p-0"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>

        <div
          className="border-3 rounded-lg p-6 max-w-3xl mx-auto mt-8"
          style={{
            backgroundColor: "rgb(250, 245, 255)", // Changed to very very light purple background
            borderColor: "rgb(34, 197, 94)", // Changed border to blue-green
            borderWidth: "3px", // Made border thicker
          }}
        >
          <h3 className="text-xl font-bold mb-4 text-center text-primary">Enterprise Partner Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-lime-600 font-bold">✓</span>
              <span>Access to advanced promotional opportunities inside the App</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lime-600 font-bold">✓</span>
              <span>Stronger trust and credibility</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lime-600 font-bold">✓</span>
              <span>Premium placement in search results</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lime-600 font-bold">✓</span>
              <span>Featured partner badge and visibility</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lime-600 font-bold">✓</span>
              <span>Priority customer support</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lime-600 font-bold">✓</span>
              <span>Dedicated account management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
