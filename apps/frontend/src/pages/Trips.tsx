import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { motion } from 'framer-motion';

type Trip = {
  id: string; title: string; city: string; heroMedia: string;
  packages: { id: string; name: string; basePrice: number }[];
};

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    api.get('/trips').then(r => setTrips(r.data));
  }, []);

  const filtered = useMemo(() => trips.filter(t => !city || t.city === city), [trips, city]);
  const cities = useMemo(() => Array.from(new Set(trips.map(t => t.city))), [trips]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="glass p-4 mb-6 flex gap-4 items-center">
        <div className="text-white/80">Filter:</div>
        <select className="glass p-2" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <motion.a key={t.id} href={`/trips/${t.id}`} className="glass overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative h-48">
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src={t.heroMedia} type="video/mp4" />
              </video>
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
