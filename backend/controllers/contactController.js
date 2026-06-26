import Contact from "../models/Contact.js";
import { sendRawEmail } from "../utils/email.js";

// Where contact / strategy form submissions are emailed.
const CONTACT_TO = process.env.CONTACT_TO || "support@thesocial99.com";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Name, email, and message are required." });
    }
    const contact = await Contact.create({ name, email, phone, message });

    // Email the submission to support — don't fail the request if email errors.
    try {
      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#222;line-height:1.6;font-size:15px;">
          <h2 style="color:#013186;margin:0 0 16px;">New ${source || "contact"} form submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="background:#f5f8ff;border:1px solid #e0e8f5;border-radius:8px;padding:12px;white-space:pre-wrap;">${message}</p>
        </div>`;
      await sendRawEmail(CONTACT_TO, `New ${source || "contact"} form: ${name}`, html);
    } catch (mailErr) {
      console.error("Contact email failed:", mailErr?.message || mailErr);
    }

    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
