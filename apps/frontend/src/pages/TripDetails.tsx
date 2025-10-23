import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { socket } from '@/sockets/io';

type Trip = {
  id: string; title: string; city: string; heroMedia: string;
  packages: { id: string; name: string; basePrice: number; seatsLeft: number }[];
  itinerary: { id: string; day: number; title: string; description: string }[];
  media?: { id: string; type: string; url: string }[];
};

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [qtyByPackage, setQtyByPackage] = useState<Record<string, number>>({});
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/trips/${id}`).then(r => setTrip(r.data));
  }, [id]);

  useEffect(() => {
    const onSeat = (payload: any) => {
      if (payload.tripId === id) {
        api.get(`/trips/${id}`).then(r => setTrip(r.data));
      }
    }
    socket.on('seat_update', onSeat);
    return () => { socket.off('seat_update', onSeat); };
  }, [id]);

  if (!trip) return null;

  return (
    <div>
      <div className="relative h-[60vh]">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src={trip.heroMedia} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-10">
            <h1 className="text-4xl font-bold">{trip.title}</h1>
            <div className="text-white/80">{trip.city}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        {trip.packages.map((p) => (
          <div key={p.id} className="glass p-6">
            <div className="font-semibold text-xl mb-2">{p.name}</div>
            <div className="text-white/70 mb-2">From €{p.basePrice}</div>
            <div className="text-white/80 mb-4">Seats left: {p.seatsLeft}</div>

            <div className="flex items-center gap-3 mb-3">
              <label className="text-white/80 text-sm">Guests</label>
              <input
                type="number"
                min={1}
                max={Math.max(1, p.seatsLeft)}
                className="glass px-3 py-2 w-24"
                value={qtyByPackage[p.id] ?? 1}
                onChange={(e) =>
                  setQtyByPackage((prev) => ({ ...prev, [p.id]: Math.max(1, Math.min(Number(e.target.value || 1), Math.max(1, p.seatsLeft))) }))
                }
                disabled={p.seatsLeft <= 0}
              />
            </div>
            <button
              className="btn"
              disabled={p.seatsLeft <= 0}
              onClick={async () => {
                try {
                  setBookingMessage(null);
                  const qty = qtyByPackage[p.id] ?? 1;
                  const guests = Array.from({ length: qty }, () => ({ anon: true }));
                  await api.post('/bookings', {
                    userId: 'demo-user',
                    tripId: trip.id,
                    packageId: p.id,
                    guests,
                  });
                  setBookingMessage('Booking confirmed! Seats reserved.');
                } catch (e: any) {
                  setBookingMessage(e?.response?.data?.error || 'Booking failed');
                }
              }}
            >
              {p.seatsLeft > 0 ? 'Book now' : 'Sold out'}
            </button>
            {bookingMessage && (
              <div className="text-sm text-white/80 mt-2">{bookingMessage}</div>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
        <div className="space-y-3">
          {trip.itinerary.sort((a,b) => a.day - b.day).map(item => (
            <motion.div key={item.id} className="glass p-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}>
              <div className="font-semibold">Day {item.day}: {item.title}</div>
              <div className="text-white/70">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {trip.media && trip.media.some(m => m.type === 'image') && (
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {trip.media.filter(m => m.type === 'image').slice(0,6).map(m => (
              <div key={m.id} className="relative overflow-hidden rounded-xl">
                <img src={m.url} alt={trip.city} className="w-full h-48 object-cover hover:scale-105 transition-transform" />
                <div className="absolute inset-0 ring-1 ring-white/10" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
