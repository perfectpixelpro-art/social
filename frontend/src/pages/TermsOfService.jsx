import Seo from "../components/Seo";
const H2 = ({ children }) => (
  <h2 className="text-[#013186] font-bold m-0" style={{ fontSize: "clamp(30px, 5vw, 60px)" }}>{children}</h2>
);
const Sub = ({ children }) => (
  <h3 className="text-[#013186] font-bold m-0 mt-2" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>{children}</h3>
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

export default function TermsOfService() {
  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">
      <Seo path="/terms-of-service" title="Terms of Service | The Social 99" description="The terms and conditions governing your use of The Social 99's services. Please read before getting started." />

      {/* Hero */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-12">
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 py-24 mq450:py-16 text-center">
          <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(42px, 8vw, 110px)" }}>
            Terms of Service
          </h1>
          <p className="m-0 mt-4 text-[#013186]/70 font-semibold" style={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}>
            Please read these Terms carefully before using TheSocial99.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col gap-12">

        {/* Intro */}
        <div className="flex flex-col gap-4">
          <P>
            These Terms of Service ("Terms") govern your access to and use of TheSocial99 ("TheSocial99", "we", "us", or "our"), including our website, client portal, admin portal, social media management platform, and related services (collectively, the "Service"). By accessing, registering for, or using the Service, you agree to be bound by these Terms.
          </P>
        </div>

        {/* 1. Eligibility & Accounts */}
        <div className="flex flex-col gap-4">
          <H2>1. Eligibility &amp; Accounts</H2>
          <P>
            You must be at least 18 years old and capable of entering into a legally binding agreement to use the Service. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information when creating or updating your account.
          </P>
        </div>

        {/* 2. The Service */}
        <div className="flex flex-col gap-4">
          <H2>2. The Service</H2>
          <P>
            TheSocial99 is a software-as-a-service (SaaS) platform designed to help businesses and individuals manage their social media presence. Our platform may provide features including:
          </P>
          <Bullets items={[
            "Content management, scheduling, and publishing",
            "Analytics and reporting",
            "Client collaboration and approval workflows",
            "Media storage and account management",
          ]} />
          <P>
            The Service may include separate Client and Admin portals to facilitate communication, campaign management, content approvals, and reporting.
          </P>
        </div>

        {/* 3. Connected Social Media Accounts */}
        <div className="flex flex-col gap-4">
          <H2>3. Connected Social Media Accounts</H2>
          <P>
            The Service may integrate with third-party platforms including Facebook, Instagram, LinkedIn, YouTube, and other supported services. By connecting a social media account, you authorize TheSocial99 to access information and perform actions that you explicitly approve through the authorization process.
          </P>
          <Lead>These actions may include:</Lead>
          <Bullets items={[
            "Retrieving account information",
            "Accessing page or profile information",
            "Publishing content on your behalf",
            "Scheduling content for future publication",
            "Retrieving analytics and performance metrics",
            "Managing connected social media assets where authorized",
          ]} />
          <P>
            You may disconnect connected accounts at any time through the platform or directly through the settings of the relevant social media provider. You remain solely responsible for complying with the terms, policies, and community guidelines of all connected third-party platforms.
          </P>
        </div>

        {/* 4. Privacy & Data Protection */}
        <div className="flex flex-col gap-4">
          <H2>4. Privacy &amp; Data Protection</H2>
          <P>
            TheSocial99 collects and processes information necessary to provide and improve the Service, including account information, connected social media account data, uploaded content, analytics information, and communication records. All information is handled in accordance with our Privacy Policy. Users may request deletion of their account and associated data at any time through our Data Deletion process.
          </P>
        </div>

        {/* 5. Subscription Plans & Payments */}
        <div className="flex flex-col gap-4">
          <H2>5. Subscription Plans &amp; Payments</H2>
          <P>
            TheSocial99 may offer subscription plans, one-time services, custom marketing packages, and additional paid features. Pricing, included features, and billing terms are displayed at the time of purchase.
          </P>
          <Bullets items={[
            "Subscriptions may automatically renew unless cancelled before the next billing cycle",
            "Payments are processed through secure third-party payment providers",
            "TheSocial99 does not store full payment card information",
            "Unless otherwise required by applicable law, payments are non-refundable",
          ]} />
        </div>

        {/* 6. Acceptable Use */}
        <div className="flex flex-col gap-4">
          <H2>6. Acceptable Use</H2>
          <Lead>You agree not to:</Lead>
          <Bullets items={[
            "Violate any applicable law or regulation",
            "Upload or distribute unlawful, misleading, harmful, fraudulent, or infringing content",
            "Attempt unauthorized access to the Service or related systems",
            "Interfere with the security, performance, or operation of the Service",
            "Use the Service to distribute spam, malware, or harmful software",
            "Misuse data belonging to other users or third parties",
          ]} />
          <P>We reserve the right to suspend or terminate accounts that violate these Terms.</P>
        </div>

        {/* 7. Content Ownership */}
        <div className="flex flex-col gap-4">
          <H2>7. Content Ownership</H2>
          <P>
            You retain ownership of all content, trademarks, logos, images, videos, documents, and other materials uploaded or provided through the Service. By using the Service, you grant TheSocial99 a limited, non-exclusive, revocable license to store, process, display, publish, schedule, and otherwise use your content solely for the purpose of providing the Service.
          </P>
          <Lead>TheSocial99 does not claim ownership of user content.</Lead>
        </div>

        {/* 8. Intellectual Property */}
        <div className="flex flex-col gap-4">
          <H2>8. Intellectual Property</H2>
          <P>
            TheSocial99, including its software, branding, website content, designs, features, and technology, is protected by applicable intellectual property laws. Except as expressly permitted, users may not copy, modify, distribute, reverse engineer, or create derivative works based on the Service.
          </P>
        </div>

        {/* 9. Suspension & Termination */}
        <div className="flex flex-col gap-4">
          <H2>9. Suspension &amp; Termination</H2>
          <P>You may stop using the Service and request account deletion at any time.</P>
          <Lead>TheSocial99 may suspend or terminate access to the Service if:</Lead>
          <Bullets items={[
            "These Terms are violated",
            "Required by law",
            "Necessary to protect the security, integrity, or operation of the platform",
          ]} />
          <P>
            Upon termination, access to connected social media accounts will be revoked and data will be handled according to our Privacy Policy and Data Deletion procedures.
          </P>
        </div>

        {/* 10. Third-Party Services */}
        <div className="flex flex-col gap-4">
          <H2>10. Third-Party Services</H2>
          <P>
            The Service relies on third-party platforms and providers including Facebook, Instagram, LinkedIn, YouTube, Google, payment processors, hosting providers, and other technology partners. TheSocial99 is not responsible for outages, service interruptions, API limitations, policy changes, account restrictions, or actions taken by any third-party service provider.
          </P>
        </div>

        {/* 11. Disclaimer of Warranties */}
        <div className="flex flex-col gap-4">
          <H2>11. Disclaimer of Warranties</H2>
          <P>
            The Service is provided on an "as is" and "as available" basis. TheSocial99 makes no warranties or guarantees regarding uninterrupted availability, accuracy, reliability, security, or fitness for a particular purpose.
          </P>
        </div>

        {/* 12. Limitation of Liability */}
        <div className="flex flex-col gap-4">
          <H2>12. Limitation of Liability</H2>
          <P>
            To the fullest extent permitted by law, TheSocial99 shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages arising from or related to the use of the Service. Our total liability for any claim shall not exceed the amount paid by you to TheSocial99 during the three months preceding the event giving rise to the claim.
          </P>
        </div>

        {/* 13. Changes to These Terms */}
        <div className="flex flex-col gap-4">
          <H2>13. Changes to These Terms</H2>
          <P>
            We may update these Terms periodically to reflect changes in our services, legal obligations, or operational practices. Updated versions will be posted on this page along with the revised effective date. Continued use of the Service following any changes constitutes acceptance of the updated Terms.
          </P>
        </div>

        {/* 14. Contact box */}
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 mq450:px-6 py-12">
          <h3 className="text-[#013186] font-bold m-0 mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>14. Contact Information</h3>
          <p className="m-0 mb-2 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            If you have any questions regarding these Terms of Service, please contact us — we will be happy to help.
          </p>
          <a href="mailto:support@thesocial99.com" className="text-[#013186] font-bold no-underline hover:underline" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            support@thesocial99.com
          </a>
          <p className="m-0 mt-4 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(14px, 1.3vw, 18px)" }}>
            Contact form: <a href="https://thesocial99.com/contact">Contact Us </a> · Business: TheSocial99, India
          </p>
        </div>

      </div>
    </div>
  );
}