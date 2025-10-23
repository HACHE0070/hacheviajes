import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { motion } from 'framer-motion';

type Trip = {
  id: string; title: string; city: string; heroMedia: string;
  packages: { id: string; name: string; basePrice: number }[];
  media?: { type: string; url: string }[];
};

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [city, setCity] = useState('');
  const [showDakhlaModal, setShowDakhlaModal] = useState(false);
  const [bookingMsg, setBookingMsg] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});

  useEffect(() => {
    api.get('/trips').then(r => setTrips(r.data));
  }, []);

  // Ensure Dakhla card exists even if not in API yet
  useEffect(() => {
    if (trips.length === 0) return;
    const hasDakhla = trips.some(t => t.city.toLowerCase() === 'dakhla');
    if (!hasDakhla) {
      setTrips((prev) => [
        ...prev,
        {
          id: 'dakhla-placeholder',
          title: 'Dakhla: Kite & Desert',
          city: 'Dakhla',
          heroMedia: 'https://videos.pexels.com/video-files/856879/856879-hd_1280_720_25fps.mp4',
          packages: [
            { id: 'p1', name: 'Desert Explorer', basePrice: 499 },
            { id: 'p2', name: 'Kitesurf Adventure', basePrice: 799 },
            { id: 'p3', name: 'Luxury Escape', basePrice: 1299 },
          ],
          media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1589506363528-8d56a4972334?auto=format&fit=crop&w=1200&q=80' },
          ],
        },
      ]);
    }
  }, [trips]);

  const filtered = useMemo(() => trips.filter(t => !city || t.city === city), [trips, city]);
  const cities = useMemo(() => Array.from(new Set(trips.map(t => t.city))), [trips]);
  const dakhla = useMemo(() => filtered.find(t => t.city.toLowerCase() === 'dakhla'), [filtered]);
  const others = useMemo(() => filtered.filter(t => t.city.toLowerCase() !== 'dakhla'), [filtered]);

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
        {/* Dakhla destination card */}
        {dakhla && (
          <div className="destination-card bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer" onClick={() => setShowDakhlaModal(true)}>
            <div className="relative h-64">
              <img src={dakhla.media?.find(m=>m.type==='image')?.url || 'https://images.unsplash.com/photo-1589506363528-8d56a4972334?auto=format&fit=crop&w=1200&q=80'} alt="Dakhla, Morocco" className="w-full h-full object-cover" />
              <div className="absolute inset-0 p-3 flex justify-between">
                <span className="featured-badge inline-block bg-[#ff6b35] text-white px-3 py-1 rounded-full text-xs font-bold">Featured</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-[#2c5530] text-xl font-semibold mb-1">Dakhla, Morocco</h3>
              <p className="text-[#666] italic mb-3">Desert & Ocean Adventure</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="feature-tag bg-[#f0f7f0] text-[#2c5530] px-3 py-1 rounded-full text-xs border border-[#d4e6d4]">☀️ Sunny Weather</span>
                <span className="feature-tag bg-[#f0f7f0] text-[#2c5530] px-3 py-1 rounded-full text-xs border border-[#d4e6d4]">🌬️ Kitesurfing</span>
                <span className="feature-tag bg-[#f0f7f0] text-[#2c5530] px-3 py-1 rounded-full text-xs border border-[#d4e6d4]">🏖️ Lagoon Beaches</span>
              </div>
              <div className="bg-[#f9f9f9] rounded-md p-3 mb-4">
                <strong className="block text-sm mb-1">Available Dates:</strong>
                <div className="flex flex-col gap-1 text-sm text-[#333]">
                  <span>Mar 15-22, 2025</span>
                  <span>Apr 5-12, 2025</span>
                  <span>May 10-17, 2025</span>
                </div>
              </div>
              <button className="w-full py-2 rounded-md font-semibold bg-[#2c5530] text-white hover:bg-[#1e3a23]" onClick={(e)=>{e.stopPropagation(); setShowDakhlaModal(true);}}>View Packages & Prices</button>
            </div>
          </div>
        )}

        {others.map((t) => (
          <motion.a key={t.id} href={`/trips/${t.id}`} className="glass overflow-hidden hover:scale-[1.02] transition-transform" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative h-48">
              {t.media?.some(m => m.type === 'image') ? (
                <img src={t.media.find(m => m.type==='image')!.url} alt={t.city} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                  <source src={t.heroMedia} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 ring-1 ring-white/10" />
            </div>
            <div className="p-4">
              <div className="font-semibold text-lg">{t.title}</div>
              <div className="text-white/70">{t.city}</div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Packages Modal for Dakhla */}
      {showDakhlaModal && dakhla && (
        <>
          <div className="fixed inset-0 bg-black/70 z-40" onClick={() => setShowDakhlaModal(false)} />
          <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-[92%] max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#2c5530] text-white flex items-center justify-between px-5 py-4 rounded-t-xl">
              <h2 className="font-semibold">Dakhla, Morocco - Available Packages</h2>
              <button className="text-2xl leading-none" onClick={() => setShowDakhlaModal(false)}>×</button>
            </div>
            <div className="grid md:grid-cols-3 gap-5 p-5">
              {[
                { label: 'Desert Explorer', duration: '4 days, 3 nights', price: 499, dates: ['Mar 15-18, 2025','Apr 5-8, 2025','May 10-13, 2025'] },
                { label: 'Kitesurf Adventure', duration: '6 days, 5 nights', price: 799, dates: ['Mar 15-20, 2025','Apr 5-10, 2025','May 10-15, 2025'] },
                { label: 'Luxury Escape', duration: '8 days, 7 nights', price: 1299, dates: ['Mar 15-22, 2025','Apr 5-12, 2025','May 10-17, 2025'] },
              ].map((pkg, idx) => {
                const pkgModel = dakhla.packages[idx] || dakhla.packages[0];
                const pkgId = pkgModel?.id;
                const selKey = pkg.label;
                return (
                  <div key={pkg.label} className={`relative bg-white rounded-lg shadow p-5 border ${idx===1 ? 'border-yellow-400' : 'border-transparent'}`}>
                    <div className={`absolute -top-2 left-5 px-3 py-1 rounded-full text-xs font-bold ${idx===1 ? 'bg-yellow-400 text-black' : 'bg-[#2c5530] text-white'}`}>
                      {idx===1 ? 'Most Popular' : idx===2 ? 'Luxury' : 'Budget Friendly'}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{pkg.label}</h3>
                    <div className="text-sm text-gray-600">{pkg.duration}</div>
                    <div className="text-2xl font-extrabold text-[#2c5530] my-3">€{pkg.price}</div>
                    <div className="mb-3">
                      <strong className="block text-sm mb-1">Available Dates:</strong>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={selectedDates[selKey] || pkg.dates[0]}
                        onChange={(e) => setSelectedDates((prev) => ({ ...prev, [selKey]: e.target.value }))}
                      >
                        {pkg.dates.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="w-full py-2 rounded-md font-semibold bg-[#2c5530] text-white hover:bg-[#1e3a23]"
                      onClick={async () => {
                        try {
                          setBookingMsg(null);
                          if (!pkgId) throw new Error('Package unavailable');
                          await api.post('/bookings', {
                            userId: 'demo-user',
                            tripId: dakhla.id,
                            packageId: pkgId,
                            guests: [{ anon: true }],
                          });
                          setBookingMsg('Booking confirmed!');
                        } catch (e: any) {
                          setBookingMsg(e?.response?.data?.error || 'Booking failed');
                        }
                      }}
                    >
                      Book This Package
                    </button>
                  </div>
                );
              })}
            </div>
            {bookingMsg && <div className="px-5 pb-5 text-sm text-gray-700">{bookingMsg}</div>}
          </div>
        </>
      )}
    </div>
  );
}
