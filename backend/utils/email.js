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
