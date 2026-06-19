import { Resend } from "resend";

// Lazy init: create the client on first use, after dotenv has loaded.
let _resend = null;
const getResend = () => {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
};
const FROM = () => process.env.EMAIL_FROM || "The Social 99 <onboarding@resend.dev>";

const wrap = (title, body) => `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f8ff;padding:32px;">
    <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e0e8f5;border-radius:16px;overflow:hidden;">
      <div style="background:#013186;padding:24px 32px;">
        <h1 style="color:#fff;font-size:20px;margin:0;">The Social 99</h1>
      </div>
      <div style="padding:32px;color:#222;line-height:1.6;font-size:15px;">
        <h2 style="color:#013186;font-size:22px;margin:0 0 16px;">${title}</h2>
        ${body}
      </div>
      <div style="padding:18px 32px;border-top:1px solid #eef2fa;color:#8a93a6;font-size:12px;">
        © ${new Date().getFullYear()} The Social 99 · Affordable social media management
      </div>
    </div>
  </div>`;

const button = (link, label) => `
  <a href="${link}" style="display:inline-block;background:#013186;color:#fff;text-decoration:none;
     font-weight:bold;font-size:15px;padding:12px 28px;border-radius:10px;margin:18px 0;">${label}</a>`;

// Send a raw HTML email (used by the automation engine + admin templates). Supports a {{name}} token.
export async function sendRawEmail(to, subject, html, name = "") {
  const fill = (s) => (s || "").replaceAll("{{name}}", name || "there");
  return getResend().emails.send({ from: FROM(), to, subject: fill(subject), html: fill(html) });
}

// Default templates (used until an admin saves a custom one).
export const defaultTemplates = {
  newsletter: {
    name: "Newsletter",
    subject: "What's new at The Social 99 ✨",
    html: wrap("This fortnight at The Social 99",
      `<p>Hi {{name}},</p><p>Here's a quick roundup of tips, trends, and updates to grow your social presence.</p>
       ${button((process.env.CLIENT_URL || "") + "/blogs", "Read our latest →")}
       <p style="font-size:13px;color:#7c7f81;">You're receiving this because you subscribed to our newsletter.</p>`),
  },
  trial: {
    name: "Free Trial (daily)",
    subject: "Your free trial — make the most of it 🚀",
    html: wrap("Your free trial is active",
      `<p>Hi {{name}},</p><p>Your 7-day free trial is running. Connect your accounts and explore your analytics today.</p>
       ${button((process.env.CLIENT_URL || "") + "/dashboard", "Open your dashboard →")}
       <p style="font-size:13px;color:#7c7f81;">Upgrade anytime to unlock posting & scheduling.</p>`),
  },
  cart: {
    name: "Abandoned Cart",
    subject: "You left something behind 🛒",
    html: wrap("Finish setting up your plan",
      `<p>Hi {{name}},</p><p>You were almost there! Complete your checkout to start growing with The Social 99.</p>
       ${button((process.env.CLIENT_URL || "") + "/pricing", "Complete checkout →")}
       <p style="font-size:13px;color:#7c7f81;">Need help choosing a plan? Just reply to this email.</p>`),
  },
  plan_expiry: {
    name: "Plan Expiring",
    subject: "Your plan is about to expire ⏳",
    html: wrap("Don't lose your momentum",
      `<p>Hi {{name}},</p><p>Your plan is ending soon. Renew now to keep your scheduling, analytics, and content active.</p>
       ${button((process.env.CLIENT_URL || "") + "/dashboard/store", "Renew now →")}
       <p style="font-size:13px;color:#7c7f81;">Questions about your plan? We're here to help.</p>`),
  },
};

// Sent on signup
export async function sendVerificationEmail(to, name, link) {
  const html = wrap(
    "Verify your email",
    `<p>Hi ${name || "there"},</p>
     <p>Thanks for signing up with The Social 99! Please confirm your email address to activate your account.</p>
     ${button(link, "Verify Email →")}
     <p style="font-size:13px;color:#7c7f81;">This link expires in 24 hours. If you didn't create an account, you can ignore this email.</p>`
  );
  return getResend().emails.send({ from: FROM(), to, subject: "Verify your email · The Social 99", html });
}

