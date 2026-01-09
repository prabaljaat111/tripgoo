import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

const TermsPage = () => {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                Welcome to TripGo, operated by Roxone PVT LTD. By accessing or using our website, mobile application, or any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">2. Definitions</h2>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li><strong>"Platform"</strong> refers to the TripGo website, mobile app, and related services</li>
                <li><strong>"User"</strong> refers to any person who accesses or uses our Platform</li>
                <li><strong>"Services"</strong> refers to all travel booking and related services offered through our Platform</li>
                <li><strong>"Booking"</strong> refers to any reservation made through our Platform</li>
                <li><strong>"Service Providers"</strong> refers to airlines, hotels, transport operators, and other travel service providers</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">3. Eligibility</h2>
              <p className="text-foreground/80 leading-relaxed">
                You must be at least 18 years old to use our Services. By using our Platform, you represent and warrant that you are of legal age to form a binding contract and meet all eligibility requirements. If you are using our Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">4. Account Registration</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                To access certain features, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">5. Booking and Payments</h2>
              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  When you make a booking through TripGo:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                  <li>You agree to pay all charges associated with your booking</li>
                  <li>Prices are displayed in Indian Rupees (INR) unless otherwise specified</li>
                  <li>All payments are processed through secure payment gateways</li>
                  <li>Booking confirmation is subject to availability and payment clearance</li>
                  <li>We reserve the right to cancel bookings if payment fails or fraud is suspected</li>
                </ul>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-foreground/80">
                    <strong>Important:</strong> TripGo acts as an intermediary between you and the Service Providers. The contract for travel services is directly between you and the respective Service Provider.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">6. Cancellations and Refunds</h2>
              <p className="text-foreground/80 leading-relaxed">
                Cancellations and refunds are governed by our Refund Policy and the specific terms of each Service Provider. Please review the cancellation terms before completing your booking. We recommend purchasing travel insurance to protect against unforeseen circumstances.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">7. User Responsibilities</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                As a user of our Platform, you agree to:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Provide valid travel documents (passport, visa, ID) as required</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use the Platform for any unlawful purpose</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not interfere with the proper functioning of the Platform</li>
                <li>Not upload malicious content or engage in harmful activities</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">8. AI Copilot Services</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our AI Copilot provides travel recommendations and assistance. While we strive for accuracy, AI-generated suggestions are for informational purposes only. Users should verify all information independently. TripGo is not liable for decisions made based solely on AI recommendations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">9. Intellectual Property</h2>
              <p className="text-foreground/80 leading-relaxed">
                All content on TripGo, including but not limited to text, graphics, logos, images, software, and trademarks, is the property of Roxone PVT LTD or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">10. Limitation of Liability</h2>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="text-foreground/80 leading-relaxed">
                  TripGo and Roxone PVT LTD shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services. Our total liability shall not exceed the amount paid by you for the specific booking in question. We are not responsible for the acts, errors, or omissions of Service Providers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">11. Indemnification</h2>
              <p className="text-foreground/80 leading-relaxed">
                You agree to indemnify, defend, and hold harmless TripGo, Roxone PVT LTD, and their officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">12. Third-Party Links</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our Platform may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these third parties. Your interactions with third-party services are solely between you and that third party.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">13. Modifications to Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective upon posting on our Platform. Your continued use of our Services after any modifications constitutes acceptance of the updated Terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">14. Termination</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may suspend or terminate your access to our Services at any time, with or without cause, with or without notice. Upon termination, your right to use our Services will immediately cease. Provisions that by their nature should survive termination shall remain in effect.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">15. Governing Law and Disputes</h2>
              <p className="text-foreground/80 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our Services shall be subject to the exclusive jurisdiction of the courts in India. We encourage users to contact us first to resolve any disputes amicably.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">16. Severability</h2>
              <p className="text-foreground/80 leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">17. Contact Information</h2>
              <p className="text-foreground/80 leading-relaxed">
                For any questions or concerns regarding these Terms, please contact us:
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

export default TermsPage;
