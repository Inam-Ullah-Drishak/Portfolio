"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useAuth";
import { clearCart } from "@/lib/features/cartSlice";
import { setLastOrder, setPromo } from "@/lib/features/orderSlice";
import { money, totals } from "@/lib/pricing";

const eyebrow = "text-[11px] uppercase tracking-wide text-[#0b0808]/70";
const input = "mt-2 w-full rounded-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#0b0808]";

const orderNumber = () => `BB-${Math.floor(100000 + Math.random() * 900000)}`;

export default function CheckoutPage() {
  const items = useAppSelector((s) => s.cart.items);
  const promo = useAppSelector((s) => s.order.promo);
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { subtotal, discount, shipping, total } = totals(items, promo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const address = [f.get("address"), f.get("city"), f.get("zip")].join(", ");
    dispatch(
      setLastOrder({
        number: orderNumber(),
        items,
        subtotal,
        discount,
        shipping,
        total,
        email: String(f.get("email")),
        address,
      }),
    );
    dispatch(clearCart());
    dispatch(setPromo(null));
    router.push("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 pt-28 text-center">
        <h1 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Nothing to check out
        </h1>
        <Link href="/shop" className="mt-8 rounded-full bg-[#0b0808] px-5 py-3 text-[13px] uppercase text-white">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-360">
        <span className={eyebrow}>Secure checkout</span>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tight text-[#0b0808]">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div className="space-y-10">
            <fieldset>
              <legend className="text-lg font-medium text-[#0b0808]">Contact</legend>
              <label className="mt-4 block">
                <span className={eyebrow}>Email</span>
                <input name="email" type="email" required defaultValue={user?.email ?? ""} autoComplete="email" className={input} />
              </label>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-medium text-[#0b0808]">Shipping address</legend>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={eyebrow}>First name</span>
                  <input name="first" required autoComplete="given-name" className={input} />
                </label>
                <label className="block">
                  <span className={eyebrow}>Last name</span>
                  <input name="last" required autoComplete="family-name" className={input} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={eyebrow}>Address</span>
                  <input name="address" required autoComplete="street-address" className={input} />
                </label>
                <label className="block">
                  <span className={eyebrow}>City</span>
                  <input name="city" required autoComplete="address-level2" className={input} />
                </label>
                <label className="block">
                  <span className={eyebrow}>ZIP / Postcode</span>
                  <input name="zip" required autoComplete="postal-code" className={input} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-medium text-[#0b0808]">Payment</legend>
              <p className="mt-4 rounded-2xl bg-[#e9ebed] p-4 text-sm leading-6 text-[#0b0808]/70">
                This is a demo store. Payment is simulated, so no card details are asked for and nothing is charged.
              </p>
            </fieldset>
          </div>

          <aside className="h-fit rounded-2xl bg-[#e9ebed] p-6">
            <h2 className="text-lg font-medium text-[#0b0808]">Order summary</h2>
            <ul className="mt-5 space-y-3 text-sm text-[#0b0808]">
              {items.map((i) => (
                <li key={`${i.id}-${i.variant?.size}-${i.variant?.color}`} className="flex justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate">{i.quantity} × {i.name}</span>
                    {i.variant && <span className="text-xs text-[#0b0808]/60">{i.variant.color} · {i.variant.size}</span>}
                  </span>
                  <span className="shrink-0">{money(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-3 border-t border-[#0b0808]/15 pt-5 text-sm text-[#0b0808]">
              <div className="flex justify-between">
                <dt className="text-[#0b0808]/70">Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-[#0b0808]/70">Discount ({promo})</dt>
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
            <button type="submit" className="mt-6 w-full rounded-full bg-[#0b0808] py-4 text-[13px] uppercase text-white transition hover:bg-[#5d4d45]">
              Place order
            </button>
            <Link href="/cart" className="mt-4 block text-center text-xs underline underline-offset-2 hover:opacity-60">
              Back to cart
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
