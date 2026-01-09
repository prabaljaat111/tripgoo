import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

const PrivacyPolicyPage = () => {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-foreground/80 leading-relaxed">
                Welcome to TripGo, a product of Roxone PVT LTD. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our travel booking services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Travel preferences and booking history</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Passport and visa details (when required for bookings)</li>
                <li>Communication preferences</li>
                <li>Feedback and correspondence</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Process and manage your travel bookings</li>
                <li>Provide personalized travel recommendations using our AI Copilot</li>
                <li>Send booking confirmations and travel updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our services and develop new features</li>
                <li>Send promotional offers (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">4. Information Sharing</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may share your information with third parties only in the following circumstances: with airlines, hotels, and other travel service providers to complete your bookings; with payment processors to handle transactions; with legal authorities when required by law; and with service providers who assist us in operating our platform. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-foreground/80 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
              <p className="text-foreground/80 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our platform. These help us remember your preferences, analyze site traffic, and personalize content. You can control cookie settings through your browser, though disabling cookies may affect some functionality.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">7. Your Rights</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">8. Data Retention</h2>
              <p className="text-foreground/80 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Booking records are typically retained for 7 years for legal and accounting purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-xl">
                <p className="text-foreground font-medium">Roxone PVT LTD</p>
                <p className="text-foreground/80">Email: prabal@tuta.io</p>
                <p className="text-foreground/80">Phone: +91 6261302023</p>
                <p className="text-foreground/80">Location: India</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
