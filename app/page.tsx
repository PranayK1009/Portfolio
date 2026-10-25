import site from "@/data/site.json";
import raw from "@/data/activities.json";
import type { Entry } from "@/lib/types";
import Work from "@/components/Work";

const entries = raw as Entry[];
const order = ["Projects", "Research", "Leadership", "Presentations", "Coding", "Educational Initiatives", "Community Service", "Sports", "Arts"];
const categories = order.filter((c) => entries.some((e) => e.tags.includes(c)));
const NOVEL_PAGES = 44;
const NOVEL_PDF = "/Cryptic_Claws-The_Crystal_Of_Infinite_Patterns.pdf";
const label: Record<string, string> = { complete: "Complete", ongoing: "Ongoing", upcoming: "Upcoming" };

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="wrap bar">
          <a className="brand" href="#top">{site.name}</a>
          <nav><a href="#updates">Updates</a><a href="#work">Work</a><a href="#awards">Awards</a></nav>
        </div>
      </header>
      <main id="top">
        <section className="wrap hero">
          <p className="eyebrow">{site.eyebrow}</p>
          <h1>{site.name}</h1>
          <p className="lede">{site.lede}</p>
          <ul className="facts">{site.meta.map((m) => <li key={m}>{m}</li>)}</ul>
          <a href="#work" className="btn primary">See the work</a>
        </section>

        <section id="updates" className="wrap section">
          <h2>Recent updates</h2>
          <ul className="updates">
            {site.updates.map((u) => (
              <li key={u.text}><span>{u.text}</span><b className={`pill ${u.status}`}>{label[u.status] ?? u.status}</b></li>
            ))}
          </ul>
        </section>

        <section id="work" className="wrap section">
          <h2>Work</h2>
          <p className="intro">Projects, research, leadership and educational initiatives.</p>
          <Work entries={entries} categories={categories} novelPages={NOVEL_PAGES} novelPdf={NOVEL_PDF} />
        </section>

        <section id="awards" className="wrap section">
          <h2>Awards and recognition</h2>
          <div className="awards">
            {site.awards.map((a) => (<div key={a.award + a.context} className="award"><strong>{a.award}</strong><span>{a.context}</span></div>))}
          </div>
        </section>
      </main>
      <footer className="wrap foot">{site.footer}</footer>
    </>
  );
}