// Sent on login when it's been more than 5 days since the last login
export async function sendLoginVerificationEmail(to, name, link) {
  const html = wrap(
    "Confirm it's really you",
    `<p>Hi ${name || "there"},</p>
     <p>We noticed a sign-in to your account after a while. For your security, please confirm it was you.</p>
     ${button(link, "Confirm Sign-in →")}
     <p style="font-size:13px;color:#7c7f81;">If this wasn't you, please change your password immediately.</p>`
  );
  return getResend().emails.send({ from: FROM(), to, subject: "New sign-in to your account · The Social 99", html });
}

// Sent when a user requests a password reset
export async function sendPasswordResetEmail(to, name, link) {
  const html = wrap(
    "Reset your password",
    `<p>Hi ${name || "there"},</p>
     <p>We received a request to reset your password. Click the button below to choose a new one.</p>
     ${button(link, "Reset Password →")}
     <p style="font-size:13px;color:#7c7f81;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password won't change.</p>`
  );
  return getResend().emails.send({ from: FROM(), to, subject: "Reset your password · The Social 99", html });
}

// Sent to both parties when a Zoom meeting is scheduled
// Build an .ics calendar invite so the meeting drops straight into their calendar.
function buildIcs(meeting) {
  const pad = (n) => String(n).padStart(2, "0");
  const toIcs = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const start = new Date(meeting.startTime);
  const end = new Date(start.getTime() + (Number(meeting.duration) || 30) * 60000);
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//The Social 99//Meetings//EN",
    "METHOD:REQUEST", "BEGIN:VEVENT",
    `UID:${meeting.meetingId || Date.now()}@thesocial99`,
    `DTSTAMP:${toIcs(new Date())}`,
    `DTSTART:${toIcs(start)}`,
    `DTEND:${toIcs(end)}`,
    `SUMMARY:${meeting.topic || "The Social 99 Meeting"}`,
    `DESCRIPTION:Join: ${meeting.joinUrl || ""}`,
    `LOCATION:${meeting.joinUrl || "Online"}`,
    "BEGIN:VALARM", "TRIGGER:-PT15M", "ACTION:DISPLAY", "DESCRIPTION:Meeting in 15 minutes", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}

export async function sendMeetingEmail(to, name, meeting) {
  const dt = new Date(meeting.startTime);
  const when = dt.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });
  const html = wrap(
    "Your Zoom meeting is scheduled",
    `<p>Hi ${name || "there"},</p>
     <p>A Zoom meeting has been scheduled. The calendar invite is attached — open it to add it to your calendar.</p>
     <div style="background:#f5f8ff;border:1px solid #e0e8f5;border-radius:10px;padding:16px;margin:16px 0;">
       <p style="margin:0 0 6px;"><strong>Topic:</strong> ${meeting.topic || "Meeting"}</p>
       <p style="margin:0 0 6px;"><strong>When:</strong> ${when}</p>
       <p style="margin:0;"><strong>Duration:</strong> ${meeting.duration} minutes</p>
     </div>
     ${button(meeting.joinUrl, "Join Meeting →")}
     <p style="font-size:13px;color:#7c7f81;">Or copy this link: <br>${meeting.joinUrl}</p>`
  );
  return getResend().emails.send({
    from: FROM(), to, subject: `Zoom meeting scheduled · ${meeting.topic || "The Social 99"}`, html,
    attachments: [{ filename: "invite.ics", content: Buffer.from(buildIcs(meeting)).toString("base64") }],
  });
}

// 15-minute reminder email before a meeting starts.
export async function sendMeetingReminderEmail(to, name, meeting) {
  const dt = new Date(meeting.startTime);
  const when = dt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  const html = wrap(
    "Your meeting starts in 15 minutes ⏰",
    `<p>Hi ${name || "there"},</p>
     <p>Reminder — <strong>${meeting.topic || "your meeting"}</strong> starts at <strong>${when}</strong> (in about 15 minutes).</p>
     ${button(meeting.joinUrl, "Join Meeting →")}`
  );
  return getResend().emails.send({ from: FROM(), to, subject: `Reminder: ${meeting.topic || "Meeting"} in 15 min`, html });
}
