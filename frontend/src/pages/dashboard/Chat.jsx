import { useState } from "react";

const tag = (label, cls) => ({ label, cls });
const conversations = [
  { name: "Elmer Laverty", time: "12m", preview: "Haha oh man", tags: [tag("Question", "amber"), tag("Help wanted", "green")] },
  { name: "Florencio Dorrance", time: "24m", preview: "woohoooo", tags: [tag("Some content", "gray")], active: true },
  { name: "Lavern Laboy", time: "1h", preview: "Haha that's terrifying", tags: [tag("Bug", "red"), tag("Hacktoberfest", "green")] },
  { name: "Titus Kitamura", time: "5h", preview: "omg, this is amazing", tags: [tag("Question", "amber"), tag("Some content", "gray")] },
  { name: "Geoffrey Mott", time: "2d", preview: "aww", tags: [tag("Request", "green")] },
  { name: "Alfonzo Schuessler", time: "1m", preview: "perfect!", tags: [tag("Follow up", "gray")] },
];

const team = [
  { name: "Florencio Dorrance", role: "Market Development Manager" },
  { name: "Benny Spanbauer", role: "Area Sales Manager" },
  { name: "Jamel Eusebio", role: "Administrator" },
  { name: "Lavern Laboy", role: "Account Executive" },
  { name: "Alfonzo Schuessler", role: "Proposal Writer" },
  { name: "Daryl Nehls", role: "Nursing Assistant" },
];

const thread = [
  { from: "them", text: "omg, this is amazing" },
  { from: "them", text: "perfect! ✅" },
  { from: "them", text: "Wow, this is really epic" },
  { from: "me", text: "How are you?" },
  { from: "them", text: "just ideas for next time" },
  { from: "them", text: "I'll be there in 2 mins 🤗" },
  { from: "me", text: "woohoooo" },
  { from: "me", text: "Haha oh man" },
  { from: "me", text: "Haha that's terrifying" },
  { from: "them", text: "aww" },
  { from: "them", text: "omg, this is amazing" },
  { from: "them", text: "woohoooo 🔥" },
];

const tagColors = {
  amber: "bg-[#fef3c7] text-[#92710a]",
  green: "bg-[#dcfce7] text-[#15803d]",
  red: "bg-[#fee2e2] text-[#b91c1c]",
  gray: "bg-[#eef1f6] text-[#5b6472]",
};

const Avatar = ({ name, size = 40 }) => {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span
      className="rounded-full bg-[#dbe9ff] text-[#013186] font-bold flex items-center justify-center shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials}
    </span>
  );
};

