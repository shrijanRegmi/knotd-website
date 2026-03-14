import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const lastUpdated = "March 14, 2026";

export default function ChildSafetyPage() {
  return (
    <>
      <Navbar />

      <main className="pt-40 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              Safety
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark tracking-tight">
              Child Safety Standards
            </h1>
            <p className="mt-4 text-base text-dark-light/60">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-4 text-lg text-dark-light/70">
              <strong className="text-dark">Knotd</strong> (the app and
              developer name as shown on the Google Play store listing) is
              committed to the safety of children and to preventing child sexual
              abuse and exploitation on our platform. This page sets out our
              published standards and how we address related harm.
            </p>
          </div>

          <div className="policy-content text-dark-light/70 leading-relaxed space-y-12">
            <section id="our-standards" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-dark mb-5 pt-2">
                1. Our Standards Against Child Sexual Abuse and Exploitation
                (CSAE)
              </h2>
              <div className="space-y-4 [&_p]:text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2.5 [&_li]:text-sm">
                <p>
                  Knotd has zero tolerance for child sexual abuse and
                  exploitation (CSAE). CSAE refers to content or behavior that
                  sexually exploits, abuses, or endangers children — including,
                  for example, grooming a child for sexual exploitation,
                  sextortion of a child, trafficking of a child for sex, or
                  otherwise sexually exploiting a child.
                </p>
                <p>We are committed to:</p>
                <ul>
                  <li>
                    Not allowing our service to be used to harm, exploit, or
                    endanger minors in any way
                  </li>
                  <li>
                    Prohibiting and removing any child sexual abuse material
                    (CSAM) and related content
                  </li>
                  <li>
                    Cooperating with law enforcement and relevant authorities
                    when we become aware of such content or behavior
                  </li>
                  <li>
                    Complying with applicable child safety laws in the
                    jurisdictions where we operate
                  </li>
                </ul>
              </div>
            </section>

            <section id="definitions" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-dark mb-5 pt-2">
                2. Definitions
              </h2>
              <div className="space-y-4 [&_p]:text-sm">
                <p>
                  <strong className="text-dark">
                    Child sexual abuse material (CSAM):
                  </strong>{" "}
                  Any visual depiction (including photos, videos, or
                  computer-generated imagery) involving a minor engaging in
                  sexually explicit conduct. CSAM is illegal and prohibited on
                  Knotd. We do not permit the storage, sharing, or distribution
                  of such content on our service.
                </p>
                <p>
                  <strong className="text-dark">
                    Child sexual abuse and exploitation (CSAE):
                  </strong>{" "}
                  Conduct that sexually exploits, abuses, or endangers children,
                  including grooming, sextortion, trafficking for sex, or other
                  forms of sexual exploitation of minors.
                </p>
              </div>
            </section>

            <section id="addressing-csam" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-dark mb-5 pt-2">
                3. How We Address CSAM and CSAE
              </h2>
              <div className="space-y-4 [&_p]:text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2.5 [&_li]:text-sm">
                <p>
                  When we obtain actual knowledge of CSAM or CSAE-related
                  content or behavior on our platform, we take appropriate
                  action in accordance with our standards and applicable laws,
                  including:
                </p>
                <ul>
                  <li>
                    <strong>Removal:</strong> Immediately removing the content
                    and terminating the accounts involved
                  </li>
                  <li>
                    <strong>Reporting:</strong> Reporting to the relevant
                    authorities (e.g., NCMEC and equivalent bodies in other
                    jurisdictions) as required or appropriate by law
                  </li>
                  <li>
                    <strong>Prevention:</strong> Using technology and processes
                    to help detect, prevent, and deter such content and behavior
                  </li>
                  <li>
                    <strong>Cooperation:</strong> Cooperating with law
                    enforcement and child safety organizations in investigations
                  </li>
                </ul>
              </div>
            </section>

            <section id="reporting" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-dark mb-5 pt-2">
                4. How to Report Concerns (In-App and Contact)
              </h2>
              <div className="space-y-4 [&_p]:text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2.5 [&_li]:text-sm">
                <p>
                  Knotd provides ways for users to report concerns without
                  leaving the app, as well as direct contact options:
                </p>
                <ul>
                  <li>
                    <strong>In the Knotd app:</strong> Use the report option on
                    any profile or conversation. Select the reason that best
                    fits (including safety-related categories). Reports are
                    reviewed by our safety team.
                  </li>
                  <li>
                    <strong>Support email:</strong> You can report concerns by
                    emailing{" "}
                    <a
                      href="mailto:support@knotd-app.com"
                      className="text-primary hover:underline"
                    >
                      support@knotd-app.com
                    </a>
                    . For child safety matters, please use the subject line
                    &quot;Child Safety&quot; so we can prioritize your report.
                  </li>
                </ul>
                <p>
                  We take all reports seriously and act in accordance with our
                  published standards and applicable law.
                </p>
              </div>
            </section>

            <section id="point-of-contact" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-dark mb-5 pt-2">
                5. Child Safety Point of Contact
              </h2>
              <div className="space-y-4 [&_p]:text-sm">
                <p>
                  For questions about Knotd&apos;s child safety practices, CSAM
                  prevention, or compliance with child safety standards, you may
                  contact our designated child safety point of contact:
                </p>
                <div className="rounded-2xl bg-rose-50/50 border border-rose-100/80 p-6 mt-4">
                  <p className="font-semibold text-dark pb-2">
                    Knotd — Child Safety
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:support@knotd-app.com?subject=Child%20Safety%20Inquiry"
                      className="text-primary hover:underline"
                    >
                      support@knotd-app.com
                    </a>
                    <br />
                    <span className="text-dark-light/60 text-xs mt-1 block">
                      Subject line: &quot;Child Safety Inquiry&quot; or
                      &quot;CSAM/CSAE Report&quot;
                    </span>
                  </p>
                  <p className="mt-2 text-xs text-dark-light/60">
                    This contact is for child safety and CSAM-related inquiries
                    and reports. We respond as promptly as possible.
                  </p>
                </div>
              </div>
            </section>

            <section className="scroll-mt-28">
              <h2 className="text-xl font-bold text-dark mb-5 pt-2">
                6. Compliance and Updates
              </h2>
              <div className="space-y-4 [&_p]:text-sm">
                <p>
                  Knotd complies with applicable child safety laws and follows
                  industry practices, including guidance from organizations such
                  as the Tech Coalition. We may update these standards from time
                  to time and will keep this page current.
                </p>
                <p>
                  For our general privacy practices regarding minors, see our{" "}
                  <a
                    href="/privacy#children"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy — Children&apos;s Privacy
                  </a>
                  . For community rules and reporting, see our{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
