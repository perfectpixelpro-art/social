import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL || "https://radar-daily-roundup.ngrok-free.dev/webhook/00a6a655-a1c0-4e85-96d6-cc6709177c14/chat";

const STYLE_ID = "s99-chat-style";
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  // Only CSS variables — safe theming that won't break the widget's layout/input.
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
  `;
  document.head.appendChild(style);
}

// Programmatically open the S99 chat (used by the "Ask S99" sidebar button).
export function openS99() {
  const toggle = document.querySelector("#s99-chat .chat-window-toggle, #s99-chat [class*='toggle']");
  if (toggle) toggle.click();
}

// Floating S99 chatbot — marketing pages + client dashboard only.
// Mounts to body so it floats correctly; removed on unmount (so it never shows on admin).
export default function ChatWidget() {
  useEffect(() => {
    injectStyles();
    // dedicated host appended to <body>
    let host = document.getElementById("s99-chat");
    if (!host) {
      host = document.createElement("div");
      host.id = "s99-chat";
      document.body.appendChild(host);
      createChat({
        webhookUrl: WEBHOOK_URL,
        target: "#s99-chat",
        mode: "window",
        showWelcomeScreen: false,
        loadPreviousSession: true,
        initialMessages: ["Welcome! I'm S99, powered by The Social 99. How can I assist you today? ✨"],
        i18n: {
          en: {
            title: "S99",
            subtitle: "Powered by The Social 99",
            footer: "",
            getStarted: "New conversation",
            inputPlaceholder: "Enter your message…",
            closeButtonTooltip: "Close chat",
          },
        },
      });
    }
    return () => { const h = document.getElementById("s99-chat"); if (h) h.remove(); };
  }, []);

  return null;
}