export default function Chat() {
  const [text, setText] = useState("");

  return (
    <div className="h-full flex min-h-0">

      {/* ── Messages list (left) ── */}
      <aside className="w-[330px] shrink-0 border-r border-[#eef1f6] flex flex-col min-h-0 mq800:hidden">
        <div className="px-5 py-5 flex items-center gap-2">
          <h2 className="m-0 text-[20px] font-bold text-[#0b1f44]">Messages</h2>
          <span className="text-[#9aa3b2] text-sm">▾</span>
          <span className="ml-auto text-[12px] font-bold text-[#5b6472] bg-[#eef1f6] rounded-full px-2 py-0.5">12</span>
        </div>
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-[10px] bg-[#f5f7fb] px-3 py-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa3b2" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            <input value="" readOnly placeholder="Search messages" className="bg-transparent outline-none text-[13px] text-[#5b6472] w-full placeholder-[#9aa3b2]" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button key={c.name} className={`w-full text-left flex gap-3 px-4 py-3 border-b border-[#f4f6fa] cursor-pointer transition-colors ${c.active ? "bg-[#f0f6ff]" : "hover:bg-[#fafbfd]"}`}>
              <Avatar name={c.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="m-0 text-[14px] font-bold text-[#0b1f44] truncate">{c.name}</p>
                  <span className="text-[11px] text-[#9aa3b2] shrink-0">{c.time}</span>
                </div>
                <p className="m-0 text-[13px] text-[#7a8499] truncate">{c.preview}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {c.tags.map((t) => (
                    <span key={t.label} className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${tagColors[t.cls]}`}>{t.label}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* ── Conversation (center) ── */}
      <section className="flex-1 min-w-0 flex flex-col min-h-0">
        {/* header */}
        <div className="h-[72px] shrink-0 border-b border-[#eef1f6] flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Avatar name="Florencio Dorrance" size={42} />
            <div className="leading-tight">
              <p className="m-0 text-[16px] font-bold text-[#0b1f44]">Florencio Dorrance</p>
              <p className="m-0 text-[12px] text-[#16a34a] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] inline-block" /> Online
              </p>
            </div>
          </div>
          <button className="text-[#013186] font-bold text-[14px] border border-[#cfe0ff] rounded-[8px] px-4 py-2 hover:bg-[#f0f6ff] transition-colors cursor-pointer">End Chat</button>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto px-6 mq450:px-4 py-5 flex flex-col gap-3 bg-white">
          {thread.map((m, i) => (
            <div key={i} className={`flex items-end gap-2 ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              {m.from === "them" && <Avatar name="Florencio Dorrance" size={30} />}
              <div className={`max-w-[60%] mq450:max-w-[75%] px-4 py-2.5 text-[14px] leading-snug ${
                m.from === "me"
                  ? "bg-[#1463ff] text-white rounded-[16px] rounded-br-[4px]"
                  : "bg-[#eef1f6] text-[#1a2233] rounded-[16px] rounded-bl-[4px]"
              }`}>
                {m.text}
              </div>
              {m.from === "me" && <Avatar name="James Brown" size={30} />}
            </div>
          ))}
        </div>

        {/* input */}
        <div className="shrink-0 border-t border-[#eef1f6] px-5 py-4 flex items-center gap-3">
          <button className="text-[#9aa3b2] cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21.4 11.05 12.25 20.2a5 5 0 0 1-7.07-7.07l8.49-8.49a3 3 0 0 1 4.24 4.24l-8.49 8.49a1 1 0 0 1-1.41-1.41l7.78-7.78" /></svg>
          </button>
          <div className="flex-1 flex items-center rounded-[12px] border border-[#e3e9f5] bg-white px-4 py-2.5">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message"
              className="flex-1 bg-transparent outline-none text-[14px] text-[#1a2233] placeholder-[#9aa3b2]"
            />
            <button className="text-[#1463ff] cursor-pointer" onClick={() => setText("")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Directory (right) ── */}
      <aside className="w-[300px] shrink-0 border-l border-[#eef1f6] flex flex-col min-h-0 mq1125:hidden">
        <div className="h-[72px] shrink-0 border-b border-[#eef1f6] flex items-center justify-between px-5">
          <h2 className="m-0 text-[18px] font-bold text-[#0b1f44]">Directory</h2>
          <button className="text-[#9aa3b2] cursor-pointer">⋮</button>
        </div>
        <div className="px-5 py-4 flex items-center gap-2">
          <p className="m-0 text-[14px] font-bold text-[#0b1f44]">Team Members</p>
          <span className="text-[12px] font-bold text-[#5b6472] bg-[#eef1f6] rounded-full px-2 py-0.5">6</span>
        </div>
        <div className="flex-1 overflow-y-auto px-3">
          {team.map((t) => (
            <div key={t.name} className="flex items-center gap-3 px-2 py-2.5 rounded-[10px] hover:bg-[#fafbfd]">
              <Avatar name={t.name} size={38} />
              <div className="min-w-0">
                <p className="m-0 text-[14px] font-bold text-[#0b1f44] truncate">{t.name}</p>
                <p className="m-0 text-[12px] text-[#9aa3b2] truncate">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
