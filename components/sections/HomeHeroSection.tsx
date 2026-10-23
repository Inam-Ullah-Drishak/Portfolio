import Link from "next/link";

export default function HomeHeroSection() {
  return (
    <section className="relative isolate min-h-[min(720px,calc(100vh-4rem))] overflow-hidden bg-neutral-900 text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      >
        <source src="/home-hero-bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-1 bg-linear-to-r from-black/75 via-black/35 to-black/10" />
      <div className="relative z-10 mx-auto flex min-h-[min(720px,calc(100vh-4rem))] max-w-360 items-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            New season / 2026
          </p>
          <h1 className="max-w-lg text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Start your Revolution
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/85 sm:text-lg">
            Everyday essentials with a sharper point of view. Discover the
            pieces made for wherever you are going next.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Shop collection
          </Link>
        </div>
      </div>
    </section>
  );
}
