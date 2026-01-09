"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, X, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface CustomerServiceBotProps {
  onClose: () => void
}

type Message = {
  role: "bot" | "user"
  content: string
  buttons?: Array<{ label: string; value: string }>
}

export function CustomerServiceBot({ onClose }: CustomerServiceBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hello! 👋 Welcome to Global Pi Travel Customer Support. I'm here to help you with any questions about subscriptions, features, bookings, or general inquiries. How can I assist you today?",
      buttons: [
        { label: "Subscription Plans", value: "subscriptions" },
        { label: "How to Use App", value: "howto" },
        { label: "Payment Questions", value: "payment" },
        { label: "Technical Support", value: "support" },
        { label: "Referral Program", value: "referral" },
      ],
    },
  ])
  const [input, setInput] = useState("")

  const handleButtonClick = (value: string) => {
    const userMessage: Message = { role: "user", content: value }
    setMessages([...messages, userMessage])

    setTimeout(() => {
      let botResponse: Message = { role: "bot", content: "" }

      switch (value) {
        case "subscriptions":
          botResponse = {
            role: "bot",
            content: `📋 **Subscription Plans Overview:**

**For Travelers (Unlock Merchant Info):**
• Free Account - Browse listings, limited access
• Pro Account - $9.99/month - Unlock unlimited merchant contacts

**For Merchants (Get Listed):**
• Individual Merchant - $10/month
• Small Merchant - $15/month
• Medium Merchant - $25/month
• Big Merchant - $100/month
• Enterprise Merchant - $149/month

**Featured Listing Add-on:**
• Big & Enterprise merchants can add $30/month to be featured in top search results

All payments accepted in Pi cryptocurrency!

Would you like to know more about any specific plan?`,
            buttons: [
              { label: "Traveler Plans", value: "traveler_plans" },
              { label: "Merchant Plans", value: "merchant_plans" },
              { label: "Featured Listing", value: "featured" },
              { label: "Back to Main Menu", value: "main" },
            ],
          }
          break

        case "traveler_plans":
          botResponse = {
            role: "bot",
            content: `🌍 **Traveler Plans Details:**

**FREE Account:**
• Browse all merchants
• View basic business info
• Access community forum
• Limited merchant unlocks

**PRO Account ($9.99/month):**
• ✅ Unlimited merchant contact unlocks
• ✅ Priority customer support
• ✅ Advanced search filters
• ✅ Save favorite merchants
• ✅ Access to exclusive deals

Upgrade to Pro and discover unlimited Pi-accepting businesses worldwide!

Ready to upgrade?`,
            buttons: [
              { label: "How to Upgrade", value: "upgrade" },
              { label: "Payment Methods", value: "payment" },
              { label: "Back", value: "subscriptions" },
            ],
          }
          break

        case "merchant_plans":
          botResponse = {
            role: "bot",
            content: `🏪 **Merchant Plans Details:**

**Individual Merchant ($10/month):**
For freelancers, consultants, solo entrepreneurs

**Small Merchant ($15/month):**
For small local stores, homestays, cafes, repair shops

**Medium Merchant ($25/month):**
For hotels, restaurants, boutiques, travel agencies

**Big Merchant ($100/month):**
For airlines, hotel chains, large businesses

**Enterprise Merchant ($149/month):**
For large corporations, international chains
• Featured on dedicated Enterprise page
• Premium positioning

**Benefits for ALL Plans:**
• Global directory listing
• Full business profile
• Contact information display
• Pi payment integration
• Customer reviews

Need help choosing the right plan?`,
            buttons: [
              { label: "How to Register", value: "register" },
              { label: "Featured Listing Info", value: "featured" },
              { label: "Back", value: "subscriptions" },
            ],
          }
          break

        case "featured":
          botResponse = {
            role: "bot",
            content: `⭐ **Featured Listing Premium Add-on:**

**Available for:** Big & Enterprise Merchants only
**Cost:** $30/month additional

**Benefits:**
• 🔝 Appear at TOP of search results
• ⚡ 3x more visibility to travelers
• 🌟 Special "Featured" badge
• 📊 Priority in category listings
• 🎯 Higher conversion rates

**How it works:**
When travelers search, Featured listings appear first before regular listings, giving you maximum exposure!

Interested in adding Featured Listing to your plan?`,
            buttons: [
              { label: "Contact Support", value: "contact" },
              { label: "Back to Plans", value: "subscriptions" },
            ],
          }
          break

        case "howto":
          botResponse = {
            role: "bot",
            content: `📱 **How to Use Global Pi Travel:**

**For Travelers:**
1. Browse or search merchants by location/category
2. View merchant profiles (name, location, category)
3. Unlock full contact details (phone, email, WhatsApp)
4. Pay with Pi to unlock unlimited contacts (Pro)
5. Leave reviews and ratings
6. Join community forum

**For Merchants:**
1. Click "Register My Business FREE" for directory listing
2. Or subscribe for premium plans with more features
3. Chat with our registration bot
4. Choose your merchant tier
5. Complete payment with Pi
6. Get listed and discovered by travelers!

**Navigation:**
• Home - Main dashboard
• Search Destinations - Find flights, hotels, merchants
• Merchants - Browse Pi-accepting businesses
• Community - Connect with travelers
• Dashboard - Manage your account

What would you like to learn more about?`,
            buttons: [
              { label: "Unlocking Contacts", value: "unlock" },
              { label: "Registration Process", value: "register" },
              { label: "Community Features", value: "community" },
              { label: "Back", value: "main" },
            ],
          }
          break

        case "unlock":
          botResponse = {
            role: "bot",
            content: `🔓 **How to Unlock Merchant Contacts:**

**Step 1:** Log in with your Pi Network account
**Step 2:** Browse merchants or use search
**Step 3:** Click "Unlock Full Details" on any merchant
**Step 4:** Pay 0.00000159 Pi (about $0.50)
**Step 5:** Instantly access phone, email, WhatsApp

**OR Upgrade to Pro:**
Pay $9.99/month (0.0000318 Pi) for UNLIMITED unlocks!

**Why unlock?**
• Get direct contact information
• Call, email, or WhatsApp businesses
• Make bookings and inquiries
• Access exclusive merchant offers

Each unlock is permanent - once unlocked, always accessible in your dashboard!

Need help with payment?`,
            buttons: [
              { label: "Payment Help", value: "payment" },
              { label: "Upgrade to Pro", value: "traveler_plans" },
              { label: "Back", value: "howto" },
            ],
          }
          break

        case "register":
          botResponse = {
            role: "bot",
            content: `📝 **How to Register Your Business:**

**Two Options:**

**Option 1: FREE Directory Listing**
• Click "Pi Global Merchants Directory Listing"
• Fill out business information
• Get listed for FREE!
• Basic visibility

**Option 2: Premium Subscription Plans**
• Click "Merchant Subscription Plans"
• Chat with our friendly registration bot
• Bot will ask about your business
• Auto-categorize your merchant tier
• Choose monthly or yearly payment
• Complete payment with Pi
• Get verified within 24 hours
• Enjoy premium features!

**What You Need:**
✓ Business name and location
✓ Contact details (phone, email, WhatsApp)
✓ Business category/description
✓ Pi wallet for payment
✓ Business photo (optional)

**Auto-Renewal Options:**
• Automatic renewal (hassle-free)
• Manual reminders (7 days before expiry)

Ready to get started?`,
            buttons: [
              { label: "Payment Questions", value: "payment" },
              { label: "Technical Issues", value: "support" },
              { label: "Back", value: "howto" },
            ],
          }
          break

        case "payment":
          botResponse = {
            role: "bot",
            content: `💰 **Payment Information:**

**Accepted Payment:**
We only accept Pi cryptocurrency!

**Payment Methods:**
1. **Pi SDK Payment** (Recommended)
   • Click "Pay with Pi Wallet"
   • Opens Pi Browser automatically
   • Secure and instant

2. **Manual Payment**
   • Copy our wallet address
   • Send Pi from your Pi Wallet
   • Upload payment receipt
   • Admin verifies within 24 hours

**Payment Security:**
✅ All transactions are secure
✅ Pi Network official integration
✅ No credit cards needed
✅ No personal financial data stored

**Refund Policy:**
• 7-day money-back guarantee
• Contact support for refunds
• No questions asked

**Exchange Rates:**
Pi pricing is fixed in USD equivalent and updated regularly based on Pi Network rates.

Having payment issues?`,
            buttons: [
              { label: "Pi Wallet Help", value: "wallet" },
              { label: "Contact Support", value: "contact" },
              { label: "Back to Payment", value: "payment" },
            ],
          }
          break

        case "wallet":
          botResponse = {
            role: "bot",
            content: `👛 **Pi Wallet Help:**

**How to Pay with Pi Wallet:**
1. Make sure you have Pi Browser app installed
2. Click "Pay with Pi Wallet" button
3. Pi Browser opens automatically
4. Review payment details
5. Approve transaction
6. Done!

**Common Issues:**

**"Pi Wallet won't open"**
• Make sure Pi Browser app is installed
• Update to latest version
• Allow browser permissions

**"Insufficient Pi balance"**
• Check your Pi Wallet balance
• Mine more Pi in Pi Network app
• Wait for mining to unlock

**"Payment failed"**
• Check internet connection
• Try again in a few minutes
• Use Manual Payment option instead

**Manual Payment Alternative:**
If Pi SDK doesn't work, you can always use manual payment by copying our wallet address and sending Pi directly!

Need more help?`,
            buttons: [
              { label: "Contact Support", value: "contact" },
              { label: "Back to Payment", value: "payment" },
            ],
          }
          break

        case "community":
          botResponse = {
            role: "bot",
            content: `💬 **Community Features:**

**Global Pi Pioneers Community:**
Connect with travelers and merchants worldwide!

**Features:**
• 📝 Create posts with text, images, and polls
• 💬 Comment and reply to discussions
• 👍 React with emoji reactions
• 🔖 Bookmark favorite posts
• 🔍 Search posts by keyword
• 📊 Sort by newest, popular, or trending
• 👤 View member profiles and stats
• 💌 Send private messages to members
• 📢 Write status updates (like Facebook)
• 🎨 Rich text formatting (bold, italic, colors)
• 🏆 Earn achievement badges
• ⭐ Rate and review merchants

**Community Guidelines:**
• Be respectful and helpful
• Share travel tips and experiences
• Ask questions and help others
• Report inappropriate content
• Build meaningful connections

**Privacy:**
• Private messages are visible only to sender/recipient
• Profile information is public to members
• You control what you share

Join the conversation!`,
            buttons: [
              { label: "How to Post", value: "posting" },
              { label: "Private Messaging", value: "messaging" },
              { label: "Back", value: "howto" },
            ],
          }
          break

        case "posting":
          botResponse = {
            role: "bot",
            content: `✍️ **How to Create Posts:**

**Creating a New Post:**
1. Go to Community page
2. Click "What's on your mind?" box at top
3. Write your post content
4. Use formatting toolbar:
   • **Bold**, *Italic*, Underline
   • Change font size and style
   • Add text colors
   • Insert images/photos
   • Add emojis
5. Select post categories (tags)
6. Click "Post" to publish!

**Post Features:**
• Add multiple images
• Create polls with voting
• Tag other members with @username
• Edit posts after publishing
• Pin important posts (stays at top)

**Post Types:**
• Travel Tips & Advice
• Destination Reviews
• Questions & Answers
• Merchant Recommendations
• Travel Stories
• Photos & Videos

**Engagement:**
• Others can like, comment, react
• Bookmarked posts saved to your profile
• Popular posts get featured

Share your travel experiences!`,
            buttons: [
              { label: "Back to Community", value: "community" },
              { label: "Main Menu", value: "main" },
            ],
          }
          break

        case "messaging":
          botResponse = {
            role: "bot",
            content: `💌 **Private Messaging:**

**How to Send Messages:**
1. Click on any member's profile
2. Click "Send Message" button
3. Type your message
4. Click send!

**Message Features:**
• Real-time chat interface
• Message history saved
• Unread message counts
• Quick emoji responses
• Conversation list view
• Search conversations

**Privacy & Security:**
• Messages are private (only you and recipient)
• Not visible to other community members
• Secure and encrypted
• Report spam or harassment

**Message Etiquette:**
• Introduce yourself first
• Be polite and respectful
• No spam or advertising
• Keep conversations relevant

**Notifications:**
You'll see a notification badge when you receive new messages!

Start connecting with travelers!`,
            buttons: [
              { label: "Back to Community", value: "community" },
              { label: "Main Menu", value: "main" },
            ],
          }
          break

        case "support":
          botResponse = {
            role: "bot",
            content: `🛠️ **Technical Support:**

**Common Issues & Solutions:**

**Login Problems:**
• Make sure you're using Pi Browser
• Check your Pi Network account is active
• Clear browser cache and try again

**Search Not Working:**
• Check your spelling
• Try broader search terms
• Use filters to narrow results

**Payment Issues:**
• See "Payment Help" section
• Verify Pi Wallet balance
• Try manual payment method

**Profile/Dashboard Issues:**
• Log out and log back in
• Clear browser cache
• Check internet connection

**Merchant Listing Issues:**
• Verify payment was processed
• Wait up to 24 hours for verification
• Check email for updates

**Community/Forum Issues:**
• Refresh the page
• Check if you're logged in
• Report inappropriate content

**Still Need Help?**
Contact our support team!`,
            buttons: [
              { label: "Contact Support", value: "contact" },
              { label: "Payment Help", value: "payment" },
              { label: "Back", value: "main" },
            ],
          }
          break

        case "contact":
          botResponse = {
            role: "bot",
            content: `📧 **Contact Support Team:**

**Email Support:**
📩 baizenamastura@gmail.com

**Response Time:**
• Monday-Friday: Within 24 hours
• Weekends: Within 48 hours
• Urgent issues: Same day response

**What to Include:**
• Your username (if logged in)
• Screenshot of issue (if applicable)
• Detailed description of problem
• Steps you've already tried

**For Faster Help:**
1. Check FAQ section first
2. Try troubleshooting steps above
3. Include all relevant details in email

**Alternative Support:**
• Visit our Footer for FAQ
• Check "About Us" for more info
• Review Privacy Policy
• Read Terms of Service

**Business Inquiries:**
For partnership or business opportunities, use the same email with subject "Business Inquiry"

We're here to help! 🌍💜`,
            buttons: [
              { label: "Back to Support", value: "support" },
              { label: "Main Menu", value: "main" },
            ],
          }
          break

        case "upgrade":
          botResponse = {
            role: "bot",
            content: `⬆️ **How to Upgrade to Pro:**

**Step 1:** Log in with Pi Network account
**Step 2:** Go to your User Dashboard
**Step 3:** Click "Upgrade to Pro" button
**Step 4:** Choose payment method:
   • Pi SDK Payment (instant)
   • Manual Payment (upload receipt)
**Step 5:** Complete payment of 0.0000318 Pi ($9.99)
**Step 6:** Pro features activate immediately!

**Pro Benefits Recap:**
✅ Unlimited merchant contact unlocks
✅ No pay-per-unlock fees
✅ Save hundreds in unlock costs
✅ Priority customer support
✅ Advanced search features
✅ Exclusive travel deals

**Value Comparison:**
• Individual unlock: $0.50 each
• After 20 unlocks: $10 spent
• Pro membership: $9.99 for UNLIMITED

Pro pays for itself after just 20 merchant unlocks!

Ready to upgrade?`,
            buttons: [
              { label: "Payment Questions", value: "payment" },
              { label: "Contact Support", value: "contact" },
              { label: "Back", value: "traveler_plans" },
            ],
          }
          break

        case "main":
          botResponse = {
            role: "bot",
            content: "Welcome back to the main menu! How can I assist you today?",
            buttons: [
              { label: "Subscription Plans", value: "subscriptions" },
              { label: "How to Use App", value: "howto" },
              { label: "Payment Questions", value: "payment" },
              { label: "Technical Support", value: "support" },
              { label: "Referral Program", value: "referral" },
            ],
          }
          break

        case "referral":
          botResponse = {
            role: "bot",
            content: `🎁 **Referral Program Details:**

**How it Works:**
1. Share your unique referral code with friends
2. When they sign up using your code and upgrade to Pro
3. You earn $2 credit instantly!

**Your Earnings:**
• $2 per successful referral
• Credits can be used for:
  - Merchant unlocks ($0.50 each)
  - Pro subscription payment ($9.99/month)
• No limit on referrals
• Track all earnings in your dashboard

Start sharing your code and earn rewards today!`,
            buttons: [
              { label: "View My Referral Code", value: "my_referral" },
              { label: "Payment Methods", value: "payment" },
              { label: "Back to Main Menu", value: "main" },
            ],
          }
          break

        default:
          botResponse = {
            role: "bot",
            content:
              "I'm not sure how to help with that specific question. Let me connect you with our main menu options:",
            buttons: [
              { label: "Subscription Plans", value: "subscriptions" },
              { label: "How to Use App", value: "howto" },
              { label: "Payment Questions", value: "payment" },
              { label: "Technical Support", value: "support" },
              { label: "Referral Program", value: "referral" },
            ],
          }
      }

      setMessages((prev) => [...prev, botResponse])
    }, 500)
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])

    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      let botResponse: Message = { role: "bot", content: "" }

      // Keyword detection for quick responses
      if (lowerInput.includes("subscription") || lowerInput.includes("plan") || lowerInput.includes("pricing")) {
        handleButtonClick("subscriptions")
        setInput("")
        return
      } else if (lowerInput.includes("payment") || lowerInput.includes("pay") || lowerInput.includes("pi wallet")) {
        handleButtonClick("payment")
        setInput("")
        return
      } else if (
        lowerInput.includes("how") ||
        lowerInput.includes("use") ||
        lowerInput.includes("guide") ||
        lowerInput.includes("tutorial")
      ) {
        handleButtonClick("howto")
        setInput("")
        return
      } else if (
        lowerInput.includes("problem") ||
        lowerInput.includes("issue") ||
        lowerInput.includes("help") ||
        lowerInput.includes("error") ||
        lowerInput.includes("not working")
      ) {
        handleButtonClick("support")
        setInput("")
        return
      } else if (
        lowerInput.includes("contact") ||
        lowerInput.includes("email") ||
        lowerInput.includes("support team")
      ) {
        handleButtonClick("contact")
        setInput("")
        return
      } else if (lowerInput.includes("unlock") || lowerInput.includes("contact info")) {
        handleButtonClick("unlock")
        setInput("")
        return
      } else if (lowerInput.includes("register") || lowerInput.includes("list my business")) {
        handleButtonClick("register")
        setInput("")
        return
      } else if (lowerInput.includes("community") || lowerInput.includes("forum") || lowerInput.includes("post")) {
        handleButtonClick("community")
        setInput("")
        return
      } else if (lowerInput.includes("message") || lowerInput.includes("chat") || lowerInput.includes("dm")) {
        handleButtonClick("messaging")
        setInput("")
        return
      } else if (lowerInput.includes("pro") || lowerInput.includes("upgrade")) {
        handleButtonClick("upgrade")
        setInput("")
        return
      } else if (lowerInput.includes("merchant plan") || lowerInput.includes("business plan")) {
        handleButtonClick("merchant_plans")
        setInput("")
        return
      } else if (lowerInput.includes("referral") || lowerInput.includes("earn")) {
        handleButtonClick("referral")
        setInput("")
        return
      } else {
        // General response for unrecognized questions
        botResponse = {
          role: "bot",
          content: `I understand you're asking about "${input}". Let me help you find the right information! Please choose from these topics:`,
          buttons: [
            { label: "Subscription Plans", value: "subscriptions" },
            { label: "How to Use App", value: "howto" },
            { label: "Payment Questions", value: "payment" },
            { label: "Technical Support", value: "support" },
            { label: "Contact Support Team", value: "contact" },
            { label: "Referral Program", value: "referral" },
          ],
        }
        setMessages((prev) => [...prev, botResponse])
      }
    }, 500)

    setInput("")
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[90vh] flex flex-col bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="bg-white">
                <AvatarFallback className="bg-white">
                  <HelpCircle className="h-5 w-5 text-green-600" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg text-white">Customer Support</CardTitle>
                <CardDescription className="flex items-center gap-1 text-green-100">
                  <span className="h-2 w-2 rounded-full bg-green-300 animate-pulse" />
                  Online 24/7
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-white text-foreground border border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>

              {message.buttons && (
                <div className="flex flex-wrap gap-2 justify-start ml-2">
                  {message.buttons.map((button, btnIndex) => (
                    <Button
                      key={btnIndex}
                      variant="outline"
                      size="sm"
                      onClick={() => handleButtonClick(button.value)}
                      className="bg-white hover:bg-green-50 border-green-600 text-green-700 text-xs"
                    >
                      {button.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>

        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1"
            />
            <Button onClick={handleSend} className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Ask about subscriptions, features, payments, technical issues, or the referral program
          </p>
        </div>
      </Card>
    </div>
  )
}
