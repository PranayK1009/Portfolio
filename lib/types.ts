export type Img = { src: string; caption: string; fit?: string };
export type Entry = {
  slug: string; title: string; tags: string[]; status: "complete" | "ongoing" | "progress";
  date: string; desc: string; meta: string; longDesc: string[]; highlights: string[];
  links: { label: string; url: string }[]; images: Img[]; novel: boolean;
};
export type Site = {
  name: string; eyebrow: string; lede: string; meta: string[];
  updates: { text: string; status: string }[]; awards: { award: string; context: string }[]; footer: string;
};
