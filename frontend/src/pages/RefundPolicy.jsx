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
            Refund Policy
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col gap-12">

        <P>
          This Refund Policy outlines the terms governing refunds, cancellations, and service-related credits for services provided by The Social 99. As a provider of digital services, The Social 99 allocates time, resources, and operational capacity upon client onboarding. This policy is intended to clearly define refund eligibility and ensure transparency prior to the commencement of services.
        </P>

        <div className="flex flex-col gap-4">
          <H2>General Policy</H2>
          <P>Due to the nature of digital services, all payments made to The Social 99 are non-refundable once services have commenced. Time, planning, and resources are allocated immediately after onboarding.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>When Services Begin</H2>
          <Lead>Services are considered to have commenced once any of the following occurs:</Lead>
          <Bullets items={[
            "Access to onboarding forms, systems, or tools is provided",
            "Strategy, planning, or content creation begins",
            "Design, editing, or development work is initiated",
          ]} />
          <P>Once services have commenced, refunds will not be issued.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Subscription Services</H2>
          <Lead>For monthly or recurring plans:</Lead>
          <Bullets items={[
            "Subscriptions may be cancelled at any time prior to the next billing cycle",
            "Cancellation prevents future charges",
            "No refunds are issued for the current billing period",
          ]} />
          <P>Services will remain active until the end of the active billing cycle.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>One-Time Services</H2>
          <P>Payments for one-time services, including but not limited to video production and website design, are non-refundable once work has commenced, regardless of project stage or completion status.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Results Disclaimer</H2>
          <P>All services are delivered as professional execution of the agreed scope. Refunds are not contingent on performance metrics, engagement levels, or business outcomes.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Delays and Client Responsibility</H2>
          <Lead>Refunds will not be issued for delays caused by:</Lead>
          <Bullets items={[
            "Missing or incomplete information",
            "Delayed approvals",
            "Lack of communication or feedback from the client",
          ]} />
        </div>

        <div className="flex flex-col gap-4">
          <H2>Service Credits</H2>
          <P>In cases of verified service errors solely attributable to Social 99, service credits may be issued at our discretion. Cash refunds are not guaranteed.</P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>Policy Updates</H2>
          <P>The Social 99 reserves the right to modify this Refund Policy at any time. Any updates will be effective immediately upon posting on the website.</P>
        </div>

        {/* Contact box */}
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 mq450:px-6 py-12">
          <h3 className="text-[#013186] font-bold m-0 mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>Contact</h3>
          <p className="m-0 mb-2 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            For questions regarding this policy, please contact:
          </p>
          <a href="mailto:support@thesocial99.com" className="text-[#013186] font-bold no-underline hover:underline" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            support@thesocial99.com
          </a>
        </div>

      </div>
    </div>
  );
}
