const H2 = ({ children }) => (
  <h2 className="text-[#013186] font-bold m-0" style={{ fontSize: "clamp(30px, 5vw, 60px)" }}>{children}</h2>
);
const P = ({ children }) => (
  <p className="m-0 text-[rgba(0,0,0,0.5)] font-semibold leading-relaxed" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>{children}</p>
);
const Lead = ({ children }) => (
  <p className="m-0 text-[#111] font-bold leading-relaxed" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>{children}</p>
);
const Bullets = ({ items }) => (
  <ul className="m-0 p-0 list-none flex flex-col gap-4">
    {items.map((t) => (
      <li key={t} className="flex items-start gap-3">
        <span className="mt-[11px] w-[7px] h-[7px] rounded-full bg-[#013186] shrink-0" />
        <span className="text-[rgba(0,0,0,0.5)] font-semibold leading-relaxed" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>{t}</span>
      </li>
    ))}
  </ul>
);

export default function RefundPolicy() {
  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">

      {/* Hero */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-12">
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 py-24 mq450:py-16 text-center">
          <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(42px, 8vw, 110px)" }}>
           Privacy Policy
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col gap-12">

        <P>
          At The Social 99, we respect your privacy and are committed to protecting the information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard information when you visit our website or use our services.
        </P>

        <div className="flex flex-col gap-4">
          <H2>General Policy</H2>
          <P>Due to the nature of digital services, all payments made to The Social 99 are non-refundable once services have commenced. Time, planning, and resources are allocated immediately after onboarding.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Information We Collect</H2>
          <Lead>We collect information that you choose to provide, including when you:</Lead>
          <Bullets items={[
            "Submit an inquiry or contact form",
"Purchase or activate a service plan",
"Complete onboarding or project-related forms",
"Communicate with us via email or other channels",
          ]} />
          <P>This information may include:</P>
          <Bullets items={[
            "Name",
"Email address",
"Phone number",
"Business or brand details",
"Any other information relevant to service delivery"
          ]} />
          <P>Providing this information is voluntary, but certain details may be required to deliver our services effectively.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Information Collected Automatically</H2>
          <Lead>When you visit our website, limited technical information may be collected automatically, such as:</Lead>
          <Bullets items={[
           "Browser type",
"Device type",
"Operating system",
"General usage patterns"
          ]} />
          <P>This data helps us understand how our website is used and supports ongoing improvements.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Use of Cookies</H2>
          <P>Our website may use cookies or similar technologies to improve performance, functionality, and user experience. Cookies help us understand site usage and remember user preferences. <br/>
You may control or disable cookies through your browser settings. Disabling cookies may affect certain features of the website.</P>
        </div>

       

        <div className="flex flex-col gap-4">
          <H2>How We Use Information</H2>
          <Lead>The Social 99 uses collected information for the following purposes:</Lead>
          <Bullets items={[
        "    To deliver and manage services",
"To communicate regarding onboarding, project updates, and support",
"To improve our website, workflows, and service quality",
"To share updates or information you have opted to receive"
          ]} />
          <P>We do not use personal information for purposes unrelated to our services.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Communications</H2>
          <P>We may contact you via email for service-related communication, including confirmations, updates, or support messages. <br/>
Marketing or informational emails are only sent if you choose to opt in. You may unsubscribe from such communications at any time using the link provided in our emails.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Data Protection and Security</H2>
          <P>We implement reasonable administrative and technical safeguards to protect your information from unauthorized access, misuse, or disclosure. <br/>
While no system can guarantee absolute security, we take appropriate measures to maintain data integrity and confidentiality.</P>
        </div>

{/*  */}
 <div className="flex flex-col gap-4">
          <H2>Information Sharing</H2>
          <Lead>We do not sell, rent, or trade personal information.</Lead>
          <Lead>Information may be shared only when necessary to:</Lead>
          <Bullets items={[
       "Deliver services you have requested",
"Comply with legal or regulatory requirements",
"Work with trusted service providers under confidentiality obligations",
          ]} />
          <P>We do not use personal information for purposes unrelated to our services.</P>
        </div>

        {/*  */}
          <div className="flex flex-col gap-4">
          <H2>Third-Party Links</H2>
          <P>Our website may contain links to external websites. The Social 99 is not responsible for the privacy practices or content of third-party sites. We encourage you to review their privacy policies separately.</P>
        </div>

        {/*  */}
             <div className="flex flex-col gap-4">
          <H2>Policy Updates</H2>
          <P>This Privacy Policy may be updated periodically to reflect changes in our practices or legal requirements. Updates will be posted on this page and are effective immediately upon publication. <br/>
Continued use of the website constitutes acceptance of the updated policy.
</P>
        </div>

         {/*  */}
             <div className="flex flex-col gap-4">
          <H2>Your Consent</H2>
          <P>By using our website and services, you consent to this Privacy Policy and the collection and use of information as described..
</P>
        </div>


        {/* Contact box */}
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 mq450:px-6 py-12">
          <h3 className="text-[#013186] font-bold m-0 mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>Contact</h3>
          <p className="m-0 mb-2 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            If you have questions or concerns regarding this Privacy Policy or your information,
please contact us at:
          </p>
          <a href="mailto:support@thesocial99.com" className="text-[#013186] font-bold no-underline hover:underline" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            support@thesocial99.com
          </a>
        </div>

      </div>
    </div>
  );
}
