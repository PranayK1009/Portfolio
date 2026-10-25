"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Entry } from "@/lib/types";
import NovelReader from "./NovelReader";

const statusLabel = { complete: "Complete", ongoing: "Ongoing", progress: "In progress" };

export default function Work({ entries, categories, novelPages, novelPdf }: { entries: Entry[]; categories: string[]; novelPages: number; novelPdf: string }) {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<Entry | null>(null);
  const shown = useMemo(() => (cat === "All" ? entries : entries.filter((e) => e.tags.includes(cat))), [cat, entries]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="filters" role="tablist">
        {["All", ...categories].map((c) => (
          <button key={c} className={`chip${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <p className="count">{shown.length} {shown.length === 1 ? "entry" : "entries"}</p>
      <div className="grid">
        {shown.map((e) => {
          const cover = e.images.find((i) => i.fit !== "contain") ?? e.images[0];
          return (
            <button key={e.slug} className="card" onClick={() => setOpen(e)}>
              {cover && <div className="cover"><Image src={cover.src} alt="" fill sizes="(max-width: 700px) 100vw, 340px" /></div>}
              <div className="body">
                <div className="tags">{e.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                <h3>{e.title}</h3>
                <div className="sub"><span>{e.date}</span><b className={`pill ${e.status}`}>{statusLabel[e.status]}</b></div>
                <p>{e.desc}</p>
                {e.meta && <div className="metaline">{e.meta}</div>}
              </div>
            </button>
          );
        })}
      </div>

      {open && (
        <div className="overlay" onClick={() => setOpen(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={open.title} onClick={(ev) => ev.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Close">✕</button>
            <div className="tags">{open.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            <h2>{open.title}</h2>
            <div className="sub"><span>{open.date}</span><b className={`pill ${open.status}`}>{statusLabel[open.status]}</b></div>
            <h4>Overview</h4>
            {open.longDesc.map((p, i) => <p key={i}>{p}</p>)}
            {open.highlights.length > 0 && (<><h4>Highlights</h4><ul className="hl">{open.highlights.map((h) => <li key={h}>{h}</li>)}</ul></>)}
            {open.novel && (<><h4>Read the novel</h4><NovelReader count={novelPages} pdf={novelPdf} /></>)}
            {open.links.length > 0 && (<><h4>Links</h4><div className="row">{open.links.map((l, i) => <a key={l.url} className={`btn ${i ? "ghost" : "primary"}`} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}</div></>)}
            {open.meta && (<><h4>Recognition</h4><p>{open.meta}</p></>)}
            {open.images.length > 0 && (
              <><h4>Gallery</h4>
              <div className="gallery">
                {open.images.map((im) => (
                  <a key={im.src} href={im.src} target="_blank" rel="noopener noreferrer" className={`shot${im.fit === "contain" ? " doc" : ""}`}>
                    <div className="frame"><Image src={im.src} alt={im.caption} fill sizes="(max-width: 700px) 90vw, 300px" /></div>
                    <span>{im.caption}</span>
                  </a>
                ))}
              </div></>
            )}
          </div>
        </div>
      )}
    </>
  );
}
