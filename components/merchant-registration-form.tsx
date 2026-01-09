"use client"

import type React from "react"
import { Crown } from "lucide-react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

interface MerchantRegistrationFormProps {
  onBack: () => void
  onSubmit: () => void
}

export function MerchantRegistrationForm({ onBack, onSubmit }: MerchantRegistrationFormProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    merchantType: "",
    phone: "",
    email: "",
    description: "",
    address: "",
    hours: "",
    services: "",
    featuredListing: false,
  })
  const [logo, setLogo] = useState<File | null>(null)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-gradient-to-b from-lime-50 to-background">
        <div className="container mx-auto px-4 py-5">
          <Button variant="ghost" onClick={onBack} className="mb-3 text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "rgb(21, 128, 61)" }}>
            SUBMIT YOUR BUSINESS DETAILS
          </h1>
          <p className="text-muted-foreground mt-2 text-base">Fill in the form below to complete your registration</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-5 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <Card className="border-[6px]" style={{ borderColor: "rgb(21, 128, 61)" }}>
            <CardHeader className="pb-4 pt-5">
              <CardTitle className="text-lg">Business Information</CardTitle>
              <CardDescription className="text-sm">
                Provide accurate details to help Pi travelers find and contact your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-semibold">
                  Business Name *
                </Label>
                <Input
                  id="businessName"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Enter your business name"
                  className="text-sm h-10"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold">
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="text-sm h-10">
                    <SelectValue placeholder="Select business category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accommodation" className="text-sm">
                      Accommodation
                    </SelectItem>
                    <SelectItem value="travel" className="text-sm">
                      Travel & Tourism
                    </SelectItem>
                    <SelectItem value="shopping" className="text-sm">
                      Shopping
                    </SelectItem>
                    <SelectItem value="food" className="text-sm">
                      Food & Beverage
                    </SelectItem>
                    <SelectItem value="transportation" className="text-sm">
                      Transportation
                    </SelectItem>
                    <SelectItem value="airlines" className="text-sm">
                      Airlines
                    </SelectItem>
                    <SelectItem value="services" className="text-sm">
                      Services
                    </SelectItem>
                    <SelectItem value="health" className="text-sm">
                      Health & Wellness
                    </SelectItem>
                    <SelectItem value="entertainment" className="text-sm">
                      Entertainment & Activities
                    </SelectItem>
                    <SelectItem value="realestate" className="text-sm">
                      Real Estate
                    </SelectItem>
                    <SelectItem value="community" className="text-sm">
                      Community & Local Businesses
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Merchant Type */}
              <div className="space-y-2">
                <Label htmlFor="merchantType" className="text-sm font-semibold">
                  Merchant Type *
                </Label>
                <Select
                  value={formData.merchantType}
                  onValueChange={(value) => setFormData({ ...formData, merchantType: value })}
                >
                  <SelectTrigger className="text-sm h-10">
                    <SelectValue placeholder="Select merchant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual" className="text-sm">
                      Individual Merchant (1 person) - $10/month
                    </SelectItem>
                    <SelectItem value="small" className="text-sm">
                      Small Merchant (1-10 employees) - $15/month
                    </SelectItem>
                    <SelectItem value="medium" className="text-sm">
                      Medium Merchant (11-30 employees) - $25/month
                    </SelectItem>
                    <SelectItem value="big" className="text-sm">
                      Big Merchant (31-50 employees) - $100/month
                    </SelectItem>
                    <SelectItem value="enterprise" className="text-sm">
                      Large Enterprise (51+ employees) - $149/month
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Featured Listing */}
              {(formData.merchantType === "big" || formData.merchantType === "enterprise") && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Featured Listing (Optional)</Label>
                  <Card className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-500 p-4">
                    <div className="flex items-start gap-3">
                      <Crown className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-bold text-yellow-900 text-sm">Stand Out with Featured Listing</h4>
                        <p className="text-xs text-yellow-800 mt-1">
                          Appear at the top of search results and get 3x more visibility
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-yellow-900 font-bold">+$30/month</span>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={formData.featuredListing}
                              onChange={(e) => setFormData({ ...formData, featuredListing: e.target.checked })}
                            />
                            <span className="text-sm font-semibold text-yellow-900">
                              Add $30/monthly to be featured in top search
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1234567890"
                    className="text-sm h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="text-sm h-10"
                  />
                </div>
              </div>

              {/* Business Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Business Description *
                </Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your business. services. and what makes you special..."
                  rows={4}
                  className="text-sm"
                />
              </div>

              {/* Logo/Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="logo" className="text-sm font-semibold">
                  Logo/Business Photo *
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files?.[0] || null)}
                  className="cursor-pointer text-sm h-10"
                />
                {logo && (
                  <p className="text-sm text-lime-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    {logo.name}
                  </p>
                )}
              </div>

              {/* Location Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-semibold">
                  Location Address *
                </Label>
                <Textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full business address including city and country"
                  rows={3}
                  className="text-sm"
                />
              </div>

              {/* Operating Hours */}
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-sm font-semibold">
                  Operating Hours *
                </Label>
                <Input
                  id="hours"
                  required
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="e.g.. Mon-Fri: 9AM-6PM. Sat-Sun: 10AM-4PM"
                  className="text-sm h-10"
                />
              </div>

              {/* Services Offered */}
              <div className="space-y-2">
                <Label htmlFor="services" className="text-sm font-semibold">
                  Services Offered *
                </Label>
                <Textarea
                  id="services"
                  required
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  placeholder="List the main services or products you offer..."
                  rows={3}
                  className="text-sm"
                />
              </div>

              {/* Payment Screenshot */}
              <div className="space-y-2">
                <Label htmlFor="payment" className="text-sm font-semibold">
                  Payment Screenshot (Optional - if not paid via SDK)
                </Label>
                <Input
                  id="payment"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setPaymentScreenshot(e.target.files?.[0] || null)}
                  className="cursor-pointer text-sm h-10"
                />
                {paymentScreenshot && (
                  <p className="text-sm text-lime-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    {paymentScreenshot.name}
                  </p>
                )}
              </div>

              <div className="pt-4 text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-10 py-6 text-base font-bold rounded-lg"
                  style={{ backgroundColor: "rgb(21, 128, 61)", color: "white" }}
                >
                  Submit My Business
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
