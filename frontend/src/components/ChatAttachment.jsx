// Renders a chat message's file attachment based on its type.
export default function ChatAttachment({ msg, mine }) {
  if (!msg.fileUrl) return null;

  if (msg.fileType === "image") {
    return (
      <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="block">
        <img src={msg.fileUrl} alt={msg.fileName} className="rounded-[12px] max-w-[240px] max-h-[240px] object-cover" />
      </a>
    );
  }

  if (msg.fileType === "video") {
    return <video src={msg.fileUrl} controls className="rounded-[12px] max-w-[260px] max-h-[260px] bg-black" />;
  }

  // generic file / document
  return (
    <a
      href={msg.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-[10px] px-3 py-2 no-underline border ${mine ? "border-white/30 text-white" : "border-[#d8deea] text-[#013186]"}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
      <span className="text-[13px] font-semibold truncate max-w-[180px]">{msg.fileName || "Download file"}</span>
    </a>
  );
}
