"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/useAuth";
import { hideToast } from "@/lib/features/uiSlice";

// Small "added to cart" notice that clears itself after 3s
export default function Toast() {
  const toast = useAppSelector((s) => s.ui.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(hideToast()), 3000);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  if (!toast) return null;
  return (
    <div role="status" className="fixed bottom-20 left-1/2 z-[55] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#0b0808] px-5 py-3 text-sm text-white shadow-lg md:bottom-8">
      <Check className="h-4 w-4" aria-hidden="true" />
      <span>{toast.message}</span>
      <Link href="/cart" onClick={() => dispatch(hideToast())} className="underline underline-offset-2">
        View cart
      </Link>
    </div>
  );
}
