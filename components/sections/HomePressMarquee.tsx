const pressNames = ["FORM", "MODE", "THE DAILY", "GOOD LIFE", "STUDIO"];

export default function HomePressMarquee() {
  return (
    <section className="overflow-hidden text-black">
      <div className="mx-auto grid max-w-360 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.8fr)] lg:gap-16 lg:px-8">
        <div>
          <h2 className="max-w-md text-2xl font-semibold leading-none tracking-tight sm:text-3xl">
            Built for the way you move, live, and glow.
          </h2>
          <p className="mt-2 text-base font-medium sm:text-lg">
            Well-being from the inside out.
          </p>
        </div>

        <div className="relative overflow-hidden" aria-label="Featured publications">
          <div className="home-marquee flex w-max items-center gap-12 sm:gap-20">
            {[...pressNames, ...pressNames].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="whitespace-nowrap text-2xl font-semibold tracking-tight text-[#9c9a96] sm:text-4xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
