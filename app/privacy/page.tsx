export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-muted-foreground">Last updated: January 2026</p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            Global Pi Travel collects information through Pi Network's secure authentication system. When you log in, we
            receive your Pi Network username and unique user ID. We also collect information you provide when
            registering as a merchant, including business name, location, services offered, and contact information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain the Global Pi Travel directory service</li>
            <li>Process Pi cryptocurrency payments through Pi Network</li>
            <li>Connect travelers with verified merchants worldwide</li>
            <li>Display merchant listings and services</li>
            <li>Communicate important updates about bookings and services</li>
            <li>Improve our platform and user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Pi Network Integration</h2>
          <p>
            Our app uses Pi Network's official SDK for authentication and payments. All users are verified through Pi
            Network's KYC system. We do not store your Pi Network password or private keys. Payment transactions are
            processed securely through Pi Network's infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Information Sharing</h2>
          <p>We do not sell your personal information. Your information may be shared with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Merchants you book services with (only booking-related information)</li>
            <li>Pi Network for payment processing and authentication</li>
            <li>Service providers who help us operate the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
          <p>
            We implement security measures to protect your information. All data is transmitted securely, and we use Pi
            Network's verified authentication system. However, no method of transmission over the internet is 100%
            secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your account</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies and Tracking</h2>
          <p>
            We use local storage to maintain your login session and improve user experience. We may use analytics to
            understand how users interact with our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
          <p>
            Our service is not directed to individuals under 18. We do not knowingly collect information from children.
            Users must be verified Pi Network Pioneers with completed KYC.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify users of significant changes through the
            platform or via Pi Network notifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through the Global Pi Travel platform or
            via our support channels.
          </p>
        </section>
      </div>
    </div>
  )
}
