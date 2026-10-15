import Link from "next/link";
import { generatePageMeta } from "@/lib/metadata";

export const metadata = generatePageMeta(
  "Privacy Policy",
  "Learn how Shefa Real Estate collects, uses, and protects your personal information. Our privacy policy outlines your rights and our data handling practices."
);

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Mini Hero */}
      <section className="relative bg-brand-navy py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-brand-slate text-sm mb-10">
            Last Updated: January 2025
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-p:text-brand-slate prose-li:text-brand-slate prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-navy">
            <p>
              Shefa Real Estate (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) is committed to protecting the privacy and
              security of your personal information. This Privacy Policy
              describes how we collect, use, store, and share information when
              you visit our website, use our services, or interact with us in
              any way.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, as well as
              information collected automatically when you use our website.
            </p>
            <h3>Personal Information You Provide</h3>
            <ul>
              <li>
                <strong>Contact details:</strong> name, email address, phone
                number, and mailing address when you submit inquiry forms,
                schedule viewings, or register for an account.
              </li>
              <li>
                <strong>Property preferences:</strong> budget range, preferred
                locations, property type, and bedroom requirements.
              </li>
              <li>
                <strong>Financial information:</strong> proof of funds or
                mortgage pre-approval documents when required during a
                transaction.
              </li>
              <li>
                <strong>Identity documents:</strong> passport or Emirates ID
                copies required for property transactions under UAE law.
              </li>
              <li>
                <strong>Communications:</strong> records of emails, phone calls,
                and messages exchanged with our agents.
              </li>
            </ul>
            <h3>Information Collected Automatically</h3>
            <ul>
              <li>
                <strong>Device and browser data:</strong> IP address, browser
                type, operating system, and screen resolution.
              </li>
              <li>
                <strong>Usage data:</strong> pages visited, time spent on each
                page, referral sources, and click patterns.
              </li>
              <li>
                <strong>Cookies and tracking technologies:</strong> as described
                in our{" "}
                <Link href="/cookies">Cookie Policy</Link>.
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>
                Provide, maintain, and improve our real estate services,
                including property searches, valuations, and transaction support.
              </li>
              <li>
                Respond to your inquiries and provide personalized property
                recommendations based on your preferences.
              </li>
              <li>
                Send you market reports, new listing alerts, and promotional
                materials where you have opted in to receive them.
              </li>
              <li>
                Process property transactions and comply with legal obligations
                under UAE real estate regulations.
              </li>
              <li>
                Analyze website usage patterns to enhance user experience and
                optimize our digital platforms.
              </li>
              <li>
                Prevent fraud, enforce our terms of service, and protect the
                rights, property, and safety of our users and the public.
              </li>
            </ul>

            <h2>3. Cookie Policy</h2>
            <p>
              Our website uses cookies and similar technologies to enhance your
              browsing experience, analyze site traffic, and personalize content.
              For detailed information about the types of cookies we use and how
              to manage your preferences, please review our dedicated{" "}
              <Link href="/cookies">Cookie Policy</Link>.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              personal information, including:
            </p>
            <ul>
              <li>
                SSL/TLS encryption for all data transmitted between your browser
                and our servers.
              </li>
              <li>
                Secure, access-controlled storage of sensitive documents such as
                identity papers and financial records.
              </li>
              <li>
                Regular security audits and vulnerability assessments of our
                systems.
              </li>
              <li>
                Staff training on data protection best practices and
                confidentiality obligations.
              </li>
            </ul>
            <p>
              While we take every reasonable precaution, no method of electronic
              transmission or storage is completely secure. We cannot guarantee
              absolute security of your data.
            </p>

            <h2>5. Third-Party Disclosure</h2>
            <p>
              We do not sell your personal information to third parties. We may
              share your information with:
            </p>
            <ul>
              <li>
                <strong>Service providers:</strong> trusted partners who assist
                us with website hosting, analytics, email delivery, and CRM
                services, all bound by strict data protection agreements.
              </li>
              <li>
                <strong>Legal and regulatory bodies:</strong> the Dubai Land
                Department (DLD), Real Estate Regulatory Agency (RERA), and
                other authorities when required by law or to facilitate property
                transactions.
              </li>
              <li>
                <strong>Transaction counterparties:</strong> buyers, sellers,
                landlords, or tenants as necessary to complete a property
                transaction you are involved in.
              </li>
              <li>
                <strong>Professional advisors:</strong> legal counsel, auditors,
                and financial advisors in connection with business operations.
              </li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>
              Under applicable data protection laws, you have the right to:
            </p>
            <ul>
              <li>
                <strong>Access:</strong> request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Rectification:</strong> request correction of any
                inaccurate or incomplete data.
              </li>
              <li>
                <strong>Erasure:</strong> request deletion of your personal data,
                subject to legal retention requirements.
              </li>
              <li>
                <strong>Restriction:</strong> request that we limit the
                processing of your data in certain circumstances.
              </li>
              <li>
                <strong>Objection:</strong> object to the processing of your data
                for direct marketing purposes.
              </li>
              <li>
                <strong>Portability:</strong> request transfer of your data to
                another service provider in a structured, machine-readable
                format.
              </li>
              <li>
                <strong>Withdraw consent:</strong> where processing is based on
                consent, withdraw that consent at any time without affecting the
                lawfulness of prior processing.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details provided below.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to
              exercise your data protection rights, please contact us:
            </p>
            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@shefarealestate.com">
                  privacy@shefarealestate.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+97145551234">+971 4 555 1234</a>
              </li>
              <li>
                <strong>Office:</strong> Shefa Real Estate, Business Bay, Dubai,
                United Arab Emirates
              </li>
            </ul>
            <p>
              You may also visit our{" "}
              <Link href="/contact">Contact page</Link>{" "}
              to submit an inquiry directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
