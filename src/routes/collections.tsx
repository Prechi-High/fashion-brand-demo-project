import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Heart, LayoutGrid, Play, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/atelier/AppShell";
import { TopBar } from "@/components/atelier/TopBar";
import { formatNaira, heroImage, readyToWear } from "@/data/atelier";

export const Route = createFileRoute("/collections")({
  head: () => ({ meta: [{ title: "Ready to Wear — Ibitoye Olamide Fashionhome" }, { name: "description", content: "Shop ready-to-wear pieces from Ibitoye Olamide Fashionhome." }] }),
  component: CollectionsPage,
});
const filters = ["All Dresses", "Midi", "Maxi", "Short", "Evening"] as const;
function CollectionsPage() {
  const [active, setActive] = useState<string>("All Dresses");
  const list = readyToWear.filter((d) => active === "All Dresses" || d.fit === active);
  return <AppShell><TopBar />
    <section className="relative overflow-hidden"><img src={heroImage} alt="Ready-to-wear fashion in the atelier" width={1200} height={912} className="absolute inset-0 size-full object-cover opacity-90" /><div className="relative bg-gradient-to-r from-background via-background/85 to-background/10 px-4 py-8"><p className="text-[10px] uppercase tracking-[0.2em] text-primary">The wardrobe edit</p><h1 className="mt-2 font-display text-4xl uppercase tracking-wide text-foreground">Ready to Wear</h1><p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">Beautiful pieces, ready when you are. Choose your favourite and buy instantly.</p></div></section>
    <div className="flex gap-2 overflow-x-auto px-4 py-4">{filters.map((f) => <button key={f} type="button" onClick={() => setActive(f)} className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs ${active === f ? "border-primary bg-accent text-foreground" : "border-border bg-card text-muted-foreground"}`}>{f === "All Dresses" && <LayoutGrid className="size-3.5" />}{f}</button>)}<button type="button" className="flex shrink-0 items-center gap-1.5 rounded-full border border-primary bg-card px-3.5 py-2 text-xs text-primary"><SlidersHorizontal className="size-3.5" /> Filter</button></div>
    <div className="flex items-center justify-between px-4"><p className="text-xs text-muted-foreground">{list.length} Pieces</p><button type="button" className="flex items-center gap-1 text-xs text-foreground">Sort by: <span className="font-medium">Popular</span><ChevronDown className="size-3.5" /></button></div>
    <main className="grid grid-cols-2 gap-3 px-4 py-4">{list.map((d) => <article key={d.id} className="overflow-hidden rounded-2xl border border-border bg-card"><Link to="/design/$designId" params={{ designId: d.id }}><div className="relative"><img src={d.image} alt={d.name} loading="lazy" width={800} height={1100} className="h-52 w-full object-cover" /><span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-card/85"><Heart className="size-3.5 text-foreground" /></span><span className="absolute inset-0 m-auto flex size-9 items-center justify-center rounded-full bg-card/80"><Play className="size-4 fill-foreground text-foreground" /></span></div></Link><div className="flex flex-col gap-2 p-3"><h2 className="text-[13px] font-medium text-foreground">{d.name}</h2><p className="text-xs text-primary">{formatNaira(d.price)}</p><p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">{d.blurb}</p><Link to="/design/$designId" params={{ designId: d.id }} className="flex items-center justify-center gap-1 rounded-full bg-primary py-2 text-[10px] font-semibold text-primary-foreground"><ShoppingBag className="size-3" /> Buy now</Link></div></article>)}</main>
  </AppShell>;
}
