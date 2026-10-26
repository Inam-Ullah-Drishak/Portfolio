"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import { useAppSelector } from "@/lib/hooks/useAuth";
import { money } from "@/lib/pricing";

export default function OrderConfirmationPage() {
  const order = useAppSelector((s) => s.order.last);

  if (!order) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 pt-28 text-center">
        <h1 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          No recent order
        </h1>
        <Link href="/shop" className="mt-8 rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0b0808] text-white">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Thanks for your order!
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#0b0808]/70">
          Order <span className="font-medium text-[#0b0808]">{order.number}</span> is confirmed. A receipt would go to{" "}
          {order.email}. This is a demo store, so nothing was charged and nothing will ship.
        </p>

        <div className="mt-10 rounded-2xl bg-[#e9ebed] p-6 text-left">
          <ul className="space-y-3 text-sm text-[#0b0808]">
            {order.items.map((i) => (
              <li key={`${i.id}-${i.variant?.size}-${i.variant?.color}`} className="flex justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate">{i.quantity} × {i.name}</span>
                  {i.variant && <span className="text-xs text-[#0b0808]/60">{i.variant.color} · {i.variant.size}</span>}
                </span>
                <span className="shrink-0">{money(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-[#0b0808]/15 pt-5 text-sm text-[#0b0808]">
            <div className="flex justify-between"><dt className="text-[#0b0808]/70">Subtotal</dt><dd>{money(order.subtotal)}</dd></div>
            {order.discount > 0 && (
              <div className="flex justify-between"><dt className="text-[#0b0808]/70">Discount</dt><dd>-{money(order.discount)}</dd></div>
            )}
            <div className="flex justify-between"><dt className="text-[#0b0808]/70">Shipping</dt><dd>{order.shipping === 0 ? "Free" : money(order.shipping)}</dd></div>
            <div className="flex justify-between border-t border-[#0b0808]/15 pt-3 text-base font-medium"><dt>Total</dt><dd>{money(order.total)}</dd></div>
          </dl>
          <p className="mt-5 text-xs text-[#0b0808]/60">Shipping to: {order.address}</p>
        </div>

        <Link href="/shop" className="mt-8 inline-block rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white transition hover:bg-[#5d4d45]">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
