"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useAuth";
import { closeDrawer } from "@/lib/features/uiSlice";

// Slide-out mini cart, opened from the header cart button
export default function CartDrawer() {
  const open = useAppSelector((s) => s.ui.drawerOpen);
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeDrawer());
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dispatch(closeDrawer());
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dispatch]);

  return (
    <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={close} className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-label="Cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[#0b0808]/10 px-5 py-4">
          <h2 className="text-lg font-medium text-[#0b0808]">Your cart</h2>
          <button type="button" aria-label="Close cart" onClick={close}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
            <p className="text-sm text-[#0b0808]/70">Your cart is empty.</p>
            <Link href="/shop" onClick={close} className="rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white">
              Shop now
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[#0b0808]/10 overflow-y-auto px-5">
              {items.map((i) => {
                const cutout = i.image?.endsWith(".png");
                return (
                  <li key={`${i.id}-${i.variant?.size}-${i.variant?.color}`} className="flex gap-3 py-4">
                    <div className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg ${cutout ? "bg-linear-to-b from-[#2f2b29] to-[#b4b4b4]" : "bg-[#d1d6d8]"}`}>
                      {i.image && (
                        <Image src={i.image} alt="" fill sizes="64px" className={cutout ? "object-contain object-bottom" : "object-cover"} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="truncate font-medium text-[#0b0808]">{i.name}</p>
                      {i.variant && <p className="text-xs text-[#0b0808]/60">{i.variant.color} · {i.variant.size}</p>}
                      <p className="mt-1 text-xs text-[#0b0808]/60">{i.quantity} × USD {i.price.toFixed(2)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-[#0b0808]/10 p-5">
              <div className="flex justify-between text-sm text-[#0b0808]">
                <span>Subtotal</span>
                <span>USD {subtotal.toFixed(2)}</span>
              </div>
              <Link href="/cart" onClick={close} className="mt-4 block rounded-full bg-[#0b0808] py-3 text-center text-[13px] uppercase text-white">
                View cart
              </Link>
              <Link href="/checkout" onClick={close} className="mt-2 block rounded-full border border-[#0b0808] py-3 text-center text-[13px] uppercase text-[#0b0808]">
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
