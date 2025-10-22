import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Slide = { image: string; title: string; description: string };

const SLIDES: Slide[] = [
  {
    image:
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=1600&q=80',
    title: 'Paris, France',
    description:
      'Discover the city of love with its iconic monuments and romantic walks',
  },
  {
    image:
      'https://images.unsplash.com/photo-1540959733332-8ab49d8058c5?auto=format&fit=crop&w=1600&q=80',
    title: 'Tokyo, Japan',
    description:
      'Experience the perfect fusion of ancient tradition and technological innovation',
  },
  {
    image:
      'https://images.unsplash.com/photo-1536152470836-b943b246224c?auto=format&fit=crop&w=1600&q=80',
    title: 'Bali, Indonesia',
    description:
      'Relax in tropical paradises with dream beaches and ancient temples',
  },
  {
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    title: 'Rome, Italy',
    description:
      'Travel back in time through the eternal city and its historical legacy',
  },
  {
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80',
    title: 'Santorini, Greece',
    description:
      'Be seduced by its impressive sunsets and unique architecture',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState(false);
  const total = SLIDES.length;
  const intervalRef = useRef<number | null>(null);

  const goTo = (idx: number) => setCurrent((idx + total) % total);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    if (hover) return;
    intervalRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 5000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [hover, total]);

  const sliderStyle = useMemo(
    () => ({
      width: `${total * 100}%`,
      transform: `translateX(-${current * (100 / total)}%)`,
      transition: 'transform 700ms ease',
    }),
    [current, total]
  );

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <div
        className="absolute inset-0"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div className="flex h-full" style={sliderStyle}>
            {SLIDES.map((s, i) => (
              <div key={i} className="relative h-full" style={{ width: `${100 / total}%` }}>
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow">
                    {s.title}
                  </h2>
                  <p className="text-white/85 max-w-2xl mx-auto mb-6 md:text-lg">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nav */}
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="slider-nav prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="slider-nav next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            ›
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full transition ${
                  current === i ? 'bg-[#CCF32F] scale-110' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTAs overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-10">
          <div className="pointer-events-auto flex gap-4 flex-wrap justify-center">
            <Link to="/trips" className="btn" aria-label="Explore trips">
              Explore Trips
            </Link>
            <Link to="/customize" className="btn" aria-label="Customize your trip">
              Customize Your Trip
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
