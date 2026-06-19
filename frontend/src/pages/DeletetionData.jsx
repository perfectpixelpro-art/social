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

export default function DataDeletion() {
  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">

      {/* Hero */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-12">
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 py-24 mq450:py-16 text-center">
          <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(42px, 8vw, 110px)" }}>
            Data Deletion Instructions
          </h1>
          <p className="m-0 mt-4 text-[#013186]/70 font-semibold" style={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}>
            Last Updated: June 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col gap-12">

        {/* Intro */}
        <div className="flex flex-col gap-4">
          <P>
            At TheSocial99, we respect your privacy and provide users with the ability to request deletion of their account and associated data at any time.
          </P>
        </div>

        {/* Requesting Data Deletion */}
        <div className="flex flex-col gap-4">
          <H2>Requesting Data Deletion</H2>
          <P>
            If you would like your data removed from TheSocial99, please send an email to{" "}
            <a href="mailto:support@thesocial99.com" className="text-[#013186] font-bold no-underline hover:underline">support@thesocial99.com</a>{" "}
            with the subject line: <span className="text-[#013186] font-bold">Data Deletion Request</span>
          </P>
          <Lead>Please include:</Lead>
          <Bullets items={[
            "Your full name",
            "Account email address",
            "Any relevant account information that will help us identify your account",
          ]} />
          <P>
            Once we verify the request, we will begin the deletion process and remove applicable account data within 30 days.
          </P>
        </div>

        {/* What Data Will Be Deleted */}
        <div className="flex flex-col gap-4">
          <H2>What Data Will Be Deleted</H2>
          <P>Upon approval of a valid deletion request, we may delete:</P>
          <Bullets items={[
            "Account information",
            "Profile information",
            "Uploaded content and media",
            "Scheduled posts and drafts",
            "Connected social media account information",
            "Analytics and reporting data",
            "Communication records associated with your account",
          ]} />
          <P>
            Certain information may be retained where required by law, fraud prevention obligations, payment processing requirements, or legitimate business purposes.
          </P>
        </div>

        {/* Disconnecting Connected Social Accounts */}
        <div className="flex flex-col gap-4">
          <H2>Disconnecting Connected Social Accounts</H2>
          <P>You may revoke access to TheSocial99 at any time directly from the connected platform.</P>

          <Lead>Facebook &amp; Instagram</Lead>
          <P>Facebook Settings → Apps and Websites</P>

          <Lead>LinkedIn</Lead>
          <P>LinkedIn Settings → Data Privacy → Third-Party Applications</P>

          <Lead>Google &amp; YouTube</Lead>
          <P>Google Account → Security → Third-Party Apps with Account Access</P>

          <P>Revoking access will prevent TheSocial99 from accessing future data from those accounts.</P>
        </div>

        {/* Automatic Deletion After Account Closure */}
        <div className="flex flex-col gap-4">
          <H2>Automatic Deletion After Account Closure</H2>
          <P>
            When an account is permanently deleted, connected social media tokens are removed and associated account data is scheduled for deletion according to our retention policies.
          </P>
        </div>

        {/* Questions / Contact box */}
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 mq450:px-6 py-12">
          <h3 className="text-[#013186] font-bold m-0 mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>Questions</h3>
          <p className="m-0 mb-2 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            If you have any questions regarding account deletion or privacy, please contact us.
          </p>
          <a href="mailto:support@thesocial99.com" className="text-[#013186] font-bold no-underline hover:underline" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            support@thesocial99.com
          </a>
          <p className="m-0 mt-4 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(14px, 1.3vw, 18px)" }}>
            Business: TheSocial99, India
          </p>
        </div>

      </div>
    </div>
  );
}