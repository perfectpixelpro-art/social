import { useState, useRef } from "react";

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

const jobs = [
  {
    title: "Social Media Manager",
    description:
      "We’re looking for a Social Media Manager who can plan and execute structured content across platforms. You’ll manage content calendars, coordinate with designers and editors, maintain brand tone, and ensure consistent publishing. The ideal candidate is organized, strategic, and comfortable handling multiple accounts with clarity and efficiency.",
  },
  {
    title: "Video Editor",
    description:
      "We’re looking for a Video Editor who can transform raw footage into engaging short-form videos for social platforms. You should understand pacing, storytelling, and audience retention, while delivering polished content within defined timelines.",
  },
  {
    title: "Graphic Designer",
    description:
      "We’re hiring a Graphic Designer who can create clean, premium, and brand-aligned visuals for digital platforms. You should understand typography, layout, and modern design aesthetics while maintaining consistency across projects. We value simplicity, precision, and strong attention to detail.",
  },
  {
    title: "Business Development Manager",
    description:
      "We’re hiring a Business Development Manager who can identify growth opportunities, build strong client relationships, and drive consistent revenue. You should be confident in outreach, pitching, and closing while maintaining a clear understanding of client needs. We value clarity, initiative, and a results-focused approach to growth.",
  },
  {
    title: "SEO Specialist",
    description:
      "We’re seeking an SEO Specialist to handle keyword research, on-page optimization, and foundational technical improvements. This role requires analytical thinking and a focus on sustainable, long-term visibility.",
  },
  {
    title: "Backlinking Expert",
    description:
      "We’re seeking a Backlinking Expert to plan and execute high-quality link-building strategies that improve search visibility and domain authority. You should understand outreach, content placement, and ethical SEO practices while ensuring consistency and relevance across backlinks. This role requires attention to detail, persistence, and a focus on long-term impact.",
  },
];

