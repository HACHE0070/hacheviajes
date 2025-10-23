import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

type Trip = {
  id: string;
  title: string;
  city: string;
  heroMedia: string;
  packages: { id: string; name: string; basePrice: number }[];
};

export default function FeaturedTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    api.get('/trips').then(r => setTrips(r.data.slice(0, 6)));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-6">Featured Trips</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {trips.map((t) => (
          <motion.a key={t.id} href={t.city.toLowerCase()==='dakhla' ? '/trips?dest=dakhla' : `/trips/${t.id}`} className="glass overflow-hidden hover:scale-[1.02] transition-transform" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative h-48">
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src={t.heroMedia} type="video/mp4" />
              </video>
              <div className="absolute inset-0 ring-1 ring-white/10" />
            </div>
            <div className="p-4">
              <div className="font-semibold text-lg">{t.title}</div>
              <div className="text-white/70">{t.city}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
