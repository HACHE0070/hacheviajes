import Hero from '@/components/Hero';
import FeaturedTrips from '@/components/FeaturedTrips';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTrips />
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
