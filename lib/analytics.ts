export const analytics = {
  // Track page views
  trackPageView: (page: string) => {
    if (typeof window !== "undefined") {
      console.log("[v0] Analytics - Page View:", page)
      // Integration point for Google Analytics, Vercel Analytics, etc.
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_path: page,
        })
      }
    }
  },

  // Track user actions
  trackEvent: (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== "undefined") {
      console.log("[v0] Analytics - Event:", { action, category, label, value })
      // Integration point for Google Analytics, Vercel Analytics, etc.
      if (window.gtag) {
        window.gtag("event", action, {
          event_category: category,
          event_label: label,
          value: value,
        })
      }
    }
  },

  // Track Pi payments
  trackPiPayment: (amount: string, merchantName: string, merchantId: number) => {
    if (typeof window !== "undefined") {
      console.log("[v0] Analytics - Pi Payment:", { amount, merchantName, merchantId })
      if (window.gtag) {
        window.gtag("event", "pi_payment", {
          event_category: "payment",
          event_label: merchantName,
          value: Number.parseFloat(amount),
        })
      }
    }
  },

  // Track user registration
  trackUserRegistration: (username: string) => {
    if (typeof window !== "undefined") {
      console.log("[v0] Analytics - User Registration:", username)
      if (window.gtag) {
        window.gtag("event", "sign_up", {
          method: "pi_network",
        })
      }
    }
  },

  // Track search queries
  trackSearch: (query: string, category: string) => {
    if (typeof window !== "undefined") {
      console.log("[v0] Analytics - Search:", { query, category })
      if (window.gtag) {
        window.gtag("event", "search", {
          search_term: query,
          search_category: category,
        })
      }
    }
  },
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
