import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">
            Refund Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">1. Overview</h2>
              <p className="text-foreground/80 leading-relaxed">
                At TripGo, we strive to provide you with the best travel booking experience. We understand that plans can change, and we have established this Refund Policy to ensure transparency and fairness. Please read this policy carefully before making any bookings.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">2. Flight Bookings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-xl">
                  <h3 className="font-semibold text-lg mb-2">Cancellation by Customer</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2">
                    <li>More than 72 hours before departure: Full refund minus ₹500 processing fee</li>
                    <li>24-72 hours before departure: 75% refund</li>
                    <li>Less than 24 hours before departure: 50% refund</li>
                    <li>No-show: No refund</li>
                  </ul>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  Note: Refund amounts are subject to airline policies, which may vary. Some promotional or discounted fares may be non-refundable.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">3. Hotel Bookings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-xl">
                  <h3 className="font-semibold text-lg mb-2">Standard Cancellation Policy</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2">
                    <li>More than 7 days before check-in: Full refund</li>
                    <li>3-7 days before check-in: 75% refund</li>
                    <li>1-3 days before check-in: 50% refund</li>
                    <li>Less than 24 hours or no-show: No refund</li>
                  </ul>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  Individual hotels may have different cancellation policies. The specific policy applicable to your booking will be displayed at the time of booking.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">4. Holiday Packages</h2>
              <div className="p-4 bg-muted rounded-xl">
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>More than 30 days before departure: Full refund minus 10% cancellation fee</li>
                  <li>15-30 days before departure: 70% refund</li>
                  <li>7-15 days before departure: 50% refund</li>
                  <li>Less than 7 days before departure: 25% refund</li>
                  <li>No-show: No refund</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">5. Train & Bus Bookings</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Train and bus cancellations are subject to the policies of Indian Railways and respective bus operators. TripGo will facilitate refunds as per the applicable carrier policies minus our service charges.
              </p>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-foreground/80">
                  <strong>Service Charge:</strong> ₹50 per passenger for processing cancellations
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">6. Visa Services</h2>
              <p className="text-foreground/80 leading-relaxed">
                Visa processing fees are non-refundable once the application has been submitted to the respective embassy or consulate. If your visa application is rejected, you may be eligible for a partial refund of our service fee only, excluding government fees and third-party charges.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">7. Travel Insurance</h2>
              <p className="text-foreground/80 leading-relaxed">
                Travel insurance policies have a free-look period of 15 days from the date of purchase. After this period, cancellation and refund terms are governed by the insurance provider's policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">8. Refund Process</h2>
              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal list-inside text-foreground/80 space-y-2 ml-4">
                  <li>Log in to your TripGo account</li>
                  <li>Go to "My Trips" section</li>
                  <li>Select the booking you wish to cancel</li>
                  <li>Click on "Cancel Booking" and follow the instructions</li>
                  <li>Alternatively, contact our customer support</li>
                </ol>
                <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <p className="text-foreground font-medium">Refund Timeline</p>
                  <p className="text-foreground/80 mt-2">
                    Approved refunds will be processed within 7-10 business days. The amount will be credited to the original payment method used during booking.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">9. Force Majeure</h2>
              <p className="text-foreground/80 leading-relaxed">
                In cases of unforeseen circumstances beyond our control (natural disasters, pandemics, government restrictions, civil unrest, etc.), we will work with our partners to provide the best possible resolution, which may include full refunds, rescheduling, or travel credits.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">10. Disputes</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you believe you are entitled to a refund that has been denied, you may escalate the matter by contacting our customer support team. All disputes will be reviewed on a case-by-case basis, and we will strive to reach a fair resolution.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                For refund-related queries, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-xl">
                <p className="text-foreground font-medium">TripGo Customer Support</p>
                <p className="text-foreground/80">Email: prabal@tuta.io</p>
                <p className="text-foreground/80">Phone: +91 6261302023</p>
                <p className="text-foreground/80">Available: Monday to Saturday, 9 AM - 6 PM IST</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
