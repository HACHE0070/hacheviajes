import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { socket } from '@/sockets/io';

type Trip = {
  id: string; title: string; city: string; heroMedia: string;
  packages: { id: string; name: string; basePrice: number; seatsLeft: number }[];
  itinerary: { id: string; day: number; title: string; description: string }[];
};

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);

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
            <a href="#" className="btn">View Details</a>
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
    </div>
  );
}
