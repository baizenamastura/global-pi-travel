"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, Crown, Copy, Check, Info } from "lucide-react"

interface ProPaymentModalProps {
  onClose: () => void
  onSuccess: () => void
  user: {
    uid: string
    username: string
  }
}

const PI_WALLET_ADDRESS = "GDV4XJJL6DH4G7LAO25DUFW4AEXLRNGZEYHH254NTCRO7MLKT5DIULYO"
const PRO_PRICE_PI = "31.4159"
const PRO_PRICE_USD = "$100"

export function ProPaymentModal({ onClose, onSuccess, user }: ProPaymentModalProps) {
  const [hasPaid, setHasPaid] = useState(false)
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(PI_WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getPaymentLink = () => {
    return `https://wallet.pi/pay?address=${PI_WALLET_ADDRESS}&amount=${PRO_PRICE_PI}&memo=Pro Membership - ${user.username}`
  }

  const handleSubmit = () => {
    if (hasPaid && paymentReceipt) {
      // Store Pro status
      localStorage.setItem(`pro_member_${user.uid}`, "true")
      localStorage.setItem(`pro_activated_${user.uid}`, new Date().toISOString())
      onSuccess()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-accent">
        <CardHeader className="relative bg-accent/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 mt-2">
            <div className="p-3 bg-accent/20 rounded-full">
              <Crown className="h-6 w-6 text-accent" />
            </div>
            <div>
              <CardTitle className="text-2xl">Pro Membership Payment</CardTitle>
              <CardDescription>Complete your upgrade to Pro</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Send {PRO_PRICE_USD} ({PRO_PRICE_PI} Pi) to unlock unlimited merchant details for life!
            </AlertDescription>
          </Alert>

          <div className="bg-accent/5 border border-accent/20 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
            <p className="text-3xl font-bold text-accent">{PRO_PRICE_USD}</p>
            <p className="text-sm text-muted-foreground mt-1">{PRO_PRICE_PI} Pi</p>
          </div>

          <div className="space-y-2">
            <a href={getPaymentLink()} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                variant="outline"
                className="w-full h-auto py-3 bg-[#0099FF] text-white hover:bg-[#0088EE] border-[#0099FF]"
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">Pay with Pi Wallet</div>
                  <div className="text-xs opacity-90 mt-0.5">Click to open Pi Wallet</div>
                </div>
              </Button>
            </a>
            <div className="text-center text-xs text-muted-foreground">OR</div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Pi Wallet Address:</Label>
            <div className="flex gap-2">
              <Input value={PI_WALLET_ADDRESS} readOnly className="font-mono text-xs" />
              <Button onClick={handleCopyAddress} variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-primary flex items-center gap-1">
                <Check className="h-3 w-3" />
                Copied!
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="paid-pro"
                checked={hasPaid}
                onChange={(e) => setHasPaid(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="paid-pro" className="cursor-pointer text-sm">
                I have completed the payment
              </Label>
            </div>

            {hasPaid && (
              <div className="space-y-2">
                <Label className="text-sm">Upload Payment Receipt:</Label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files && setPaymentReceipt(e.target.files[0])}
                  className="cursor-pointer text-sm"
                />
                {paymentReceipt && (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {paymentReceipt.name}
                  </p>
                )}
              </div>
            )}

            {hasPaid && paymentReceipt && (
              <Button onClick={handleSubmit} className="w-full bg-accent hover:bg-accent/90">
                <Crown className="mr-2 h-4 w-4" />
                Activate Pro Membership
              </Button>
            )}

            <Button onClick={onClose} variant="ghost" className="w-full">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
