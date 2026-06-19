import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Lightweight square avatar cropper — no external library.
 * Lets the user zoom (slider / wheel) and drag the image inside a circular
 * viewport, then exports a 512×512 JPEG Blob via onCropped(blob).
 */
export default function AvatarCropModal({ src, onCancel, onCropped, saving = false }) {
  const VIEW = 280; // viewport size in px
  const OUT = 512;  // exported image size
  const imgRef = useRef(null);
  const [img, setImg] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 }); // top-left offset of the (scaled) image
  const drag = useRef(null);

  // Load the source image and fit it to cover the viewport.
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const base = Math.max(VIEW / image.width, VIEW / image.height);
      setImg(image);
      setMinZoom(base);
      setZoom(base);
      const w = image.width * base, h = image.height * base;
      setPos({ x: (VIEW - w) / 2, y: (VIEW - h) / 2 });
    };
    image.src = src;
  }, [src]);

  const clamp = useCallback((p, z) => {
    if (!img) return p;
    const w = img.width * z, h = img.height * z;
    const minX = VIEW - w, minY = VIEW - h;
    return { x: Math.min(0, Math.max(minX, p.x)), y: Math.min(0, Math.max(minY, p.y)) };
  }, [img]);

  const onPointerDown = (e) => { drag.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y }; };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const nx = drag.current.px + (e.clientX - drag.current.sx);
    const ny = drag.current.py + (e.clientY - drag.current.sy);
    setPos(clamp({ x: nx, y: ny }, zoom));
  };
  const onPointerUp = () => { drag.current = null; };

  const onZoom = (z) => {
    const nz = Math.max(minZoom, Math.min(minZoom * 4, z));
    // keep the viewport centre stable while zooming
    const cx = VIEW / 2, cy = VIEW / 2;
    const ratio = nz / zoom;
    const nx = cx - (cx - pos.x) * ratio;
    const ny = cy - (cy - pos.y) * ratio;
    setZoom(nz);
    setPos(clamp({ x: nx, y: ny }, nz));
  };

  const crop = () => {
    if (!img) return;
    const canvas = document.createElement("canvas");
    canvas.width = OUT; canvas.height = OUT;
    const ctx = canvas.getContext("2d");
    const scale = OUT / VIEW;
    // Source rect in original-image coordinates that maps to the viewport.
    const sx = -pos.x / zoom, sy = -pos.y / zoom, sSize = VIEW / zoom;
    ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, OUT, OUT);
    canvas.toBlob((blob) => { if (blob) onCropped(new File([blob], "avatar.jpg", { type: "image/jpeg" })); }, "image/jpeg", 0.9);
    void scale;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-[16px] p-6 w-[360px] max-w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="m-0 mb-1 text-[18px] font-bold text-[#0b1f44]">Adjust your photo</h3>
        <p className="m-0 mb-4 text-[13px] text-[#7a8499]">Drag to reposition · use the slider to zoom.</p>

        <div
          className="relative mx-auto rounded-full overflow-hidden bg-[#eef1f6] cursor-grab active:cursor-grabbing select-none"
          style={{ width: VIEW, height: VIEW }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onWheel={(e) => { e.preventDefault(); onZoom(zoom * (e.deltaY < 0 ? 1.08 : 0.92)); }}
        >
          {img && (
            <img
              ref={imgRef}
              src={src}
              alt=""
              draggable={false}
              style={{ position: "absolute", left: pos.x, top: pos.y, width: img.width * zoom, height: img.height * zoom, maxWidth: "none" }}
            />
          )}
          <div className="absolute inset-0 rounded-full ring-2 ring-white/80 pointer-events-none" />
        </div>

        <input type="range" min={minZoom} max={minZoom * 4} step="0.01" value={zoom}
          onChange={(e) => onZoom(Number(e.target.value))}
          className="w-full mt-5 accent-[#013186] cursor-pointer" />

        <div className="flex gap-3 mt-5">
          <button onClick={onCancel} disabled={saving} className="flex-1 h-[44px] rounded-[10px] border border-[#e3e9f5] text-[#0b1f44] font-bold text-[14px] hover:bg-[#f5f7fb] cursor-pointer disabled:opacity-60">
            Cancel
          </button>
          <button onClick={crop} disabled={saving || !img} className="flex-1 h-[44px] rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">
            {saving ? "Saving…" : "Save photo"}
          </button>
        </div>
      </div>
    </div>
  );
}
