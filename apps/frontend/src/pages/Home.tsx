import { Link } from 'react-router-dom';
import FeaturedTrips from '@/components/FeaturedTrips';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero with slider and CTAs (existing Hero component) */}
      <Hero />

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[{t:'Curated Destinations',d:"Handpicked locations showcasing Morocco's diverse beauty",e:'📍'}, {t:'Flexible Planning',d:'Choose preset trips or create your custom journey',e:'🗓️'}, {t:'Expert Guidance',d:'Professional local guides and 24/7 support',e:'🛡️'}].map((f,i)=> (
              <div key={i} className="glass-strong rounded-2xl p-8 text-center space-y-4 hover:scale-105 transition-transform duration-300 animate-float" style={{animationDelay:`${i*0.2}s`}}>
                <div className="inline-flex p-4 rounded-full" style={{background:'var(--primary-lighter)'}}><span className="text-2xl">{f.e}</span></div>
                <h3 className="text-xl font-bold">{f.t}</h3>
                <p className="text-[color:var(--text-secondary)]">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-20 px-4 bg-[color:var(--surface)]">
        <FeaturedTrips title="Featured Destinations" />
        <div className="text-center -mt-8">
          <Link to="/trips" className="btn">View All Trips</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 glow-text">Traveler Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{n:'Sarah Johnson',tr:'Dakhla Kitesurfing',q:'An absolutely magical experience! The kitesurfing conditions were perfect and the desert landscapes took my breath away.'}, {n:'Michael Chen',tr:'Marrakesh Cultural Journey',q:'The perfect blend of culture, cuisine, and adventure. Our guide was incredibly knowledgeable and friendly.'}, {n:'Emma Rodriguez',tr:'Agadir Beach & Surf',q:"Paradise on earth! Beautiful beaches, great surf, and the most relaxing vacation I've ever had."}].map((t,i)=> (
              <div key={i} className="glass-strong rounded-2xl p-6 space-y-4 animate-float" style={{animationDelay:`${i*0.3}s`}}>
                <div className="flex gap-1 text-[color:var(--primary)]">
                  {Array.from({length:5}).map((_,k)=> (<span key={k}>★</span>))}
                </div>
                <p className="text-[color:var(--text-secondary)] italic">“{t.q}”</p>
                <div>
                  <p className="font-semibold">{t.n}</p>
                  <p className="text-sm opacity-70">{t.tr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-16 text-black/60">© Hache Viajes</footer>
    </div>
  );
}
