import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Knotd",
  description:
    "Learn how Knotd collects, uses, and protects your personal information.",
};

const lastUpdated = "February 28, 2026";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="pt-40 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base text-dark-light/60">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="policy-content text-dark-light/70 leading-relaxed">
            <Section title="1. Introduction">
              <p>
                Welcome to Knotd (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;). We are committed to protecting your privacy and
                ensuring that your personal information is handled responsibly.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our mobile application
                and related services (collectively, the &quot;Service&quot;).
              </p>
              <p>
                By creating an account or using our Service, you agree to the
                collection and use of information in accordance with this
                policy. If you do not agree with this policy, please do not use
                our Service.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <h4>2.1 Information You Provide</h4>
              <ul>
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  phone number, date of birth, and gender when you create an
                  account.
                </li>
                <li>
                  <strong>Profile Information:</strong> Photos, bio, interests,
                  relationship preferences, and any other information you choose
                  to add to your profile.
                </li>
                <li>
                  <strong>Verification Data:</strong> Selfie photos or other
                  data submitted for profile verification purposes.
                </li>
                <li>
                  <strong>Communications:</strong> Messages you send and receive
                  through the Service, as well as any correspondence with our
                  support team.
                </li>
                <li>
                  <strong>Payment Information:</strong> If you purchase a
                  subscription, payment details are processed securely by our
                  third-party payment processors. We do not store full credit
                  card numbers.
                </li>
              </ul>

              <h4>2.2 Information Collected Automatically</h4>
              <ul>
                <li>
                  <strong>Location Data:</strong> With your permission, we
                  collect your approximate or precise location to show you
                  nearby users and enable location-based features.
                </li>
                <li>
                  <strong>Device Information:</strong> Device type, operating
                  system, unique device identifiers, browser type, and mobile
                  network information.
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with the
                  Service, including features used, actions taken, time spent,
                  and frequency of use.
                </li>
                <li>
                  <strong>Log Data:</strong> IP address, access times, pages
                  viewed, app crashes, and other diagnostic data.
                </li>
              </ul>

              <h4>2.3 Information from Third Parties</h4>
              <ul>
                <li>
                  <strong>Social Media:</strong> If you sign in using a social
                  media account, we may receive your name, email address, and
                  profile photo from that provider.
                </li>
                <li>
                  <strong>Analytics Providers:</strong> We may receive
                  aggregated analytics data from third-party services to improve
                  our app.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Create and manage your account</li>
                <li>
                  Provide, personalize, and improve the Service, including our
                  matching algorithm
                </li>
                <li>
                  Enable discovery features and show you relevant profiles based
                  on your preferences and location
                </li>
                <li>
                  Facilitate communication between users through messaging
                </li>
                <li>Process transactions and manage subscriptions</li>
                <li>
                  Send you important updates, security alerts, and support
                  messages
                </li>
                <li>
                  Send promotional communications (with your consent, and you
                  can opt out at any time)
                </li>
                <li>
                  Detect, investigate, and prevent fraudulent, unauthorized, or
                  illegal activity
                </li>
                <li>
                  Enforce our Terms of Service and Community Guidelines
                </li>
                <li>
                  Conduct research and analysis to improve our Service and
                  develop new features
                </li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            <Section title="4. How We Share Your Information">
              <p>
                We do not sell your personal information. We may share your data
                in the following circumstances:
              </p>
              <ul>
                <li>
                  <strong>With Other Users:</strong> Your profile information,
                  photos, and any content you choose to share are visible to
                  other users of the Service, subject to your privacy settings.
                </li>
                <li>
                  <strong>Service Providers:</strong> We work with trusted
                  third-party companies that help us operate, maintain, and
                  improve the Service (e.g., cloud hosting, analytics, payment
                  processing, customer support).
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your
                  information if required by law, regulation, legal process, or
                  governmental request.
                </li>
                <li>
                  <strong>Safety &amp; Protection:</strong> We may share
                  information when we believe it is necessary to protect the
                  safety, rights, or property of Knotd, our users, or the
                  public.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, or sale of assets, your information may be
                  transferred as part of that transaction.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your
                  information for other purposes with your explicit consent.
                </li>
              </ul>
            </Section>

            <Section title="5. Your Privacy Controls">
              <p>
                Knotd gives you meaningful control over your privacy. Through
                the app settings, you can:
              </p>
              <ul>
                <li>
                  <strong>Hide Active Status:</strong> Prevent others from
                  seeing when you are online.
                </li>
                <li>
                  <strong>Hide Your Age:</strong> Choose not to display your age
                  on your profile.
                </li>
                <li>
                  <strong>Hide Your Location:</strong> Prevent your distance or
                  location from being shown to other users.
                </li>
                <li>
                  <strong>Disable Read Receipts:</strong> Stop others from
                  knowing when you&apos;ve read their messages.
                </li>
                <li>
                  <strong>Hide from Discovery:</strong> Remove your profile from
                  the discovery feed entirely for as long as you like, while
                  keeping your existing conversations active.
                </li>
                <li>
                  <strong>Block &amp; Report:</strong> Block any user to prevent
                  them from contacting you or viewing your profile. All reports
                  are handled confidentially.
                </li>
              </ul>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We retain your personal information for as long as your account
                is active or as needed to provide you with the Service. If you
                delete your account, we will delete or anonymize your personal
                information within 30 days, except where we are required to
                retain it for legal, regulatory, or legitimate business
                purposes (such as resolving disputes or enforcing our
                agreements).
              </p>
              <p>
                Messages sent to other users may remain visible to those users
                even after your account is deleted, though your profile
                information will no longer be displayed.
              </p>
            </Section>

            <Section title="7. Data Security">
              <p>
                We take the security of your data seriously and implement
                appropriate technical and organizational measures to protect it,
                including:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>
                  Strict access controls limiting employee access to personal
                  data
                </li>
                <li>
                  Secure infrastructure hosted with industry-leading cloud
                  providers
                </li>
              </ul>
              <p>
                While we strive to protect your information, no method of
                transmission over the internet or electronic storage is 100%
                secure. We cannot guarantee absolute security, but we are
                committed to promptly addressing any security incidents.
              </p>
            </Section>

            <Section title="8. Children's Privacy">
              <p>
                Knotd is not intended for anyone under the age of 18. We do not
                knowingly collect personal information from children under 18.
                If we discover that a child under 18 has provided us with
                personal information, we will take immediate steps to delete
                that information. If you believe a minor has created an account,
                please contact us immediately.
              </p>
            </Section>

            <Section title="9. International Data Transfers">
              <p>
                Your information may be transferred to and processed in
                countries other than the one in which you reside. These
                countries may have data protection laws that differ from those
                in your jurisdiction. When we transfer your data internationally,
                we take appropriate safeguards to ensure your information
                remains protected in accordance with this Privacy Policy and
                applicable law.
              </p>
            </Section>

            <Section title="10. Your Rights">
              <p>
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul>
                <li>
                  <strong>Access:</strong> Request a copy of the personal data
                  we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request that we correct
                  inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Deletion:</strong> Request that we delete your
                  personal data, subject to certain exceptions.
                </li>
                <li>
                  <strong>Portability:</strong> Request a copy of your data in a
                  structured, machine-readable format.
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain types of
                  processing of your personal data.
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Where processing is based
                  on consent, you may withdraw it at any time.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the
                details in the &quot;Contact Us&quot; section below. We will
                respond to your request within 30 days.
              </p>
            </Section>

            <Section title="11. Third-Party Services">
              <p>
                Our Service may contain links to third-party websites, apps, or
                services that are not operated by us. We have no control over
                and assume no responsibility for the content, privacy policies,
                or practices of any third-party services. We encourage you to
                review the privacy policy of every site or service you interact
                with.
              </p>
            </Section>

            <Section title="12. Cookies and Tracking Technologies">
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience, analyze usage patterns, and deliver personalized
                content. You can manage your cookie preferences through your
                browser or device settings. Note that disabling certain cookies
                may affect the functionality of the Service.
              </p>
            </Section>

            <Section title="13. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or
                other factors. When we make material changes, we will notify you
                through the app or via email before the changes take effect. We
                encourage you to review this page periodically for the latest
                information on our privacy practices.
              </p>
            </Section>

            <Section title="14. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or how we handle your personal information,
                please contact us at:
              </p>
              <div className="rounded-2xl bg-rose-50/50 border border-rose-100/80 p-6 mt-4">
                <p className="font-semibold text-dark pb-2">Knotd</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:support@knotd-app.com"
                    className="text-primary hover:underline"
                  >
                    support@knotd-app.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a href="/" className="text-primary hover:underline">
                    www.knotd-app.com
                  </a>
                </p>
              </div>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-xl font-bold text-dark mb-5 pt-2">{title}</h2>
      <div className="space-y-4 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-dark [&_h4]:mt-8 [&_h4]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2.5 [&_li]:text-sm [&_p]:text-sm">
        {children}
      </div>
    </section>
  );
}
