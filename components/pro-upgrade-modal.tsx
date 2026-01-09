"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Crown, Unlock, CheckCircle2, Zap } from "lucide-react"

interface ProUpgradeModalProps {
  onClose: () => void
  onUpgrade: () => void
  onPayPerUnlock: () => void
  merchantName: string
}

const SINGLE_UNLOCK_USD = "$0.50"
const SINGLE_UNLOCK_PI = "0.00000159 Pi" // $0.50 / $314,159
const PRO_PRICE_USD = "$9.99"
const PRO_PRICE_PI = "0.0000318 Pi" // $9.99 / $314,159

export function ProUpgradeModal({ onClose, onUpgrade, onPayPerUnlock, merchantName }: ProUpgradeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-500/20 backdrop-blur-sm">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-primary/20">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 mt-2">
            <div className="p-3 bg-accent/10 rounded-full">
              <Unlock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <CardTitle className="text-2xl">Unlock Merchant Details</CardTitle>
              <CardDescription>Choose the plan that works best for you</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Action */}
          <div className="bg-muted/30 p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">You're about to access:</p>
            <p className="text-base font-semibold">{merchantName}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Single Unlock */}
            <Card className="border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Single Unlock</CardTitle>
                </div>
                <CardDescription>One-time use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-3xl font-bold text-accent">{SINGLE_UNLOCK_USD}</div>
                  <div className="text-sm text-muted-foreground mt-2">{SINGLE_UNLOCK_PI}</div>
                  <div className="text-sm text-muted-foreground">per merchant</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Unlock 1 trusted Pi merchant</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>View verified merchant details</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>One-time access only</span>
                  </div>
                </div>
                <Button onClick={onPayPerUnlock} variant="outline" className="w-full bg-transparent">
                  Pay {SINGLE_UNLOCK_USD}
                </Button>
              </CardContent>
            </Card>

            {/* Pro Monthly Plan */}
            <Card className="border-2 border-green-600 relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                UNLIMITED
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-lg text-green-600">Pro Monthly</CardTitle>
                </div>
                <CardDescription>For unlimited access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 bg-green-600/10 rounded-lg border border-green-600/20">
                  <div className="text-3xl font-bold text-green-600">{PRO_PRICE_USD}</div>
                  <div className="text-sm text-muted-foreground mt-2">{PRO_PRICE_PI}</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <Crown className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold">Unlimited merchant unlocks</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Zap className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Access all verified merchants</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Zap className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Pro badge on your profile</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Zap className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Priority customer support</span>
                  </div>
                </div>
                <div className="bg-amber-500/20 border border-amber-500/30 p-3 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-400">
                    <strong>Important:</strong> All unlocked merchants will lock again if subscription is not renewed.
                  </p>
                </div>
                <Button onClick={onUpgrade} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Unlock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">How it works</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Single unlock is one-time use per merchant</li>
                  <li>Pro membership gives unlimited access while active</li>
                  <li>All plans unlock verified merchant contact details instantly</li>
                  <li>Secure payments through Pi Network blockchain</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
