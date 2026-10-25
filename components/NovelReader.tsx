"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NovelReader({ count, pdf }: { count: number; pdf: string }) {
  const [p, setP] = useState(1);
  const go = (n: number) => setP(Math.max(1, Math.min(count, n)));
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") setP((x) => Math.min(count, x + 1)); if (e.key === "ArrowLeft") setP((x) => Math.max(1, x - 1)); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [count]);
  const src = `/novel/page-${String(p).padStart(2, "0")}.jpg`;
  return (
    <div className="reader">
      <button className="stage" onClick={() => go(p + 1)} aria-label="Next page">
        <Image src={src} alt={`Cryptic Claws, page ${p}`} width={800} height={1267} priority sizes="(max-width: 700px) 90vw, 520px" />
      </button>
      <div className="reader-bar">
        <button className="btn ghost" onClick={() => go(p - 1)} disabled={p === 1}>← Prev</button>
        <span>Page {p} of {count}</span>
        <button className="btn ghost" onClick={() => go(p + 1)} disabled={p === count}>Next →</button>
      </div>
      <input type="range" min={1} max={count} value={p} onChange={(e) => go(Number(e.target.value))} aria-label="Page" />
      <a className="btn primary" href={pdf} download>Download full novel (PDF)</a>
    </div>
  );
}