export default function Careers() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", portfolio: null });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleApply = (jobTitle) => {
    setFormData((prev) => ({ ...prev, role: jobTitle }));
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.role) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">

      {/* Hero */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-12">
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 py-24 mq450:py-16 text-center">
          <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(42px, 8vw, 110px)" }}>
            Careers at The Social 99
          </h1>
          <p className="m-0 mt-4 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
            Work with clarity. Execute with purpose. Grow through consistency.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col gap-12">

        <P>
          The Social 99 is a digital services company built for structured execution and dependable delivery. We work with businesses that value clarity, systems, and long-term collaboration, and we bring the same approach to how we build our team.{" "}
          <br />
          This page gives you a clear picture of who we are, how we work, and what you can expect if you choose to work with us.
        </P>

        <div className="flex flex-col gap-4">
          <H2>Who We are and How We Work</H2>
          <P>
            The Social 99 delivers social media management, video editing, website design, and related digital services through well-defined plans and repeatable workflows. Our focus is not on volume or urgency-driven work, but on building reliable systems that produce consistent results.
            <br />
            Every project starts with scope alignment and clear expectations. From there, work moves through planned stages with defined timelines, responsibilities, and quality checks. This structured approach allows us to maintain high standards while working efficiently across multiple client accounts.
            <br />
            We operate as a remote-first team, collaborating across locations and time zones. Our processes are documented, communication is direct, and accountability is shared. We believe good work comes from clarity, not chaos.
          </P>
        </div>

        <div className="flex flex-col gap-4">
          <H2>What it's Like to Work at The Social 99</H2>
          <P>Working at The Social 99 means being part of a focused and organized environment. We prioritize planning over last-minute urgency and systems over constant firefighting.</P>
          <P>Team members are trusted to manage their responsibilities independently while staying aligned with shared goals and timelines. You'll work with clear briefs, realistic deadlines, and defined deliverables, allowing you to focus on quality rather than confusion.</P>
          <Lead>At The Social 99, we value:</Lead>
          <Bullets items={[
            "Clear communication and transparency",
            "Attention to detail and consistency",
            "Ownership of work and respect for processes",
            "Thoughtful execution over rushed output",
          ]} />
          <P>Growth here comes from doing the work well, understanding how the system operates, and contributing ideas that improve how we deliver. We believe long-term success is built through reliability, accountability, and continuous refinement.</P>
        </div>

        {/* Current Openings */}
        <div className="flex flex-col gap-8">
          <H2>Current Openings</H2>

          <div className="flex flex-col mq800:flex-col gap-0 lg:flex-row lg:gap-16 items-start">
            {/* Left label */}
            <div className="lg:w-[480px] mq800:w-full mq800:mb-6 shrink-0">
              <p className="text-[rgba(0,0,0,0.5)] font-semibold m-0" style={{ fontSize: "clamp(16px, 1.5vw, 21px)" }}>
                We are currently accepting applications for the following roles:
              </p>
            </div>

            {/* Accordion */}
            <div className="flex-1 w-full flex flex-col">
              {jobs.map((job, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={job.title} className="border-b border-[rgba(1,49,134,0.12)]">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer"
                    >
                      <span
                        className="text-[#013186] font-bold"
                        style={{ fontSize: "clamp(18px, 2vw, 28px)" }}
                      >
                        {job.title}
                      </span>
                      <span className="text-[#013186] text-2xl font-light ml-4 shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pb-6 flex flex-col gap-5">
                        <p className="m-0 text-[rgba(0,0,0,0.5)] font-semibold leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
                          {job.description}
                        </p>
                        <button
                          onClick={() => handleApply(job.title)}
                          className="self-start flex items-center gap-2 border border-[#013186] rounded-full px-5 py-2 text-[#013186] font-bold bg-[#BCD6FF38] cursor-pointer hover:bg-[#013186] hover:text-white transition-colors"
                          style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}
                        >
                          Apply
                          <span className="w-6 h-6 rounded-full border border-[#013186] flex items-center justify-center text-xs">↗</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* How to Apply + Form */}
        <div ref={formRef} className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 mq450:px-6 py-12 flex flex-col gap-6 scroll-mt-8">
          <h3 className="text-[#013186] font-bold m-0" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
            How to Apply
          </h3>

          <p className="m-0 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            If you're interested in working with The Social 99, we'd like to hear from you
          </p>

          <div>
            <p className="m-0 text-[#111] font-bold" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
              Please email your resume, portfolio, and a brief introduction to:
            </p>
            <a href="mailto:careers@thesocial99.com" className="text-[#013186] font-bold no-underline hover:underline" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
              careers@thesocial99.com
            </a>
          </div>

          <p className="m-0 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Mention the role you're applying for in the subject line. Our team reviews applications on a rolling basis, and shortlisted candidates will be contacted for the next steps.
          </p>

          <p className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Apply now and become part of a team built on clarity, consistency, and execution.
          </p>

          {submitted ? (
            <div className="bg-white rounded-2xl px-8 py-10 text-center flex flex-col gap-3">
              <p className="text-[#013186] font-bold m-0" style={{ fontSize: "clamp(18px, 2vw, 26px)" }}>Application Submitted!</p>
              <p className="text-[rgba(0,0,0,0.5)] font-semibold m-0" style={{ fontSize: "clamp(14px, 1.3vw, 17px)" }}>
                Thank you for applying. We'll review your application and get back to you.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Name */}
              <input
                type="text"
                placeholder="Enter Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-white border border-[rgba(1,49,134,0.15)] rounded-xl px-5 py-4 text-[#111] font-semibold placeholder:text-[rgba(0,0,0,0.35)] outline-none focus:border-[#013186] transition-colors"
                style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full bg-white border border-[rgba(1,49,134,0.15)] rounded-xl px-5 py-4 text-[#111] font-semibold placeholder:text-[rgba(0,0,0,0.35)] outline-none focus:border-[#013186] transition-colors"
                style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}
              />

              {/* Role dropdown */}
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                  className="w-full appearance-none bg-white border border-[rgba(1,49,134,0.15)] rounded-xl px-5 py-4 text-[#111] font-semibold outline-none focus:border-[#013186] transition-colors cursor-pointer"
                  style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: formData.role ? "#111" : "rgba(0,0,0,0.35)" }}
                >
                  <option value="" disabled>--Applying For--</option>
                  {jobs.map((j) => <option key={j.title} value={j.title}>{j.title}</option>)}
                </select>
                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#013186]">▾</span>
              </div>

              {/* Portfolio upload */}
              <div className="flex flex-col gap-2">
                <label className="text-[#111] font-semibold" style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}>
                  Attach Your Portfolio
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip,.png,.jpg"
                  onChange={(e) => setFormData((p) => ({ ...p, portfolio: e.target.files[0] }))}
                  className=" bg-white w-[200px] text-[rgba(0,0,0,0.5)] font-semibold"
                  style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-between bg-white border border-[rgba(1,49,134,0.15)] rounded-xl px-6 py-4 text-[#111] font-bold cursor-pointer hover:bg-[#013186] hover:text-white hover:border-[#013186] transition-colors group"
                style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}
              >
                Apply Now
                <span className="w-7 h-7 rounded-full border border-[rgba(1,49,134,0.3)] flex items-center justify-center group-hover:border-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </span>
              </button>
            </div>
          )}
        </div>

   
      </div>
    </div>
  );
}