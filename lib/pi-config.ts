export const piConfig = {
  apiKey: process.env.NEXT_PUBLIC_PI_API_KEY || "pyrd9grcke0xc1umvdzzt8lgyrbcnozdy6upuvf649iqrwpl5ueueuwtenyez5wo",
  domain: process.env.NEXT_PUBLIC_PI_DOMAIN || "https://global-pi-travel.vercel.app",
  sandboxMode: true, // Set to true for testing, false for production
  // App wallet for SDK payments
  appWalletAddress: "GDEZMXC4H2RTFJTKBJ4JSYL2LCQAQW5F4GO5F34PPOPFAN5EOP34BAR6",
  // Personal wallet for manual payments
  personalWalletAddress: "GDV4XJJL6DH4G7LAO25DUFW4AEXLRNGZEYHH254NTCRO7MLKT5DIULYO",
}

export function initializePiSdk() {
  if (typeof window !== "undefined" && (window as any).Pi) {
    try {
      ;(window as any).Pi.init({
        version: "2.0",
        sandbox: true,
      })
      console.log("[v0] Pi SDK initialized with sandbox mode: true")
    } catch (error) {
      console.error("[v0] Failed to initialize Pi SDK:", error)
    }
  } else {
    console.warn("[v0] Pi SDK not available - must be opened in Pi Browser")
  }
}
