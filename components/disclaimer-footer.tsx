"use client"

export function DisclaimerFooter() {
  return (
    <div className="bg-muted/30 border-t border-border mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center space-y-3">
          <h3 className="text-base font-semibold text-foreground">Disclaimer</h3>
          <div className="text-sm text-muted-foreground space-y-2 max-w-3xl mx-auto">
            <p>
              Global Pi Travel is a platform connecting Pi cryptocurrency users with merchants accepting Pi payment. We
              do not guarantee the quality, accuracy, or availability of services provided by listed merchants.
            </p>
            <p>
              All transactions and bookings are made directly between users and merchants. Global Pi Travel acts solely
              as a directory service and is not responsible for any disputes, cancellations, or issues arising from
              transactions.
            </p>
            <p>
              Listing fees and subscription charges are non-refundable. Prices and terms are subject to change without
              prior notice. Merchants are responsible for maintaining accurate business information.
            </p>
            <p className="font-medium">
              By using this platform, you agree to conduct transactions at your own risk. Please verify merchant details
              independently before making payments or bookings.
            </p>
          </div>
          <div className="text-xs text-muted-foreground pt-2">
            <p>&copy; 2025 Global Pi Travel. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
