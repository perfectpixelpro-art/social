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

export default function PrivacyPolicy() {
  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">
      <Seo path="/privacy-policy" title="Privacy Policy | The Social 99" description="How The Social 99 collects, uses, and protects your personal information. Read our full privacy policy." />

      {/* Hero */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-12">
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 py-24 mq450:py-16 text-center">
          <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(42px, 8vw, 110px)" }}>
            Privacy Policy
          </h1>
          <p className="m-0 mt-4 text-[#013186]/70 font-semibold" style={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}>
            Effective Date: June 15, 2026 · Last Updated: June 15, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col gap-12">

        {/* 1. Introduction */}
        <div className="flex flex-col gap-4">
          <H2>1. Introduction</H2>
          <P>
            Welcome to TheSocial99 ("we," "our," or "us"). TheSocial99 is a social media management SaaS platform that allows businesses and individuals ("you" or "Client") to connect their social media accounts, schedule posts, publish content, and view analytics across multiple platforms including YouTube, Facebook, Instagram, and LinkedIn.
          </P>
          <P>
            This Privacy Policy explains what data we collect, how we use it, who we share it with, and your rights. By using TheSocial99, you agree to the collection and use of information in accordance with this policy. Platform accessible at: https://thesocial99.com
          </P>
          <Lead>Definitions</Lead>
          <Bullets items={[
            "TheSocial99 / Platform: The social media management tool at thesocial99.com.",
            "Client / User: Any business or individual who registers and uses TheSocial99.",
            "Connected Account: A social media account linked to TheSocial99 via OAuth 2.0.",
          ]} />
        </div>

        {/* 2. Information We Collect */}
        <div className="flex flex-col gap-4">
          <H2>2. Information We Collect</H2>

          <Sub>2.1 Account Information</Sub>
          <P>When you register for TheSocial99, we collect:</P>
          <Bullets items={[
            "Full name and email address",
            "Password (stored encrypted using bcrypt with salt rounds)",
            "Business name and contact details",
            "Billing information (processed by Stripe — we do not store card numbers)",
            "Profile photo (optional)",
          ]} />

          <Sub>2.2 Social Media Account Data</Sub>
          <P>When you connect your social media accounts via OAuth 2.0, we collect and store the following with your explicit consent:</P>
          <Lead>YouTube / Google</Lead>
          <Bullets items={[
            "Google account name and profile picture",
            "YouTube channel ID and channel name",
            "OAuth access tokens and refresh tokens (encrypted at rest using AES-256)",
            "Channel analytics: views, likes, comments, watch time, subscriber count",
            "Video metadata for videos you choose to upload through our platform",
          ]} />
          <Lead>Facebook & Instagram (Meta)</Lead>
          <Bullets items={[
            "Facebook profile name and user ID",
            "Facebook Pages you manage: page names, page IDs, page access tokens",
            "Instagram Business account username and account ID",
            "Post engagement data: likes, comments, shares, reach, impressions",
            "Page insights and audience demographics",
            "Content you choose to schedule or publish through our platform",
          ]} />
          <Lead>LinkedIn</Lead>
          <Bullets items={[
            "LinkedIn profile name, headline, and profile URL",
            "LinkedIn member URN (unique identifier)",
            "OAuth access tokens (encrypted at rest using AES-256)",
            "Post engagement data: likes, comments, shares, impressions",
            "Content you choose to schedule or publish through our platform",
          ]} />
          <P>We do NOT store your LinkedIn password. Authentication is handled entirely via OAuth 2.0.</P>

          <Sub>2.3 Usage Data</Sub>
          <Bullets items={[
            "IP address and browser type",
            "Pages visited and features used within the dashboard",
            "Time and date of access",
            "Errors and crash reports",
          ]} />

          <Sub>2.4 Content You Upload</Sub>
          <Bullets items={[
            "Images, videos, and captions uploaded for scheduling",
            "Post schedules and publishing timestamps",
            "Draft content saved in your account",
          ]} />
        </div>

        {/* 3. How We Use Your Information */}
        <div className="flex flex-col gap-4">
          <H2>3. How We Use Your Information</H2>
          <Bullets items={[
            "To provide, operate, and maintain the TheSocial99 platform",
            "To authenticate you and manage your account",
            "To connect to your social media accounts on your behalf using OAuth 2.0",
            "To publish and schedule posts to your connected accounts only at your explicit direction",
            "To retrieve and display analytics and insights from your connected accounts",
            "To process payments for subscription plans via Stripe",
            "To send account-related notifications and service updates",
            "To respond to your support requests and inquiries",
            "To detect and prevent fraud, abuse, and security incidents",
            "To improve our platform features and user experience",
            "To comply with legal obligations",
          ]} />
          <Lead>We do NOT use your social media content or analytics data for advertising purposes. We do NOT sell your personal data to any third parties.</Lead>
        </div>

        {/* 4. Third-Party Services and API Usage */}
        <div className="flex flex-col gap-4">
          <H2>4. Third-Party Services and API Usage</H2>
          <P>TheSocial99 integrates with social media platforms using their official APIs. Below we describe exactly what data each integration accesses, why, and how you can revoke access.</P>

          <Sub>4.1 Google / YouTube API Services</Sub>
          <P>TheSocial99 uses YouTube API Services, specifically the YouTube Data API v3 and the YouTube Analytics API, to connect to your YouTube channel. By connecting your YouTube account, you also agree to Google's Privacy Policy: https://policies.google.com/privacy</P>
          <Lead>Data accessed:</Lead>
          <Bullets items={[
            "YouTube channel name, channel ID, and profile picture",
            "Channel analytics: views, likes, comments, watch time, subscriber count",
            "Video metadata for videos you upload through TheSocial99",
            "YouTube Analytics reports for your channel",
          ]} />
          <Lead>Why we access this data:</Lead>
          <Bullets items={[
            "To upload videos to your YouTube channel on your behalf (only when you request it)",
            "To display your channel analytics in your TheSocial99 dashboard",
            "To read your channel information for account management",
          ]} />
          <P>Our use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. We do NOT share your YouTube or Google data with third parties for any purpose other than providing our service. We do NOT use your YouTube data for advertising. All YouTube data is stored securely and encrypted at rest using AES-256.</P>
          <P>Data retention: YouTube OAuth tokens are retained until you disconnect your YouTube account or close your TheSocial99 account. Analytics data is cached for up to 24 hours. Revoke access: https://security.google.com/settings/security/permissions</P>

          <Sub>4.2 Meta (Facebook & Instagram) API</Sub>
          <P>TheSocial99 uses the Meta Graph API to connect to your Facebook Pages and Instagram Business accounts. By connecting your Meta accounts, you also agree to Meta's Data Policy: https://www.facebook.com/policy</P>
          <Lead>Data accessed:</Lead>
          <Bullets items={[
            "Facebook profile name and user ID",
            "Facebook Pages you manage: page names, page IDs, and page access tokens",
            "Instagram Business account username and account ID",
            "Post engagement metrics: likes, comments, shares, reach, and impressions",
            "Page insights and audience demographics",
          ]} />
          <Lead>Why we access this data:</Lead>
          <Bullets items={[
            "To schedule and publish posts and stories to your Facebook Pages and Instagram Business accounts",
            "To retrieve analytics and engagement data for your pages",
            "To display page insights in your TheSocial99 dashboard",
          ]} />
          <P>TheSocial99 only publishes content to your Facebook or Instagram accounts when you explicitly request it through our scheduling or publishing features. We never post on your behalf without your direct action. We do NOT sell your Facebook or Instagram data to any third party. We do NOT use your Facebook or Instagram data for advertising.</P>
          <P>Data retention: Access tokens are retained until you disconnect your account or close your TheSocial99 account. Upon disconnection, stored tokens are deleted immediately. Revoke access: Facebook Settings → Settings & Privacy → Settings → Apps and Websites.</P>

          <Sub>4.3 LinkedIn API</Sub>
          <P>TheSocial99 uses the LinkedIn API to connect to your LinkedIn profile and pages. By connecting your LinkedIn account, you also agree to LinkedIn's Privacy Policy: https://www.linkedin.com/legal/privacy-policy</P>
          <Lead>Data accessed:</Lead>
          <Bullets items={[
            "LinkedIn profile name, headline, and profile URL",
            "LinkedIn member URN (unique identifier)",
            "OAuth access tokens (encrypted at rest using AES-256)",
            "Post engagement data: likes, comments, shares, impressions",
          ]} />
          <Lead>Why we access this data:</Lead>
          <Bullets items={[
            "To publish posts and content to your LinkedIn profile or pages",
            "To read post engagement metrics and display analytics in your dashboard",
            "To access your basic profile information for account management",
          ]} />
          <P>TheSocial99 authenticates with LinkedIn using OAuth 2.0 and does NOT store your LinkedIn password. We only publish content to your LinkedIn profile or pages at your explicit direction.</P>
          <P>Data retention: LinkedIn OAuth tokens are retained until you disconnect your account or close your TheSocial99 account. Upon disconnection, stored tokens are deleted immediately. Revoke access: LinkedIn Settings → Data Privacy → Third-party applications.</P>

          <Sub>4.4 Other Third-Party Services</Sub>
          <Bullets items={[
            "Stripe — Payment processing. Privacy policy: https://stripe.com/privacy",
            "MongoDB Atlas — Secure database storage",
            "Hostinger — Cloud hosting and infrastructure",
            "Resend — Transactional email delivery",
            "Google Drive — Secure storage of brand assets you share with us",
            "Zoom — Scheduling and hosting meetings you request",
          ]} />
        </div>

        {/* 5. Data Storage and Security */}
        <div className="flex flex-col gap-4">
          <H2>5. Data Storage and Security</H2>
          <Lead>We implement the following security measures:</Lead>
          <Bullets items={[
            "All data is transmitted over HTTPS / TLS encryption",
            "OAuth access tokens encrypted at rest using AES-256",
            "Passwords hashed using bcrypt with salt rounds",
            "Servers hosted on Hostinger VPS with firewall protection",
            "Database access restricted to application servers only",
            "Regular security audits and dependency updates",
            "API keys stored as environment variables, never in source code",
          ]} />
          <P>Despite our measures, no transmission over the internet is 100% secure.</P>
          <Sub>5.1 Data Retention</Sub>
          <Bullets items={[
            "Account data: Retained while active; deleted within 30 days of account closure",
            "Social media tokens: Retained until account disconnect or TheSocial99 account closure",
            "Analytics data: Cached up to 24 hours, then refreshed from respective platforms",
            "Uploaded media files: Retained 30 days after posting, then permanently deleted",
            "Payment records: Retained 7 years as required by financial regulations",
          ]} />
        </div>

        {/* 6. How We Share */}
        <div className="flex flex-col gap-4">
          <H2>6. How We Share Your Information</H2>
          <Lead>We do not sell, rent, or trade your personal information. We share data only in these limited circumstances:</Lead>
          <Bullets items={[
            "With social media platforms (Google, Meta, LinkedIn) only as required to fulfil your requested actions",
            "With Stripe to process payments",
            "With Hostinger for cloud hosting and infrastructure",
            "With law enforcement or government bodies when required by applicable law",
            "In connection with a merger, acquisition, or sale of assets — you will be notified in advance",
            "With your explicit consent for any other purpose",
          ]} />
        </div>

        {/* 7. Your Rights */}
        <div className="flex flex-col gap-4">
          <H2>7. Your Rights and Choices</H2>
          <Sub>7.1 Access & Portability</Sub>
          <P>You can access all your account data through your TheSocial99 dashboard. To request a copy, email support@thesocial99.com.</P>
          <Sub>7.2 Correction</Sub>
          <P>Update your account information at any time through your profile settings, or contact us to correct inaccurate data.</P>
          <Sub>7.3 Deletion</Sub>
          <P>Delete your account via Settings → Delete Account. Your personal data will be removed within 30 days. Some data may be retained for legal compliance.</P>
          <Sub>7.4 Disconnecting Social Accounts</Sub>
          <P>Disconnect any social media account from your TheSocial99 dashboard at any time. Upon disconnection, stored access tokens for that platform are deleted immediately.</P>
          <Sub>7.5 GDPR Rights (EU Users)</Sub>
          <Bullets items={[
            "Right to restrict processing of your personal data",
            "Right to object to processing",
            "Right to lodge a complaint with your local data protection authority",
            "Right to withdraw consent at any time without affecting lawfulness of prior processing",
          ]} />
          <Sub>7.6 CCPA Rights (California Users)</Sub>
          <Bullets items={[
            "Right to know what personal information we collect and how it is used",
            "Right to delete personal information we have collected",
            "Right to opt-out of the sale of personal information (we do not sell personal data)",
            "Right to non-discrimination for exercising your privacy rights",
          ]} />
          <P>To exercise any right, email support@thesocial99.com. We will respond within 30 days.</P>
        </div>

        {/* 8. Cookies */}
        <div className="flex flex-col gap-4">
          <H2>8. Cookies and Tracking</H2>
          <Bullets items={[
            "Session cookies — to keep you logged in during your session",
            "Preference cookies — to remember your dashboard settings",
            "Security cookies — to detect and prevent fraudulent activity",
          ]} />
          <P>We do not use advertising cookies or tracking pixels. We do not track you across third-party websites.</P>
        </div>

        {/* 9. Children's Privacy */}
        <div className="flex flex-col gap-4">
          <H2>9. Children's Privacy</H2>
          <P>TheSocial99 is not intended for individuals under 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, contact support@thesocial99.com immediately and we will delete it promptly.</P>
        </div>

        {/* 10. International Data Transfers */}
        <div className="flex flex-col gap-4">
          <H2>10. International Data Transfers</H2>
          <P>TheSocial99 is operated from India. If you are located outside India, your data may be transferred to and processed in India or other countries where our service providers operate. We ensure appropriate safeguards are in place, including standard contractual clauses where required.</P>
        </div>

        {/* 11. Changes */}
        <div className="flex flex-col gap-4">
          <H2>11. Changes to This Privacy Policy</H2>
          <P>We may update this Privacy Policy from time to time. When we make material changes, we will:</P>
          <Bullets items={[
            "Update the \"Last Updated\" date at the top of this policy",
            "Send an email notification to your registered email address",
            "Display a prominent notice in your TheSocial99 dashboard",
          ]} />
          <P>Your continued use of TheSocial99 after changes become effective constitutes your acceptance of the updated Privacy Policy.</P>
        </div>

        {/* 12. Contact box */}
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 mq450:px-6 py-12">
          <h3 className="text-[#013186] font-bold m-0 mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>12. Contact Us</h3>
          <p className="m-0 mb-2 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out — we will respond within 30 days.
          </p>
          <a href="mailto:support@thesocial99.com" className="text-[#013186] font-bold no-underline hover:underline" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            support@thesocial99.com
          </a>
          <p className="m-0 mt-4 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(14px, 1.3vw, 18px)" }}>
            Contact form: https://thesocial99.com/contact · Business: TheSocial99, India
          </p>
        </div>

      </div>
    </div>
  );
}
