import Hero from '@/components/Hero';
import FeaturedTrips from '@/components/FeaturedTrips';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTrips />
      <motion.div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        {[1,2,3].map((i) => (
          <div key={i} className="glass p-6">Testimonial {i}</div>
        ))}
      </motion.div>
      <footer className="max-w-7xl mx-auto px-6 py-16 text-white/60">© Hache Viajes</footer>
    </div>
  );
}
