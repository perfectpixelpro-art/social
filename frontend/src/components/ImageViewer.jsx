import { useState, useEffect } from "react";

// Call this from anywhere to open an image in the popup lightbox.
export const openImage = (url, name = "") => {
  window.dispatchEvent(new CustomEvent("open-image", { detail: { url, name } }));
};

// Mount ONCE near the app root. Listens for openImage() calls and renders the popup.
export default function ImageViewerHost() {
  const [img, setImg] = useState(null); // { url, name } | null

  useEffect(() => {
    const onOpen = (e) => setImg(e.detail);
    const onKey = (e) => { if (e.key === "Escape") setImg(null); };
    window.addEventListener("open-image", onOpen);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("open-image", onOpen); window.removeEventListener("keydown", onKey); };
  }, []);

  if (!img) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setImg(null)}>
      {/* close (cross) button */}
      <button
        onClick={() => setImg(null)}
        className="absolute top-5 right-6 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
        title="Close"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
      <img
        src={img.url}
        alt={img.name}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[92vw] max-h-[88vh] object-contain rounded-[10px] shadow-2xl"
      />
      {img.name && <p className="absolute bottom-5 left-0 right-0 text-center text-white/80 text-[13px] font-semibold m-0 px-4 truncate">{img.name}</p>}
    </div>
  );
}
