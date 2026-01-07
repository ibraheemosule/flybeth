"use client";

import { Shield, Lock, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-primary text-sm">Privacy & Security</span>
          </div>
          <h1 className="mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we
            collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last Updated: December 1, 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8"
        >
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2>Information We Collect</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, and contact information</li>
                <li>
                  Payment information (processed securely through our payment
                  partners)
                </li>
                <li>Travel preferences and booking history</li>
                <li>Communication preferences and feedback</li>
              </ul>
              <p>
                We also automatically collect certain information about your
                device and how you interact with our services, including IP
                address, browser type, and usage data.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-accent" />
              </div>
              <h2>How We Use Your Information</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process your bookings and provide travel services</li>
                <li>
                  Communicate with you about your reservations and updates
                </li>
                <li>
                  Send you promotional offers and personalized recommendations
                  (with your consent)
                </li>
                <li>Improve our services and develop new features</li>
                <li>Detect and prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h2>Information Sharing</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Travel Partners:</strong> Airlines, hotels, and other
                  service providers to fulfill your bookings
                </li>
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who
                  help us operate our platform (payment processors, customer
                  support, analytics)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect our rights and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with
                  mergers, acquisitions, or sale of assets
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties for
                their marketing purposes.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <h2>Data Security</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We implement industry-standard security measures to protect your
                personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>
                  Restricted access to personal information on a need-to-know
                  basis
                </li>
                <li>
                  Secure payment processing through PCI-compliant partners
                </li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100%
                secure. While we strive to protect your data, we cannot
                guarantee absolute security.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">Your Rights and Choices</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Update or correct inaccurate information</li>
                <li>
                  Request deletion of your data (subject to legal requirements)
                </li>
                <li>Opt-out of marketing communications</li>
                <li>Disable cookies through your browser settings</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:privacy@flybeth.com"
                  className="text-primary hover:underline"
                >
                  privacy@flybeth.com
                </a>
                .
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">Cookies and Tracking</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our platform. These help us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Personalize content and advertisements</li>
                <li>Improve platform performance and functionality</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings, though
                this may affect some features of our service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">Children's Privacy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our services are not directed to children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If you become aware that a child has provided us with
                personal information, please contact us immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">International Data Transfers</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Your information may be transferred to and processed in
                countries other than your country of residence. These countries
                may have data protection laws different from your jurisdiction.
                We ensure appropriate safeguards are in place to protect your
                information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">Changes to This Policy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or applicable laws. We will notify you
                of any material changes by posting the new policy on our website
                and updating the "Last Updated" date.
              </p>
            </div>
          </section>

          <section className="border-t pt-8">
            <h2 className="mb-4">Contact Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@flybeth.com"
                    className="text-primary hover:underline"
                  >
                    privacy@flybeth.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> 1-800-FLYBETH (1-800-359-2384)
                </p>
                <p>
                  <strong>Address:</strong> Flybeth Inc., 123 Travel Lane, San
                  Francisco, CA 94105
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
