import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Knotd",
  description:
    "Read the terms and conditions that govern your use of the Knotd dating application.",
};

const lastUpdated = "February 28, 2026";

export default function TermsAndConditions() {
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
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-base text-dark-light/60">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="policy-content text-dark-light/70 leading-relaxed">
            <Section title="1. Acceptance of Terms">
              <p>
                Welcome to Knotd. These Terms and Conditions (&quot;Terms&quot;)
                govern your access to and use of the Knotd mobile application,
                website, and all related services (collectively, the
                &quot;Service&quot;) provided by Knotd (&quot;we,&quot;
                &quot;our,&quot; or &quot;us&quot;).
              </p>
              <p>
                By creating an account, accessing, or using the Service, you
                agree to be bound by these Terms. If you do not agree to these
                Terms, do not use the Service. We may update these Terms from
                time to time, and your continued use of the Service after any
                changes constitutes your acceptance of the updated Terms.
              </p>
            </Section>

            <Section title="2. Eligibility">
              <p>To use Knotd, you must:</p>
              <ul>
                <li>Be at least 18 years of age</li>
                <li>
                  Be legally capable of entering into a binding contract
                </li>
                <li>
                  Not be prohibited from using the Service under any applicable
                  law
                </li>
                <li>
                  Not have been previously banned or removed from the Service
                </li>
                <li>
                  Not be a registered sex offender in any jurisdiction
                </li>
              </ul>
              <p>
                By using the Service, you represent and warrant that you meet
                all of these eligibility requirements. We reserve the right to
                verify your eligibility at any time and may terminate your
                account if you do not meet these requirements.
              </p>
            </Section>

            <Section title="3. Your Account">
              <p>
                You are responsible for maintaining the confidentiality of your
                login credentials and for all activities that occur under your
                account. You agree to:
              </p>
              <ul>
                <li>
                  Provide accurate, current, and complete information during
                  registration and keep your profile up to date
                </li>
                <li>
                  Not create more than one account per person
                </li>
                <li>
                  Not share your account or transfer it to another person
                </li>
                <li>
                  Notify us immediately if you suspect unauthorized access to
                  your account
                </li>
                <li>
                  Not use another user&apos;s account without their permission
                </li>
              </ul>
              <p>
                We reserve the right to suspend or terminate your account at any
                time, with or without notice, for conduct that we determine
                violates these Terms, is harmful to other users, or is otherwise
                detrimental to Knotd.
              </p>
            </Section>

            <Section title="4. Community Guidelines">
              <p>
                Knotd is a platform for genuine connections. To keep our
                community safe and respectful, you agree not to:
              </p>
              <ul>
                <li>
                  Misrepresent your identity, age, or affiliations, or create a
                  false or misleading profile
                </li>
                <li>
                  Use the Service for any commercial purpose, including
                  soliciting, advertising, or promoting products or services
                </li>
                <li>
                  Harass, bully, stalk, intimidate, threaten, or defame any
                  other user
                </li>
                <li>
                  Post or transmit content that is hateful, discriminatory,
                  violent, obscene, or otherwise objectionable
                </li>
                <li>
                  Share or distribute sexually explicit material without consent
                </li>
                <li>
                  Engage in any form of fraud, scam, or deceptive practices
                </li>
                <li>
                  Collect, harvest, or store personal data of other users
                  without their consent
                </li>
                <li>
                  Use automated systems, bots, or scripts to interact with the
                  Service
                </li>
                <li>
                  Attempt to reverse-engineer, decompile, or extract the source
                  code of the Service
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of the
                  Service
                </li>
              </ul>
              <p>
                Violations of these guidelines may result in content removal,
                account suspension, or permanent ban at our sole discretion.
              </p>
            </Section>

            <Section title="5. User Content">
              <p>
                You retain ownership of all content you post, upload, or share
                on the Service (&quot;User Content&quot;), including photos,
                text, and profile information. By submitting User Content, you
                grant Knotd a worldwide, non-exclusive, royalty-free,
                transferable license to use, display, reproduce, modify, and
                distribute your User Content solely for the purpose of
                operating, developing, and improving the Service.
              </p>
              <p>You represent and warrant that:</p>
              <ul>
                <li>
                  You own or have the necessary rights and permissions to post
                  your User Content
                </li>
                <li>
                  Your User Content does not infringe upon the intellectual
                  property, privacy, or other rights of any third party
                </li>
                <li>
                  Your User Content complies with these Terms and all applicable
                  laws
                </li>
              </ul>
              <p>
                We do not claim ownership of your User Content, but we may
                remove any content that violates these Terms or our Community
                Guidelines without prior notice.
              </p>
            </Section>

            <Section title="6. Matching and Interactions">
              <p>
                Knotd provides features that allow users to discover, match, and
                communicate with one another. You acknowledge that:
              </p>
              <ul>
                <li>
                  We do not guarantee any specific results from using the
                  Service, including matches, messages, or dates
                </li>
                <li>
                  We are not responsible for the behavior, actions, or content of
                  other users, whether online or offline
                </li>
                <li>
                  You interact with other users at your own risk, and you should
                  exercise caution and good judgment in all interactions
                </li>
                <li>
                  We do not conduct criminal background checks on users, though
                  we may verify certain profile information
                </li>
              </ul>
            </Section>

            <Section title="7. Super Likes and Rewinds">
              <p>
                Knotd provides free Super Likes on a weekly basis and unlimited
                Rewinds to all users. These features are subject to the
                following:
              </p>
              <ul>
                <li>
                  Super Likes are refreshed weekly and cannot be accumulated or
                  transferred between accounts
                </li>
                <li>
                  Rewinds are unlimited and allow you to revisit profiles you
                  may have passed on
                </li>
                <li>
                  We reserve the right to modify the availability, frequency, or
                  functionality of these features at any time with reasonable
                  notice
                </li>
              </ul>
            </Section>

            <Section title="8. Subscriptions and Payments">
              <h4>8.1 Premium Subscriptions</h4>
              <p>
                Knotd offers optional paid subscriptions that unlock additional
                features. By purchasing a subscription, you agree to pay the
                applicable fees as displayed at the time of purchase.
              </p>

              <h4>8.2 Billing and Renewal</h4>
              <ul>
                <li>
                  Subscriptions are billed in advance on a recurring basis
                  (monthly or as otherwise specified at the time of purchase)
                </li>
                <li>
                  Your subscription will automatically renew unless you cancel
                  it at least 24 hours before the end of the current billing
                  period
                </li>
                <li>
                  Subscription fees may change from time to time, but changes
                  will not affect your current billing period
                </li>
              </ul>

              <h4>8.3 Cancellation and Refunds</h4>
              <ul>
                <li>
                  You may cancel your subscription at any time through your
                  device&apos;s app store settings (Apple App Store or Google
                  Play Store)
                </li>
                <li>
                  Cancellation takes effect at the end of the current billing
                  period — you will continue to have access to premium features
                  until then
                </li>
                <li>
                  Refunds are handled in accordance with the policies of the
                  applicable app store. We generally do not provide refunds for
                  partial billing periods
                </li>
              </ul>
            </Section>

            <Section title="9. Privacy and Data Protection">
              <p>
                Your privacy is important to us. Our{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>{" "}
                explains how we collect, use, and protect your personal
                information. By using the Service, you acknowledge that you have
                read and understood our Privacy Policy.
              </p>
              <p>
                You have control over your privacy settings, including the
                ability to hide your active status, age, location, read
                receipts, and your entire profile from discovery.
              </p>
            </Section>

            <Section title="10. Safety and Reporting">
              <p>
                We are committed to maintaining a safe community. If you
                encounter a user who violates these Terms or makes you feel
                unsafe, you can:
              </p>
              <ul>
                <li>
                  <strong>Block</strong> the user to prevent further
                  communication and remove them from your experience
                </li>
                <li>
                  <strong>Report</strong> the user through our in-app reporting
                  system, selecting the appropriate reason
                </li>
              </ul>
              <p>
                All reports are reviewed by our safety team and handled
                confidentially. Blocked users are never notified. We may take
                action including warnings, temporary suspensions, or permanent
                bans based on the severity of the violation.
              </p>
            </Section>

            <Section title="11. Intellectual Property">
              <p>
                The Service, including its original content, features, and
                functionality (excluding User Content), is owned by Knotd and is
                protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>
              <p>
                The Knotd name, logo, and all related names, logos, product and
                service names, designs, and slogans are trademarks of Knotd. You
                may not use them without our prior written permission.
              </p>
            </Section>

            <Section title="12. Disclaimer of Warranties">
              <p>
                The Service is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without any warranties of any kind, either
                express or implied, including but not limited to implied
                warranties of merchantability, fitness for a particular purpose,
                and non-infringement.
              </p>
              <p>We do not warrant that:</p>
              <ul>
                <li>
                  The Service will be uninterrupted, secure, or error-free
                </li>
                <li>
                  The results obtained from the Service will be accurate or
                  reliable
                </li>
                <li>
                  Any defects in the Service will be corrected
                </li>
                <li>
                  The Service will meet your specific requirements or
                  expectations
                </li>
              </ul>
            </Section>

            <Section title="13. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, Knotd and its
                officers, directors, employees, agents, and affiliates shall not
                be liable for any indirect, incidental, special, consequential,
                or punitive damages, including but not limited to loss of
                profits, data, goodwill, or other intangible losses, arising out
                of or in connection with:
              </p>
              <ul>
                <li>Your use or inability to use the Service</li>
                <li>
                  Any conduct or content of any other user, whether online or
                  offline
                </li>
                <li>
                  Unauthorized access to or alteration of your data or
                  transmissions
                </li>
                <li>Any other matter relating to the Service</li>
              </ul>
              <p>
                In no event shall our total liability to you for all claims
                exceed the amount you have paid to Knotd in the twelve (12)
                months preceding the claim.
              </p>
            </Section>

            <Section title="14. Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless Knotd, its
                officers, directors, employees, agents, and affiliates from and
                against any and all claims, liabilities, damages, losses, costs,
                and expenses (including reasonable attorneys&apos; fees) arising
                out of or related to:
              </p>
              <ul>
                <li>Your use of the Service</li>
                <li>Your User Content</li>
                <li>Your violation of these Terms</li>
                <li>
                  Your violation of any rights of another person or entity
                </li>
                <li>
                  Your interactions with other users, whether online or offline
                </li>
              </ul>
            </Section>

            <Section title="15. Third-Party Services">
              <p>
                The Service may contain links to or integrations with
                third-party websites, services, or content that are not owned or
                controlled by Knotd. We are not responsible for the content,
                privacy policies, or practices of any third-party services. Your
                interactions with third-party services are governed by their
                respective terms and policies.
              </p>
            </Section>

            <Section title="16. Termination">
              <p>
                You may delete your account at any time through the app
                settings. Upon deletion, your profile will be removed from the
                Service and your personal data will be handled in accordance
                with our Privacy Policy.
              </p>
              <p>
                We may suspend or terminate your account at any time, without
                prior notice or liability, for any reason, including if you
                breach these Terms. Upon termination:
              </p>
              <ul>
                <li>
                  Your right to access and use the Service will immediately
                  cease
                </li>
                <li>
                  Any active subscription will not be refunded for the remaining
                  billing period
                </li>
                <li>
                  Provisions that by their nature should survive termination will
                  continue to apply
                </li>
              </ul>
            </Section>

            <Section title="17. Dispute Resolution">
              <p>
                If you have a dispute with Knotd, we encourage you to contact us
                first so we can try to resolve the issue informally. If we are
                unable to resolve the dispute informally, you and Knotd agree
                to resolve any claims through binding arbitration on an
                individual basis, rather than through court proceedings or class
                actions.
              </p>
              <p>
                You agree that any dispute resolution proceedings will be
                conducted on an individual basis and not as a class action,
                consolidated action, or representative action. You waive any
                right to participate in a class action lawsuit or class-wide
                arbitration.
              </p>
            </Section>

            <Section title="18. Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the jurisdiction in which Knotd is
                incorporated, without regard to its conflict of law provisions.
                Any legal proceedings arising out of or relating to these Terms
                shall be brought exclusively in the courts located within that
                jurisdiction.
              </p>
            </Section>

            <Section title="19. Severability">
              <p>
                If any provision of these Terms is found to be unenforceable or
                invalid, that provision will be limited or eliminated to the
                minimum extent necessary, and the remaining provisions of these
                Terms will remain in full force and effect.
              </p>
            </Section>

            <Section title="20. Changes to These Terms">
              <p>
                We reserve the right to modify these Terms at any time. When we
                make material changes, we will notify you through the app or via
                email at least 30 days before the changes take effect. Your
                continued use of the Service after the effective date of the
                revised Terms constitutes your acceptance of the changes.
              </p>
              <p>
                We encourage you to review these Terms periodically to stay
                informed about your rights and obligations.
              </p>
            </Section>

            <Section title="21. Contact Us">
              <p>
                If you have any questions or concerns about these Terms, please
                contact us at:
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
