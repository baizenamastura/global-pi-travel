"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Store } from "lucide-react"

interface MerchantInvitationPopupProps {
  isLoggedIn: boolean
  onRegisterClick: () => void
}

export function MerchantInvitationPopup({ isLoggedIn, onRegisterClick }: MerchantInvitationPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      const hasSeenPopup = localStorage.getItem("hasSeenMerchantInvitation")

      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 1000)

        const autoHideTimer = setTimeout(() => {
          handleClose()
        }, 11000)

        return () => {
          clearTimeout(timer)
          clearTimeout(autoHideTimer)
        }
      }
    }
  }, [isLoggedIn])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenMerchantInvitation", "true")
  }

  const handleRegister = () => {
    handleClose()
    onRegisterClick()
  }

  if (!isVisible) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl border-4 border-cyan-500 shadow-2xl overflow-hidden">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-cyan-300 transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-[#FFC107] rounded-full p-4">
                  <Store className="w-12 h-12 text-purple-900" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">Dear Pi Pioneers!</h2>

                <p className="text-white text-lg leading-relaxed">
                  Are you a merchant? Register your business <span className="font-bold text-[#FFC107]">FREE</span>{" "}
                  before mainnet!
                </p>

                <p className="text-cyan-100 text-base">
                  Get discovered by millions of Pi Pioneers worldwide. Join the Pi Network revolution in global travel.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleRegister}
                  className="w-full bg-[#FFC107] hover:bg-yellow-500 text-purple-900 font-bold text-lg py-6"
                >
                  Register Now - FREE!
                </Button>

                <Button
                  onClick={handleClose}
                  variant="ghost"
                  className="w-full text-white hover:text-cyan-300 hover:bg-purple-700/50"
                >
                  Maybe Later
                </Button>
              </div>

              <p className="text-cyan-200 text-xs">This popup will close automatically in 10 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
