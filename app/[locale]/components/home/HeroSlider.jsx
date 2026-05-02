"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    tag: "Regulated Broker in UAE",
    title: "Trade CFDs on Global Markets",
    subtitle: "Forex · Indices · Commodities · Shares",
    description:
      "Access tight spreads, fast execution, and world-class trading platforms tailored for UAE traders.",
    primaryCta: "Open Live Account",
    secondaryCta: "Try Demo Account",
    image: "/images/hero-slide-1.png", // TODO: replace with your image
  },
  {
    id: 2,
    tag: "Local Support · Global Access",
    title: "Designed for Traders in the UAE",
    subtitle: "Arabic & English support · Local funding options",
    description:
      "Enjoy a seamless trading experience with local support and global market access under one roof.",
    primaryCta: "Start Trading Now",
    secondaryCta: "Contact Us",
    image: "/images/hero-slide-2.png",
  },
  {
    id: 3,
    tag: "Powerful Platforms",
    title: "Trade with MT4 / MT5 & Mobile Apps",
    subtitle: "Anywhere, anytime, on any device",
    description:
      "Use advanced charting tools, technical indicators, and mobile access to stay ahead of the markets.",
    primaryCta: "Download Platform",
    secondaryCta: "Learn More",
    image: "/images/hero-slide-3.png",
  },
];

const AUTOPLAY_DURATION = 6000; // 8 seconds per slide
const PROGRESS_TICK = 80; // ms – how often to update progress

export default function HomeHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0–100 for active slide progress

  // Autoplay with progress bar
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min(
        100,
        (elapsed / AUTOPLAY_DURATION) * 100
      );

      setProgress(percentage);

      if (elapsed >= AUTOPLAY_DURATION) {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }
    }, PROGRESS_TICK);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const goTo = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
    setProgress(0);
  };

  return (
    <section className="relative w-full bg-[#02051a]">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-12 md:pt-10 lg:pt-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#050823] via-[#040a32] to-[#02051a] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          {/* Slider track */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full shrink-0">
                <div className="grid items-center gap-10 px-6 py-10 md:grid-cols-2 md:px-10 lg:px-14 lg:py-14">
                  {/* Left content */}
                  <div className="space-y-4 md:space-y-6">
                    <div className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#f97316] ring-1 ring-white/10">
                      {slide.tag}
                    </div>

                    <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                      {slide.title}
                    </h1>

                    {slide.subtitle && (
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-300/80">
                        {slide.subtitle}
                      </p>
                    )}

                    <p className="max-w-xl text-sm text-slate-200/80 md:text-base">
                      {slide.description}
                    </p>

                    {/* Small badges / points */}
                    <div className="grid gap-2 text-xs text-slate-200/80 sm:grid-cols-2 md:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-6 w-6 rounded-full bg-emerald-500/10 text-center text-xs leading-6 text-emerald-400">
                          ✓
                        </span>
                        <span>Regulated in UAE (SCA)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-6 w-6 rounded-full bg-sky-500/10 text-center text-xs leading-6 text-sky-400">
                          ✓
                        </span>
                        <span>Ultra-competitive spreads</span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button className="rounded-full bg-[#f97316] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#ea580c]">
                        {slide.primaryCta}
                      </button>

                      {slide.secondaryCta && (
                        <button className="rounded-full border border-white/20 bg-transparent px-6 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:border-white/40 hover:bg-white/5">
                          {slide.secondaryCta}
                        </button>
                      )}
                    </div>

                    {/* Risk warning */}
                    <p className="pt-2 text-[11px] leading-relaxed text-slate-400">
                      Trading CFDs involves a high level of risk and may not be
                      suitable for all investors. Please ensure you fully
                      understand the risks involved.
                    </p>
                  </div>

                  {/* Right visual */}
                  <div className="relative flex items-center justify-center">
                    {/* Glow / gradient behind image */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -right-10 top-8 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl" />
                      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
                    </div>

                    <div className="relative h-[240px] w-full max-w-sm md:h-[280px] lg:h-[320px]">
                      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#050b2b]/80 backdrop-blur-sm" />
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="rounded-2xl object-contain p-4 md:p-6"
                        priority={slide.id === 1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar: progress indicators + arrows */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-6 pb-4 md:px-10">
            {/* Progress "dots" (now larger bars with progress) */}
            <div className="flex gap-3 pointer-events-auto">
              {slides.map((slide, index) => {
                // For active slide: use animated progress.
                // For previous slides: show as fully filled.
                // For upcoming slides: show as empty.
                const width =
                  index === activeIndex
                    ? `${progress}%`
                    : index < activeIndex
                    ? "100%"
                    : "0%";

                return (
                  <button
                    key={slide.id}
                    onClick={() => goTo(index)}
                    className="relative h-2.5 w-16 overflow-hidden rounded-full bg-white/15 transition hover:bg-white/25"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-white transition-[width] duration-150"
                      style={{ width }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Arrows */}
            <div className="flex gap-2 pointer-events-auto">
              <button
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/30 text-lg text-white/80 backdrop-blur-md transition hover:border-white hover:text-white"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/30 text-lg text-white/80 backdrop-blur-md transition hover:border-white hover:text-white"
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
