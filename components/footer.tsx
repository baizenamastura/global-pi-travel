"use client"

import { useState } from "react"
import { Mail, FileText, Shield, ScrollText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Footer() {
  const [showAbout, setShowAbout] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  return (
    <>
      <footer className="bg-gradient-to-b from-background to-primary/5 border-t-2 border-primary/20 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button
                onClick={() => setShowAbout(true)}
                className="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
              >
                <FileText className="h-4 w-4" />
                About Us
              </button>
              <button
                onClick={() => setShowContact(true)}
                className="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </button>
              <button
                onClick={() => setShowPrivacy(true)}
                className="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
              >
                <Shield className="h-4 w-4" />
                Privacy
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
              >
                <ScrollText className="h-4 w-4" />
                Terms of Service
              </button>
              <button
                onClick={() => setShowDisclaimer(true)}
                className="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
              >
                <AlertCircle className="h-4 w-4" />
                Disclaimer
              </button>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <p className="text-sm text-foreground font-semibold">All rights reserved © 2025 Global Pi Travel</p>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              About Us
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            <section>
              <h3 className="font-bold text-base mb-2">Our Mission</h3>
              <p>
                Global Pi Travel is revolutionizing the global travel industry by connecting travelers with businesses
                that accept Pi cryptocurrency. We believe in creating a borderless payment ecosystem that makes travel
                more accessible, affordable, and seamless for everyone.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">What We Do</h3>
              <p>
                We provide a comprehensive global directory of Pi-accepting merchants including hotels, restaurants,
                tour operators, transportation services, and more. Our platform helps travelers discover and book
                services worldwide using Pi cryptocurrency, eliminating traditional banking barriers and currency
                exchange hassles.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Why Pi Cryptocurrency</h3>
              <p>
                Pi Network represents the future of digital payments - accessible, secure, and built for everyday
                transactions. By embracing Pi, we're empowering millions of travelers and merchants to participate in
                the digital economy without the complexity of traditional financial systems.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Our Vision</h3>
              <p>
                We envision a world where travelers can explore any destination with confidence, knowing they can pay
                with Pi anywhere they go. We're building the largest Pi-accepting merchant network globally, making
                cryptocurrency adoption practical and beneficial for the travel industry.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Join Our Community</h3>
              <p>
                Whether you're a traveler seeking new adventures or a merchant looking to expand your customer base,
                Global Pi Travel welcomes you. Together, we're creating a more connected, inclusive global travel
                ecosystem powered by Pi cryptocurrency.
              </p>
            </section>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground italic">All rights reserved © 2025 Global Pi Travel</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showContact} onOpenChange={setShowContact}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact Us
            </DialogTitle>
            <DialogDescription>Have questions or issues? We're here to help.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Name <span className="text-destructive">*</span>
              </label>
              <Input type="text" placeholder="Enter your name" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email <span className="text-destructive">*</span>
              </label>
              <Input type="email" placeholder="your.email@example.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Subject <span className="text-destructive">*</span>
              </label>
              <Input type="text" placeholder="What is this regarding?" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Message <span className="text-destructive">*</span>
              </label>
              <Textarea placeholder="Describe your question or issue in detail..." rows={5} />
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Email:</strong> baizenamastura@gmail.com
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (UTC)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We're here to help! Whether you're a traveler with questions or a merchant wanting to join our network,
                reach out to us anytime.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setShowContact(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold">Send Message</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy Policy
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            <section>
              <h3 className="font-bold text-base mb-2">Information We Collect</h3>
              <p>
                Global Pi Travel collects information that you provide directly to us, including but not limited to:
                name, email address, phone number, business information (for merchants), and transaction details. We
                also automatically collect certain information about your device and how you interact with our platform,
                including IP address, browser type, and usage patterns.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent activities</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Information Sharing</h3>
              <p>
                We do not sell your personal information. We may share your information with third parties only in the
                following circumstances: with your consent, to comply with legal obligations, to protect our rights and
                prevent fraud, with service providers who assist in our operations, or in connection with a business
                transaction such as a merger or acquisition.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Data Security</h3>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Your Rights</h3>
              <p>
                You have the right to access, update, or delete your personal information. You may also have the right
                to restrict or object to certain processing of your data. To exercise these rights, please contact us at
                baizenamastura@gmail.com.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Cookies and Tracking</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our platform and hold certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Children's Privacy</h3>
              <p>
                Our platform is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you become aware that a child has provided us with personal
                information, please contact us.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
                Privacy Policy periodically for any changes.
              </p>
            </section>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground italic">All rights reserved © 2025 Global Pi Travel</p>
              <p className="text-xs text-muted-foreground italic">Last Updated: January 2025</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-primary" />
              Terms of Service
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            <section>
              <h3 className="font-bold text-base mb-2">Acceptance of Terms</h3>
              <p>
                By accessing and using Global Pi Travel, you accept and agree to be bound by these Terms of Service. If
                you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Use of Platform</h3>
              <p>
                Global Pi Travel provides a directory and connection service between travelers and Pi-accepting
                merchants. You agree to use the platform only for lawful purposes and in accordance with these Terms.
                You are responsible for maintaining the confidentiality of your account and for all activities that
                occur under your account.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Merchant Listings</h3>
              <p>
                Merchants listed on our platform are independent third parties. Global Pi Travel does not operate,
                control, or endorse these businesses. All transactions between users and merchants are solely between
                those parties. We are not responsible for the quality, safety, or legality of services provided by
                listed merchants.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Pi Cryptocurrency Transactions</h3>
              <p>
                All Pi cryptocurrency transactions are subject to Pi Network's terms and conditions. Global Pi Travel is
                not responsible for Pi Network's operations, policies, or any issues related to Pi cryptocurrency
                transactions. Users assume all risks associated with using cryptocurrency for payments.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Merchant Registration</h3>
              <p>
                Merchants who register for listing on Global Pi Travel must provide accurate and complete information.
                Merchants are responsible for updating their information and complying with all applicable laws and
                regulations. Global Pi Travel reserves the right to remove any merchant listing at our discretion.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Intellectual Property</h3>
              <p>
                All content on Global Pi Travel, including text, graphics, logos, and software, is the property of
                Global Pi Travel or its content suppliers and is protected by intellectual property laws. You may not
                reproduce, distribute, or create derivative works from our content without express written permission.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Limitation of Liability</h3>
              <p>
                Global Pi Travel shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use of or inability to use the platform. Our total liability for any claims
                shall not exceed the amount you paid to us in the past twelve months.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Indemnification</h3>
              <p>
                You agree to indemnify and hold Global Pi Travel harmless from any claims, damages, losses, liabilities,
                and expenses arising from your use of the platform, your violation of these Terms, or your violation of
                any rights of another party.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Termination</h3>
              <p>
                We reserve the right to terminate or suspend your access to Global Pi Travel at any time, without prior
                notice or liability, for any reason, including breach of these Terms.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with applicable international laws. Any
                disputes arising from these Terms or use of the platform shall be resolved through binding arbitration.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Changes to Terms</h3>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by
                posting the new Terms on this page. Your continued use of the platform after such modifications
                constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Contact Information</h3>
              <p>If you have any questions about these Terms, please contact us at baizenamastura@gmail.com.</p>
            </section>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground italic">All rights reserved © 2025 Global Pi Travel</p>
              <p className="text-xs text-muted-foreground italic">Last Updated: January 2025</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Disclaimer
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            <section>
              <h3 className="font-bold text-base mb-2">General Information</h3>
              <p>
                Global Pi Travel is a platform that connects travelers with merchants who accept Pi cryptocurrency. The
                information provided on this platform is for general informational purposes only.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">No Warranties</h3>
              <p>
                We make no representations or warranties of any kind, express or implied, about the completeness,
                accuracy, reliability, suitability, or availability of the information, products, services, or related
                graphics contained on the platform.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Third-Party Services</h3>
              <p>
                Global Pi Travel acts as a directory and connection platform. We are not responsible for the quality of
                services provided by listed merchants, hotels, restaurants, or other businesses. All transactions and
                interactions with third-party merchants are solely between you and the merchant.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Pi Cryptocurrency</h3>
              <p>
                The use of Pi cryptocurrency for payments is subject to Pi Network's terms and conditions. Global Pi
                Travel is not affiliated with Pi Network and does not control Pi cryptocurrency transactions. Users are
                responsible for understanding the risks associated with cryptocurrency transactions.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Merchant Listings</h3>
              <p>
                Merchants listed on our platform are independently operated businesses. Global Pi Travel does not
                guarantee the availability, quality, or legality of their services. We recommend conducting your own
                research before engaging with any merchant.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Limitation of Liability</h3>
              <p>
                In no event will Global Pi Travel be liable for any loss or damage including without limitation,
                indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or
                profits arising out of, or in connection with, the use of this platform.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Travel Risks</h3>
              <p>
                Travel involves inherent risks. Users are responsible for obtaining appropriate travel insurance,
                checking visa requirements, understanding local laws and customs, and taking necessary health
                precautions before traveling.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">Changes to Disclaimer</h3>
              <p>
                Global Pi Travel reserves the right to update this disclaimer at any time without prior notice.
                Continued use of the platform constitutes acceptance of the updated disclaimer.
              </p>
            </section>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground italic">All rights reserved © 2025 Global Pi Travel</p>
              <p className="text-xs text-muted-foreground italic">Last Updated: January 2025</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
