import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AppShell } from "@/components/atelier/AppShell";
import { TopBar } from "@/components/atelier/TopBar";
import { useCart } from "@/components/atelier/CartContext";
import { formatNaira } from "@/data/atelier";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { items, count, addItem, removeItem } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.design.price * item.quantity, 0);
  return <AppShell><TopBar variant="inner" />
    <main className="px-4 py-6"><div className="flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-primary">Your selection</p><h1 className="mt-1 font-display text-3xl text-foreground">Cart</h1></div><span className="text-xs text-muted-foreground">{count} {count === 1 ? "item" : "items"}</span></div>
      {items.length === 0 ? <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center"><ShoppingBag className="mx-auto size-8 text-primary" /><p className="mt-3 text-sm text-foreground">Your cart is waiting for something beautiful.</p><Link to="/collections" className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground">Shop ready to wear</Link></div> : <><div className="mt-5 flex flex-col gap-3">{items.map((item) => <div key={`${item.design.id}-${item.color}`} className="flex gap-3 rounded-2xl border border-border bg-card p-3"><img src={item.design.image} alt={item.design.name} className="size-24 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><h2 className="text-sm font-medium text-foreground">{item.design.name}</h2><p className="mt-1 text-[10px] text-muted-foreground">Color: {item.color}</p></div><button type="button" aria-label={`Remove ${item.design.name}`} onClick={() => removeItem(item.design.id, item.color)}><Trash2 className="size-4 text-muted-foreground" /></button></div><div className="mt-4 flex items-center justify-between"><p className="text-xs text-primary">{formatNaira(item.design.price * item.quantity)}</p><div className="flex items-center gap-2 rounded-full border border-border px-2 py-1"><button type="button" aria-label="Decrease quantity" onClick={() => removeItem(item.design.id, item.color)}><Minus className="size-3" /></button><span className="text-xs">{item.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => addItem(item.design, item.color)}><Plus className="size-3" /></button></div></div></div></div>)}</div><div className="mt-6 rounded-2xl border border-border bg-card p-4"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><strong className="text-foreground">{formatNaira(total)}</strong></div><p className="mt-1 text-[10px] text-muted-foreground">Delivery details are confirmed at checkout.</p><button type="button" onClick={() => navigate({ to: "/checkout" })} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground">Continue to checkout <ArrowLeft className="size-4 rotate-180" /></button></div></>}
    </main></AppShell>;
}
