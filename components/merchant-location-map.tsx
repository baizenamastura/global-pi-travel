"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

interface MerchantLocationMapProps {
  businessName: string
  address: string
  onLocationConfirm?: (location: { lat: number; lng: number; address: string }) => void
}

export function MerchantLocationMap({ businessName, address, onLocationConfirm }: MerchantLocationMapProps) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [fullAddress, setFullAddress] = useState(address)
  const [isLoading, setIsLoading] = useState(false)

  // Generate Google Maps embed URL
  const getMapEmbedUrl = () => {
    if (coordinates) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${coordinates.lat},${coordinates.lng}&zoom=15`
    }
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(fullAddress)}&zoom=15`
  }

  // Generate directions URL
  const getDirectionsUrl = () => {
    if (coordinates) {
      return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
  }

  const handleGetCurrentLocation = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setCoordinates(coords)
          setIsLoading(false)
          if (onLocationConfirm) {
            onLocationConfirm({ ...coords, address: fullAddress })
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)
          alert("Unable to get your location. Please enter your address manually.")
        },
      )
    } else {
      setIsLoading(false)
      alert("Geolocation is not supported by your browser.")
    }
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <MapPin className="h-5 w-5 text-primary" />
          Business Location & Map
        </CardTitle>
        <CardDescription className="text-sm text-foreground">
          Set your business location for customers to find you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="address" className="text-sm font-semibold text-foreground">
            Business Address
          </Label>
          <Input
            id="address"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            placeholder="Enter your full business address"
            className="mt-1"
          />
        </div>

        <Button
          onClick={handleGetCurrentLocation}
          disabled={isLoading}
          variant="outline"
          className="w-full border-primary/30 text-foreground bg-transparent"
        >
          <Navigation className="mr-2 h-4 w-4" />
          {isLoading ? "Getting Location..." : "Use My Current Location"}
        </Button>

        {/* Map Display */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={getMapEmbedUrl()}
            title="Business Location Map"
          ></iframe>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Location Preview
          </h4>
          <p className="text-xs text-foreground mb-2">
            <strong>Business:</strong> {businessName}
          </p>
          <p className="text-xs text-foreground mb-3">
            <strong>Address:</strong> {fullAddress}
          </p>
          {coordinates && (
            <p className="text-xs text-foreground mb-3">
              <strong>Coordinates:</strong> {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </p>
          )}
          <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="block">
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs">
              <Navigation className="mr-2 h-3 w-3" />
              Get Directions in Google Maps
            </Button>
          </a>
        </div>

        <div className="text-xs text-foreground bg-blue-50 border border-blue-200 rounded-lg p-2">
          <p>
            <strong>Note:</strong> This map will be displayed to customers when they unlock your business details. Make
            sure your address is accurate for easy navigation.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
