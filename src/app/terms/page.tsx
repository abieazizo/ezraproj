import Link from "next/link";
import { generatePageMeta } from "@/lib/metadata";

export const metadata = generatePageMeta(
  "Terms of Service",
  "Read the Terms of Service for Shefa Real Estate. Understand your rights and responsibilities when using our website and real estate services in Dubai."
);

export default function TermsOfServicePage() {
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
            <span className="text-white">Terms of Service</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
            Terms of Service
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
              Welcome to Shefa Real Estate. These Terms of Service
              (&ldquo;Terms&rdquo;) govern your access to and use of our
              website, mobile applications, and all related services
              (collectively, the &ldquo;Services&rdquo;). By accessing or using
              our Services, you agree to be bound by these Terms. If you do not
              agree, please do not use our Services.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing this website or engaging our real estate services, you
              confirm that you are at least 18 years of age and have the legal
              capacity to enter into a binding agreement. If you are using our
              Services on behalf of a company or other legal entity, you
              represent that you have the authority to bind that entity to these
              Terms.
            </p>
            <p>
              Your continued use of the Services following the posting of
              changes to these Terms constitutes your acceptance of those
              changes. We encourage you to review these Terms periodically.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              Shefa Real Estate provides real estate brokerage, consultancy, and
              related services in the Dubai property market, including but not
              limited to:
            </p>
            <ul>
              <li>
                Property sales and purchase facilitation for residential and
                commercial properties.
              </li>
              <li>
                Rental and leasing services for tenants and landlords.
              </li>
              <li>
                Property valuation and market analysis reports.
              </li>
              <li>
                Off-plan investment advisory and project consultancy.
              </li>
              <li>
                Property management referral services.
              </li>
            </ul>
            <p>
              Our Services are informational and consultative in nature. We act
              as licensed intermediaries and do not guarantee the completion of
              any transaction.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>When using our Services, you agree to:</p>
            <ul>
              <li>
                Provide accurate, current, and complete information in all forms,
                inquiries, and communications.
              </li>
              <li>
                Not use the Services for any unlawful purpose or in violation of
                any applicable local, national, or international laws.
              </li>
              <li>
                Not attempt to gain unauthorized access to any part of the
                Services, other users&apos; accounts, or our computer systems.
              </li>
              <li>
                Not reproduce, duplicate, copy, sell, resell, or exploit any
                portion of the Services without our express written permission.
              </li>
              <li>
                Not use automated scripts, bots, or scrapers to access or
                collect data from our website.
              </li>
              <li>
                Conduct yourself professionally and respectfully in all
                interactions with our agents and staff.
              </li>
            </ul>

            <h2>4. Property Listings Disclaimer</h2>
            <p>
              While we make every effort to ensure the accuracy of property
              listings on our website, including descriptions, photographs,
              floor plans, pricing, and availability:
            </p>
            <ul>
              <li>
                All listings are provided for general information purposes only
                and do not constitute an offer or contract.
              </li>
              <li>
                Prices, availability, and property details are subject to change
                without notice and should be verified directly with our agents.
              </li>
              <li>
                Photographs and virtual tours may not reflect the current
                condition of a property. Furnishings and decorative items shown
                in images are not necessarily included.
              </li>
              <li>
                Floor plans and area measurements are approximate and should not
                be relied upon for exact dimensions.
              </li>
              <li>
                We do not guarantee that any property shown on our website is
                still available at the time of your inquiry.
              </li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text,
              graphics, logos, images, photographs, video, audio, data
              compilations, software, and design, is the property of Shefa Real
              Estate or its content suppliers and is protected by UAE and
              international copyright, trademark, and intellectual property
              laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works
              from, publicly display, or otherwise exploit any content from our
              website without prior written consent, except for personal,
              non-commercial use such as printing a property listing for your
              reference.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law:
            </p>
            <ul>
              <li>
                Shefa Real Estate, its directors, employees, and agents shall
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising out of or relating to
                your use of our Services.
              </li>
              <li>
                We do not guarantee uninterrupted or error-free operation of our
                website and shall not be liable for any temporary unavailability
                or technical issues.
              </li>
              <li>
                Our total liability for any claim arising from the use of our
                website shall not exceed the amount you have paid to us, if any,
                in the twelve months preceding the claim.
              </li>
              <li>
                We are not liable for any loss resulting from reliance on
                information provided on our website, including property
                valuations, market forecasts, and investment returns.
              </li>
            </ul>

            <h2>7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the United Arab Emirates and the Emirate of Dubai. Any
              dispute arising out of or in connection with these Terms shall be
              subject to the exclusive jurisdiction of the courts of Dubai,
              unless otherwise required by applicable consumer protection laws.
            </p>
            <p>
              For matters relating to real estate transactions, the regulations
              and directives of the Dubai Land Department (DLD) and the Real
              Estate Regulatory Agency (RERA) shall apply in addition to these
              Terms.
            </p>

            <h2>8. Amendments</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. When we make material changes, we will
              update the &ldquo;Last Updated&rdquo; date at the top of this page
              and, where appropriate, notify you via email or a prominent notice
              on our website.
            </p>
            <p>
              Changes become effective immediately upon posting unless otherwise
              stated. Your continued use of the Services after changes are
              posted constitutes your acceptance of the revised Terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              If you have questions or concerns about these Terms of Service,
              please contact us:
            </p>
            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:legal@shefarealestate.com">
                  legal@shefarealestate.com
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
              You may also reach us through our{" "}
              <Link href="/contact">Contact page</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
