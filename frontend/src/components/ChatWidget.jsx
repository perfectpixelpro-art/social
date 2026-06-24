import { useEffect } from "react";

const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL || "https://radar-daily-roundup.ngrok-free.dev/webhook/00a6a655-a1c0-4e85-96d6-cc6709177c14/chat";

// Common questions shown as quick-tap chips on the chat screen.
const FAQS = [
  "What plans do you offer?",
  "How does scheduling work?",
  "Do you manage Instagram & Facebook?",
  "How do I upgrade my plan?",
  "How do I contact support?",
];

const STYLE_ID = "s99-chat-style";
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    :root {
      --chat--color-primary: #1463ff;
      --chat--color-primary-shade-50: #0d56e8;
      --chat--color-primary-shade-100: #0d50d8;
      --chat--color-secondary: #013186;
      --chat--border-radius: 16px;
      --chat--window--width: 380px;
      --chat--window--height: 600px;
      --chat--header--background: linear-gradient(135deg, #1463ff 0%, #013186 100%);
      --chat--header--color: #ffffff;
      --chat--heading--font-size: 19px;
      --chat--subtitle--font-size: 12px;
      --chat--toggle--size: 60px;
      --chat--toggle--background: linear-gradient(135deg, #1463ff 0%, #013186 100%);
      --chat--toggle--hover--background: #0d50d8;
      --chat--toggle--active--background: #013186;
      --chat--message--bot--background: #f1f5ff;
      --chat--message--bot--color: #0b1f44;
      --chat--message--user--background: #1463ff;
      --chat--message--user--color: #ffffff;
    }
    /* Lift the floating toggle + chat window above the dashboard message bar. */
    #s99-chat .chat-window-toggle,
    #s99-chat [class*="toggle"] {
      bottom: 92px !important;
      right: 24px !important;
    }
    #s99-chat .chat-window,
    #s99-chat [class*="chat-window-wrapper"] {
      bottom: 92px !important;
    }
    /* Make sure the input row + send button are always fully visible. */
    #s99-chat .chat-input,
    #s99-chat .chat-inputs {
      display: flex !important;
      align-items: flex-end !important;
      gap: 8px !important;
      padding: 10px 12px !important;
      box-sizing: border-box !important;
    }
    #s99-chat .chat-input textarea,
    #s99-chat textarea {
      flex: 1 1 auto !important;
      min-width: 0 !important;
      padding-right: 8px !important;
    }
    #s99-chat .chat-input-send-button,
    #s99-chat [class*="send-button"],
    #s99-chat button[class*="send"] {
      flex: 0 0 auto !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 40px !important;
      height: 40px !important;
      margin-left: 4px !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    /* FAQ quick-reply chips */
    #s99-faq {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 10px 12px; border-top: 1px solid #eef1f6; background: #fff;
    }
    #s99-faq button {
      font-size: 12px; font-weight: 600; color: #013186;
      background: #eef4ff; border: 1px solid #d7e6ff; border-radius: 999px;
      padding: 6px 12px; cursor: pointer; transition: background .15s;
    }
    #s99-faq button:hover { background: #dbe9ff; }
  `;
  document.head.appendChild(style);
}

// Send a question through the n8n chat input programmatically.
function askQuestion(text) {
  const root = document.getElementById("s99-chat");
  if (!root) return;
  const textarea = root.querySelector("textarea");
  if (!textarea) return;
  // Set value via the native setter so the widget's framework picks it up.
  const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
  setter.call(textarea, text);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  // Once a question is asked, hide the FAQ chips so the answer gets full space.
  const bar = root.querySelector("#s99-faq");
  if (bar) bar.style.display = "none";
  // Submit: prefer the send button, fall back to Enter key.
  const sendBtn = root.querySelector(".chat-input-send-button, [class*='send-button'], button[class*='send']");
  if (sendBtn) { sendBtn.click(); return; }
  textarea.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
}

// Inject the FAQ chips above the input once the chat window exists.
function mountFaqs() {
  const root = document.getElementById("s99-chat");
  if (!root || root.querySelector("#s99-faq")) return false;
  const inputRow = root.querySelector(".chat-input, .chat-inputs");
  if (!inputRow) return false;
  const bar = document.createElement("div");
  bar.id = "s99-faq";
  FAQS.forEach((q) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = q;
    b.addEventListener("click", () => askQuestion(q));
    bar.appendChild(b);
  });
  inputRow.parentNode.insertBefore(bar, inputRow);
  return true;
}

// Programmatically open the Dot chat (used by the "Ask Dot" sidebar button).
export function openS99() {
  const toggle = document.querySelector("#s99-chat .chat-window-toggle, #s99-chat [class*='toggle']");
  if (toggle) toggle.click();
}

// Floating Dot chatbot — marketing pages + client dashboard only.
export default function ChatWidget() {
  useEffect(() => {
    // Skip during react-snap pre-render so the chat DOM is NOT baked into the
    // static HTML. If it were, the hydrated build would see #s99-chat already
    // present and never call createChat() — leaving a dead toggle button.
    if (navigator.userAgent === "ReactSnap") return;

    let cancelled = false;
    let faqTimer;

    // Lazy-load the heavy @n8n/chat library AFTER first paint so it stays out
    // of the main bundle (big "unused JS" / "3rd parties" win). Defer to idle.
    const start = () => {
      Promise.all([import("@n8n/chat"), import("@n8n/chat/style.css")]).then(
        ([{ createChat }]) => {
          if (cancelled) return;
          injectStyles();
          // Remove any stale host left over from a previous pre-render.
          const stale = document.getElementById("s99-chat");
          if (stale) stale.remove();

          const host = document.createElement("div");
          host.id = "s99-chat";
          document.body.appendChild(host);
          createChat({
            webhookUrl: WEBHOOK_URL,
            target: "#s99-chat",
            mode: "window",
            showWelcomeScreen: false,
            loadPreviousSession: true,
            initialMessages: ["Hi! I'm Dot, your assistant from The Social 99. How can I help you today? ✨"],
            i18n: {
              en: {
                title: "Dot",
                subtitle: "Powered by The Social 99",
                footer: "",
                getStarted: "New conversation",
                inputPlaceholder: "Enter your message…",
                closeButtonTooltip: "Close chat",
              },
            },
          });
          // Keep trying to mount the FAQ chips until the chat window renders.
          faqTimer = setInterval(() => { if (mountFaqs()) clearInterval(faqTimer); }, 600);
          setTimeout(() => clearInterval(faqTimer), 15000);
        }
      );
    };

    // Load the chat only once the user interacts (scroll/move/touch/key) or
    // after a long fallback delay. This keeps the heavy 1.45MB library OFF the
    // main thread during initial load + the Lighthouse trace (low TBT), while
    // still loading instantly the moment a real visitor engages.
    const events = ["scroll", "mousemove", "touchstart", "keydown", "click"];
    let started = false;
    const trigger = () => {
      if (started) return;
      started = true;
      events.forEach((e) => window.removeEventListener(e, trigger));
      clearTimeout(fallback);
      start();
    };
    events.forEach((e) => window.addEventListener(e, trigger, { passive: true, once: false }));
    const fallback = setTimeout(trigger, 8000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      clearInterval(faqTimer);
      events.forEach((e) => window.removeEventListener(e, trigger));
      const h = document.getElementById("s99-chat"); if (h) h.remove();
    };
  }, []);

  return null;
}
