"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useAuth";
import { removeFromCart, setQuantity } from "@/lib/features/cartSlice";
import { setPromo } from "@/lib/features/orderSlice";
import { useGetProductsQuery } from "@/lib/services/storeApi";
import { FREE_SHIPPING_OVER, PROMOS, money, totals } from "@/lib/pricing";

const eyebrow = "text-[11px] uppercase tracking-wide text-[#0b0808]/70";
const pill = "rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white transition hover:bg-[#5d4d45]";

export default function CartPage() {
  const items = useAppSelector((s) => s.cart.items);
  const promo = useAppSelector((s) => s.order.promo);
  const { data: all } = useGetProductsQuery();
  const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [note, setNote] = useState("");
  const [gift, setGift] = useState(false);

  const { subtotal, discount, shipping, total } = totals(items, promo);
  const toFree = Math.max(0, FREE_SHIPPING_OVER - (subtotal - discount));
  const inCart = new Set(items.map((i) => i.id));
  const suggestions = all.filter((p) => !inCart.has(p._id)).slice(0, 4);

  const applyCode = () => {
    const c = code.trim().toUpperCase();
    if (PROMOS[c]) {
      dispatch(setPromo(c));
      setCodeError(false);
      setCode("");
    } else {
      setCodeError(true);
    }
  };

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 pt-28 text-center">
        <h1 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Your cart is empty
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#0b0808]/70">Add some gear and it will show up here.</p>
        <Link href="/shop" className={`mt-8 ${pill}`}>
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <span className={eyebrow}>Your cart</span>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Shopping cart
        </h1>

        {/* Free shipping progress */}
        <div className="mt-8 max-w-xl">
          <p className="text-xs text-[#0b0808]/70">
            {toFree > 0 ? `You are ${money(toFree)} away from free shipping.` : "You have unlocked free shipping."}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e9ebed]">
            <div
              className="h-full rounded-full bg-[#0b0808] transition-all"
              style={{ width: `${Math.min(100, ((subtotal - discount) / FREE_SHIPPING_OVER) * 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div>
            <ul className="divide-y divide-[#0b0808]/15 border-y border-[#0b0808]/15">
              {items.map((item) => {
                const line = { id: item.id, variant: item.variant };
                const cutout = item.image?.endsWith(".png");
                return (
                  <li key={`${item.id}-${item.variant?.size}-${item.variant?.color}`} className="flex gap-4 py-5">
                    <Link
                      href={`/product/${item.id}`}
                      className={`relative h-28 w-24 shrink-0 overflow-hidden rounded-xl ${cutout ? "bg-linear-to-b from-[#2f2b29] to-[#b4b4b4]" : "bg-[#d1d6d8]"}`}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className={cutout ? "object-contain object-bottom" : "object-cover"}
                        />
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link href={`/product/${item.id}`} className="block truncate text-sm font-medium text-[#0b0808] hover:opacity-60">
                            {item.name}
                          </Link>
                          {item.variant && (
                            <p className="mt-1 text-xs text-[#0b0808]/60">
                              {item.variant.color} · {item.variant.size}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-[#0b0808]/60">{money(item.price)}</p>
                        </div>
                        <p className="shrink-0 text-sm text-[#0b0808]">{money(item.price * item.quantity)}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-black/20">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                            onClick={() => dispatch(setQuantity({ ...line, quantity: item.quantity - 1 }))}
                            className="flex h-9 w-9 items-center justify-center disabled:opacity-30"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm" aria-live="polite">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => dispatch(setQuantity({ ...line, quantity: item.quantity + 1 }))}
                            className="flex h-9 w-9 items-center justify-center"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => dispatch(removeFromCart(line))}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-[#0b0808]/60 transition hover:bg-[#e9ebed] hover:text-[#0b0808]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Order notes and gift option (not saved anywhere: demo only) */}
            <div className="mt-8">
              <label htmlFor="note" className={eyebrow}>Order notes</label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Anything we should know?"
                className="mt-2 w-full rounded-2xl border border-black/15 bg-white p-4 text-sm outline-none focus:border-[#0b0808]"
              />
              <label className="mt-3 flex items-center gap-2 text-sm text-[#0b0808]">
                <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="h-4 w-4 accent-[#0b0808]" />
                This order is a gift (no prices on the packing slip)
              </label>
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-[#e9ebed] p-6">
            <h2 className="text-lg font-medium text-[#0b0808]">Order summary</h2>

            {/* Promo code */}
            <div className="mt-5">
              {promo ? (
                <div className="flex items-center justify-between rounded-full bg-white px-4 py-2 text-xs text-[#0b0808]">
                  <span>Code {promo} applied</span>
                  <button type="button" onClick={() => dispatch(setPromo(null))} className="underline underline-offset-2">
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && applyCode()}
                      placeholder="Promo code"
                      aria-label="Promo code"
                      className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 py-2 text-sm outline-none focus:border-[#0b0808]"
                    />
                    <button type="button" onClick={applyCode} className="rounded-full bg-[#0b0808] px-4 text-[13px] uppercase text-white">
                      Apply
                    </button>
                  </div>
                  <p className={`mt-2 text-xs ${codeError ? "text-red-600" : "text-[#0b0808]/50"}`}>
                    {codeError ? "That code is not valid." : "Try BALANCE10 for 10% off."}
                  </p>
                </>
              )}
            </div>

            <dl className="mt-6 space-y-3 text-sm text-[#0b0808]">
              <div className="flex justify-between">
                <dt className="text-[#0b0808]/70">Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-[#0b0808]/70">Discount</dt>
                  <dd>-{money(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-[#0b0808]/70">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : money(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-[#0b0808]/15 pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className={`mt-6 block w-full py-4 text-center ${pill}`}>
              Checkout
            </Link>
            <Link href="/shop" className="mt-4 block text-center text-xs underline underline-offset-2 hover:opacity-60">
              Continue shopping
            </Link>
          </aside>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-16 sm:mt-28">
            <h2 className="text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
              You may also like
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {suggestions.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
