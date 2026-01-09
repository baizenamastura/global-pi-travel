"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  text: string
  isBot: boolean
  buttons?: { label: string; value: string }[]
}

export default function AdminAssistantBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to your Admin Assistant! I'm here to help you navigate and manage your Travel with Pi admin dashboard. How can I assist you today?",
      isBot: true,
      buttons: [
        { label: "Merchant Management", value: "merchants" },
        { label: "Analytics & Reports", value: "analytics" },
        { label: "Subscriptions", value: "subscriptions" },
        { label: "Settings", value: "settings" },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const addMessage = (text: string, isBot: boolean, buttons?: { label: string; value: string }[]) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isBot,
      buttons,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleButtonClick = (value: string) => {
    addMessage(value, false)

    setTimeout(() => {
      let responseText = ""
      let responseButtons: { label: string; value: string }[] = []

      switch (value) {
        case "merchants":
          responseText =
            "Merchant Management helps you:\n\n• View all registered merchants\n• Approve/reject merchant applications\n• Manage merchant subscriptions (Individual $10, Small $15, Medium $25, Big $100, Enterprise $149)\n• View merchant details and contact info\n• Track merchant payments\n• Featured listings ($30/month for Big & Enterprise tiers)\n\nWhat would you like to do?"
          responseButtons = [
            { label: "View Merchant List", value: "merchant-list" },
            { label: "Subscription Plans", value: "subscription-info" },
            { label: "Approve Merchants", value: "approve-merchants" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "analytics":
          responseText =
            "Analytics & Reports shows you:\n\n• Total earnings with date range filter\n• Daily income charts\n• User unlock statistics ($0.50 per unlock)\n• Pro subscriptions ($9.99/month)\n• Merchant subscription revenue\n• Referral program tracking ($2 per referral)\n• Top performing merchants\n• Revenue breakdown by category\n\nWhich analytics do you need help with?"
          responseButtons = [
            { label: "Earnings Report", value: "earnings" },
            { label: "User Statistics", value: "user-stats" },
            { label: "Revenue Breakdown", value: "revenue" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "subscriptions":
          responseText =
            "Subscription Management:\n\n**Merchant Subscriptions:**\n• Individual: $10/month\n• Small: $15/month\n• Medium: $25/month\n• Big: $100/month\n• Enterprise: $149/month\n\n**User Subscriptions:**\n• Pro: $9.99/month (unlimited merchant unlocks)\n\n**Featured Listings:**\n• $30/month add-on for Big & Enterprise (top search placement)\n\nWhat do you need help with?"
          responseButtons = [
            { label: "View All Subscriptions", value: "all-subs" },
            { label: "Pricing Details", value: "pricing" },
            { label: "Renewal Management", value: "renewals" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "settings":
          responseText =
            "Admin Settings:\n\n• Change admin password\n• Manage Pi Network integration\n• Configure payment settings\n• Set up email notifications\n• Manage featured listings\n• Configure auto-renewal settings\n• Export data reports\n\nWhat would you like to configure?"
          responseButtons = [
            { label: "Change Password", value: "change-password" },
            { label: "Payment Settings", value: "payment-settings" },
            { label: "Export Reports", value: "export" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "merchant-list":
          responseText =
            "To view the merchant list:\n\n1. Scroll down to the 'Registered Merchants' section\n2. Use filters to search by name, country, city, or type\n3. Click on any merchant card to view full details\n4. Use the status badges to see subscription tier\n5. Check the 'Featured' badge for premium listings\n\nYou can approve, edit, or remove merchants from this section."
          responseButtons = [
            { label: "Merchant Management", value: "merchants" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "subscription-info":
          responseText =
            "Merchant Subscription Tiers:\n\n**Individual ($10/month):**\n• Basic listing\n• Contact details visible\n• Standard search placement\n\n**Small ($15/month):**\n• Enhanced listing\n• Priority support\n\n**Medium ($25/month):**\n• Premium features\n• Enhanced visibility\n\n**Big ($100/month):**\n• Featured listing option (+$30)\n• Top search placement available\n\n**Enterprise ($149/month):**\n• Featured listing option (+$30)\n• Dedicated support\n• Priority placement"
          responseButtons = [
            { label: "Merchant Management", value: "merchants" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "approve-merchants":
          responseText =
            "To approve merchant applications:\n\n1. Navigate to 'Pending Approvals' section\n2. Review merchant details carefully\n3. Verify business information and documents\n4. Check payment status\n5. Click 'Approve' to activate listing\n6. Or click 'Reject' with a reason\n\nApproved merchants will immediately appear in the directory."
          responseButtons = [
            { label: "Merchant Management", value: "merchants" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "earnings":
          responseText =
            "Earnings Dashboard Features:\n\n• Use the date range calendar to filter earnings\n• Quick presets: Today, Last 7 days, Last 30 days, This month, etc.\n• View daily income breakdown\n• Track user unlocks ($0.50 each)\n• Monitor Pro subscriptions ($9.99/month)\n• See merchant subscription revenue\n• Export earnings reports\n\nThe earnings card at the top shows your filtered total."
          responseButtons = [
            { label: "Analytics & Reports", value: "analytics" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "user-stats":
          responseText =
            "User Statistics shows:\n\n• Total registered users\n• Pro subscribers count\n• Total merchant unlocks\n• Average unlocks per user\n• Referral program performance ($2 per referral)\n• User engagement metrics\n• New user registrations\n• Active user count\n\nScroll to the statistics cards section to view all metrics."
          responseButtons = [
            { label: "Analytics & Reports", value: "analytics" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "revenue":
          responseText =
            "Revenue Breakdown:\n\n**User Revenue:**\n• Merchant unlocks: $0.50 each\n• Pro subscriptions: $9.99/month\n\n**Merchant Revenue:**\n• Individual tier: $10/month\n• Small tier: $15/month\n• Medium tier: $25/month\n• Big tier: $100/month\n• Enterprise tier: $149/month\n• Featured listings: $30/month (Big & Enterprise only)\n\nView detailed charts in the Analytics section."
          responseButtons = [
            { label: "Analytics & Reports", value: "analytics" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "change-password":
          responseText =
            "To change your admin password:\n\n1. Click the 'Change Password' button in the top right corner\n2. Enter your current password: globalpitravel2025\n3. Enter your new password (minimum 8 characters)\n4. Confirm new password\n5. Click 'Save Changes'\n\nYour password will be updated immediately."
          responseButtons = [
            { label: "Settings", value: "settings" },
            { label: "Back to Main Menu", value: "main-menu" },
          ]
          break

        case "main-menu":
          responseText = "How can I help you with your admin dashboard?"
          responseButtons = [
            { label: "Merchant Management", value: "merchants" },
            { label: "Analytics & Reports", value: "analytics" },
            { label: "Subscriptions", value: "subscriptions" },
            { label: "Settings", value: "settings" },
          ]
          break

        default:
          responseText =
            "I'm here to help with:\n\n• Merchant Management\n• Analytics & Reports\n• Subscription Management\n• Admin Settings\n• Navigation assistance\n\nPlease select a topic or ask me a question!"
          responseButtons = [
            { label: "Merchant Management", value: "merchants" },
            { label: "Analytics & Reports", value: "analytics" },
            { label: "Subscriptions", value: "subscriptions" },
            { label: "Settings", value: "settings" },
          ]
      }

      addMessage(responseText, true, responseButtons)
    }, 500)
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim().toLowerCase()
    addMessage(inputValue, false)
    setInputValue("")

    setTimeout(() => {
      let responseText = ""
      let responseButtons: { label: string; value: string }[] = []

      // Keyword detection for natural conversation
      if (
        userMessage.includes("merchant") ||
        userMessage.includes("business") ||
        userMessage.includes("approve") ||
        userMessage.includes("subscription tier")
      ) {
        handleButtonClick("merchants")
        return
      } else if (
        userMessage.includes("earning") ||
        userMessage.includes("revenue") ||
        userMessage.includes("income") ||
        userMessage.includes("analytics") ||
        userMessage.includes("report")
      ) {
        handleButtonClick("analytics")
        return
      } else if (
        userMessage.includes("subscription") ||
        userMessage.includes("pricing") ||
        userMessage.includes("plan") ||
        userMessage.includes("featured")
      ) {
        handleButtonClick("subscriptions")
        return
      } else if (
        userMessage.includes("setting") ||
        userMessage.includes("password") ||
        userMessage.includes("configure") ||
        userMessage.includes("export")
      ) {
        handleButtonClick("settings")
        return
      } else if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("help")) {
        responseText =
          "Hello! I'm your Admin Assistant. I can help you with merchant management, analytics, subscriptions, and settings. What would you like to explore?"
        responseButtons = [
          { label: "Merchant Management", value: "merchants" },
          { label: "Analytics & Reports", value: "analytics" },
          { label: "Subscriptions", value: "subscriptions" },
          { label: "Settings", value: "settings" },
        ]
      } else {
        responseText =
          "I can help you with:\n\n• Merchant Management - View, approve, and manage merchants\n• Analytics & Reports - Track earnings and performance\n• Subscriptions - Manage pricing and plans\n• Settings - Configure your admin dashboard\n\nWhat would you like help with?"
        responseButtons = [
          { label: "Merchant Management", value: "merchants" },
          { label: "Analytics & Reports", value: "analytics" },
          { label: "Subscriptions", value: "subscriptions" },
          { label: "Settings", value: "settings" },
        ]
      }

      addMessage(responseText, true, responseButtons)
    }, 500)
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className="fixed bottom-6 right-6 w-80 h-[400px] shadow-2xl z-50 flex flex-col"
          style={{ border: "6px solid #000000" }}
        >
          {/* Header */}
          <div className="bg-white text-gray-900 p-3 rounded-t-lg flex items-center justify-between border-b-4 border-black">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-green-600" />
              <div>
                <h3 className="font-bold text-sm text-gray-900">Admin Assistant</h3>
                <p className="text-xs text-gray-600">Here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-black hover:bg-red-100 hover:text-red-600 h-10 w-10"
            >
              <X className="h-7 w-7 stroke-[4]" />
            </Button>
          </div>

          {/* Messages Container with fixed height */}
          <div className="flex-1 overflow-hidden bg-gray-50">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] ${message.isBot ? "bg-white border border-gray-200" : "bg-green-600 text-white"} rounded-lg p-3 shadow-sm`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {message.buttons && (
                        <div className="grid grid-cols-1 gap-2 mt-3">
                          {message.buttons.map((button, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleButtonClick(button.value)}
                              className="w-full text-left justify-start bg-green-50 border-green-300 hover:bg-green-100 text-green-800"
                            >
                              {button.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Input - Always Visible */}
          <div className="p-4 border-t bg-white rounded-b-lg flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <Button onClick={handleSend} size="icon" className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
