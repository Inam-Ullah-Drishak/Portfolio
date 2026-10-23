const topLine = [
  "Thousands of Verified Reviews - Backed by Real Results - Wellness Made Convenient.",
  "Thousands of Verified Reviews - Backed by Real Results - Wellness Made Convenient.",
  "Thousands of Verified Reviews - Backed by Real Results - Wellness Made Convenient.",
];
const bottomLine = [
  "2 Year Warranty",
  "Free Shipping",
  "30-Day Money Back Guarantee",
  "2 Year Warranty",
  "Free Shipping",
  "30-Day Money Back Guarantee",
  "2 Year Warranty",
  "Free Shipping",
  "30-Day Money Back Guarantee",
];

function TextTrack({
  words,
  reverse = false,
  dark = false,
}: {
  words: string[];
  reverse?: boolean;
  dark?: boolean;
}) {
  const renderGroup = (groupIndex: number) => (
    <div key={groupIndex} className="flex shrink-0 items-center gap-8 whitespace-nowrap sm:gap-16">
      {words.map((word, index) => (
        <span
          key={`${word}-${groupIndex}-${index}`}
          className="flex items-center gap-8 text-base font-semibold leading-none tracking-tight sm:gap-16 sm:text-xl lg:text-2xl"
        >
          {word}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`w-full overflow-hidden py-3 sm:py-4 ${dark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div
        className={`home-text-marquee flex w-max items-center ${reverse ? "home-text-marquee-reverse" : ""}`}
      >
        {renderGroup(0)}
        {renderGroup(1)}
      </div>
    </div>
  );
}

export default function HomeTextMarquee() {
  return (
    <section className="overflow-hidden bg-white" aria-label="Store message">
      <div className="flex flex-col gap-1 sm:gap-2">
        <TextTrack words={topLine} />
        <TextTrack words={bottomLine} reverse dark />
      </div>
    </section>
  );
}
