import Hero from '@/components/Hero';
import FeaturedTrips from '@/components/FeaturedTrips';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTrips />

      {/* Featured Dakhla */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Featured <span style={{ color: '#CCF32F' }}>Destination</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Discover our carefully curated trips to the most amazing places around the world
            </p>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] mb-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1589506363528-8d56a4972334?auto=format&fit=crop&w=1600&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="p-8 md:p-12 text-white">
              <h3 className="text-3xl md:text-5xl font-bold mb-3">Dakhla, Morocco</h3>
              <p className="text-white/90 md:text-lg max-w-2xl mb-6">
                Experience the unique blend of desert and ocean in this breathtaking destination.
                Dakhla offers kitesurfing, desert adventures, and cultural experiences unlike
                anywhere else.
              </p>
              <div className="flex flex-wrap gap-5 text-sm">
                <div className="inline-flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CCF32F', color: '#1a1a1a' }}>☀️</span>
                  <span>Year-round sunny weather</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CCF32F', color: '#1a1a1a' }}>🌬️</span>
                  <span>Perfect kitesurfing conditions</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CCF32F', color: '#1a1a1a' }}>🏖️</span>
                  <span>Stunning lagoon beaches</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Dakhla <span style={{ color: '#CCF32F' }}>Packages</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Desert Explorer',
                duration: '4 days, 3 nights',
                price: '€499',
                bullets: [
                  'Round-trip flights from major cities',
                  '20kg luggage allowance',
                  '3 nights in 3-star hotel',
                  'Breakfast included',
                  'Desert safari, City tour',
                ],
              },
              {
                name: 'Kitesurf Adventure',
                duration: '6 days, 5 nights',
                price: '€799',
                bullets: [
                  'Round-trip flights',
                  '25kg luggage, sports gear included',
                  '5 nights beach resort, HB',
                  '3-day kitesurf lessons, boat tour',
                ],
              },
              {
                name: 'Luxury Escape',
                duration: '8 days, 7 nights',
                price: '€1,299',
                bullets: [
                  'Flights (biz upgrade avail), lounge',
                  '7 nights 5★ all-inclusive, ocean view',
                  'Private instructor, glamping, spa, chef',
                ],
              },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <div
                  className="text-center p-6"
                  style={{
                    background: 'linear-gradient(135deg, #CCF32F, #a8cc00)',
                    color: '#1a1a1a',
                  }}
                >
                  <div className="text-xl font-bold">{p.name}</div>
                  <div className="opacity-80">{p.duration}</div>
                </div>
                <div className="p-6 text-white">
                  <div className="text-3xl font-extrabold text-center mb-4" style={{ color: '#CCF32F' }}>
                    {p.price}
                  </div>
                  <ul className="text-white/80 text-sm space-y-2 mb-6">
                    {p.bullets.map((b) => (
                      <li key={b} className="border-b border-white/10 pb-2 last:border-none">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <Link to="/trips" className="btn">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <motion.div className="relative">
        <div className="particles" />
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="glass p-6">Testimonial {i}</div>
          ))}
        </div>
      </motion.div>

      {/* Value propositions */}
      <section className="value-props">
        <div className="container py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Travelers Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-xl mb-2">Curated Experiences</h3>
              <p className="text-white/80">Handpicked destinations and activities based on local expertise</p>
            </div>
            <div className="glass p-6 text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold text-xl mb-2">Travel Protection</h3>
              <p className="text-white/80">24/7 support and comprehensive travel insurance included</p>
            </div>
            <div className="glass p-6 text-center">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-semibold text-xl mb-2">Local Experts</h3>
              <p className="text-white/80">Access to hidden gems only known by local guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="social-proof">
        <div className="container py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="glass p-4"><div className="text-2xl font-bold">50,000+</div><div className="text-white/70">Happy Travelers</div></div>
              <div className="glass p-4"><div className="text-2xl font-bold">150+</div><div className="text-white/70">Destinations</div></div>
              <div className="glass p-4"><div className="text-2xl font-bold">4.9/5</div><div className="text-white/70">Customer Rating</div></div>
            </div>
            <div className="glass p-6">
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-white/90">"The attention to detail and local knowledge made our trip unforgettable!"</p>
              <div className="text-white/70 mt-2">- Sarah M.</div>
            </div>
          </div>
        </div>
      </section>
      <footer className="max-w-7xl mx-auto px-6 py-16 text-white/60">© Hache Viajes</footer>
    </div>
  );
}
