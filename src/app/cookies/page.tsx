import Link from "next/link";
import { generatePageMeta } from "@/lib/metadata";

export const metadata = generatePageMeta(
  "Cookie Policy",
  "Understand how Shefa Real Estate uses cookies and similar technologies on our website. Learn about cookie types and how to manage your preferences."
);

export default function CookiePolicyPage() {
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
            <span className="text-white">Cookie Policy</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
            Cookie Policy
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
              This Cookie Policy explains how Shefa Real Estate
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses
              cookies and similar tracking technologies when you visit our
              website at www.shefarealestate.com. It explains what these
              technologies are, why we use them, and your rights to control
              their use.
            </p>

            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device
              (computer, tablet, or smartphone) when you visit a website. They
              are widely used to make websites work more efficiently, provide a
              better user experience, and supply information to the site owners.
            </p>
            <p>
              Cookies can be &ldquo;persistent&rdquo; (remaining on your device
              until they expire or you delete them) or &ldquo;session&rdquo;
              cookies (deleted when you close your browser). They can be set by
              the website you are visiting (&ldquo;first-party cookies&rdquo;)
              or by other websites whose content appears on the page
              (&ldquo;third-party cookies&rdquo;).
            </p>

            <h2>2. Types of Cookies We Use</h2>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are strictly necessary for the operation of our
              website. They enable core functionality such as page navigation,
              access to secure areas, and form submissions. The website cannot
              function properly without these cookies.
            </p>
            <ul>
              <li>
                <strong>Session management:</strong> maintains your browsing
                session as you move between pages.
              </li>
              <li>
                <strong>Security:</strong> helps protect against cross-site
                request forgery and other security threats.
              </li>
              <li>
                <strong>Preferences:</strong> remembers your cookie consent
                choice so you are not asked repeatedly.
              </li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our
              website by collecting and reporting information anonymously. This
              data allows us to improve the structure, content, and performance
              of our site.
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> tracks page views, session
                duration, bounce rate, and traffic sources. Data is anonymized
                and aggregated.
              </li>
              <li>
                <strong>Hotjar:</strong> records heatmaps and anonymized user
                session replays to help us understand how visitors navigate our
                property listings.
              </li>
            </ul>

            <h3>Marketing Cookies</h3>
            <p>
              These cookies are used to deliver advertisements relevant to you
              and your interests. They may also be used to limit the number of
              times you see an advertisement and to measure the effectiveness of
              advertising campaigns.
            </p>
            <ul>
              <li>
                <strong>Google Ads:</strong> enables us to show you targeted
                property advertisements on Google and partner websites based on
                your browsing history.
              </li>
              <li>
                <strong>Meta Pixel:</strong> allows us to measure the
                effectiveness of our Facebook and Instagram advertising
                campaigns and retarget website visitors.
              </li>
              <li>
                <strong>LinkedIn Insight Tag:</strong> tracks conversions from
                our LinkedIn campaigns targeting commercial real estate
                professionals and investors.
              </li>
            </ul>

            <h2>3. How to Manage Cookies</h2>
            <p>
              You have several options for managing cookies on your device:
            </p>
            <ul>
              <li>
                <strong>Browser settings:</strong> most web browsers allow you
                to control cookies through their settings. You can set your
                browser to block or delete cookies, or to notify you when a
                cookie is being set. The method varies by browser:
                <ul>
                  <li>
                    <strong>Chrome:</strong> Settings &gt; Privacy and Security
                    &gt; Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings &gt; Privacy &amp;
                    Security &gt; Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences &gt; Privacy &gt;
                    Manage Website Data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings &gt; Cookies and site
                    permissions &gt; Manage and delete cookies
                  </li>
                </ul>
              </li>
              <li>
                <strong>Opt-out tools:</strong> for analytics and advertising
                cookies, you can use the following opt-out mechanisms:
                <ul>
                  <li>
                    Google Analytics Opt-out Browser Add-on
                  </li>
                  <li>
                    Network Advertising Initiative Opt-out Page
                  </li>
                  <li>
                    Digital Advertising Alliance Consumer Choice Tool
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              Please note that disabling certain cookies may affect the
              functionality of our website. Essential cookies cannot be disabled
              as they are required for the site to operate.
            </p>

            <h2>4. Third-Party Cookies</h2>
            <p>
              Some cookies on our website are set by third-party services that
              appear on our pages. We do not control these third-party cookies
              and recommend reviewing the privacy policies of these providers:
            </p>
            <ul>
              <li>
                <strong>Google</strong> (Analytics, Ads, Maps) &mdash; used for
                website analytics, advertising, and embedding interactive
                property maps.
              </li>
              <li>
                <strong>Meta</strong> (Facebook, Instagram) &mdash; used for
                social media integration and advertising measurement.
              </li>
              <li>
                <strong>YouTube</strong> &mdash; used for embedding property tour
                videos on listing pages.
              </li>
              <li>
                <strong>Hotjar</strong> &mdash; used for user behavior analytics
                and session recording.
              </li>
            </ul>
            <p>
              These third parties may use the information collected through
              their cookies for their own purposes, including ad targeting
              across other websites.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie
              Policy, please contact us:
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
              For more information about how we handle your personal data,
              please see our{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
