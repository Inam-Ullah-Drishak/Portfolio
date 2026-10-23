"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const videoFeeds = [
  { name: "Nick F.", rating: "★★★★★" },
  { name: "Estevan R.", rating: "★★★★★" },
  { name: "Khatia J.", rating: "★★★★★" },
  { name: "Meggie S.", rating: "★★★★★" },
];

export default function VideosFeeds() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleVideo = async (index: number) => {
    const selectedVideo = videoRefs.current[index];

    if (!selectedVideo) {
      return;
    }

    if (playingIndex === index) {
      selectedVideo.pause();
      setPlayingIndex(null);
      return;
    }

    videoRefs.current.forEach((video, videoIndex) => {
      if (video && videoIndex !== index) {
        video.pause();
      }
    });

    await selectedVideo.play();
    setPlayingIndex(index);
  };

  return (
    <section className="py-12 text-black sm:py-16" aria-labelledby="videos-feeds-title">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <h2 id="videos-feeds-title" className="mb-8 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          What people are saying
        </h2>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {videoFeeds.map((feed, index) => (
            <article key={feed.name} className="group relative aspect-3/5 overflow-hidden rounded-md bg-neutral-900">
              <video
                ref={(video) => {
                  videoRefs.current[index] = video;
                }}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
                <source src="/home-hero-bg-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
              <button
                type="button"
                aria-label={`${playingIndex === index ? "Pause" : "Play"} video review from ${feed.name}`}
                onClick={() => toggleVideo(index)}
                className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black transition hover:bg-white"
              >
                {playingIndex === index ? (
                  <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
                ) : (
                  <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                )}
              </button>
              <div className="absolute bottom-4 left-4 text-white sm:bottom-5 sm:left-5">
                <p className="text-sm tracking-[0.12em] text-orange-400">{feed.rating}</p>
                <p className="mt-1 text-sm font-semibold">{feed.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
