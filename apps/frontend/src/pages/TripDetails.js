import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { socket } from '@/sockets/io';
export default function TripDetails() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [qtyByPackage, setQtyByPackage] = useState({});
    const [bookingMessage, setBookingMessage] = useState(null);
    useEffect(() => {
        api.get(`/trips/${id}`).then(r => setTrip(r.data));
    }, [id]);
    useEffect(() => {
        const onSeat = (payload) => {
            if (payload.tripId === id) {
                api.get(`/trips/${id}`).then(r => setTrip(r.data));
            }
        };
        socket.on('seat_update', onSeat);
        return () => { socket.off('seat_update', onSeat); };
    }, [id]);
    if (!trip)
        return null;
    return (_jsxs("div", { children: [_jsxs("div", { className: "relative h-[60vh]", children: [_jsx("video", { className: "absolute inset-0 w-full h-full object-cover", autoPlay: true, loop: true, muted: true, playsInline: true, children: _jsx("source", { src: trip.heroMedia, type: "video/mp4" }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" }), _jsx("div", { className: "relative z-10 h-full flex items-end", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 pb-10", children: [_jsx("h1", { className: "text-4xl font-bold", children: trip.title }), _jsx("div", { className: "text-white/80", children: trip.city })] }) })] }), _jsx("div", { className: "max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6", children: trip.packages.map((p) => (_jsxs("div", { className: "glass p-6", children: [_jsx("div", { className: "font-semibold text-xl mb-2", children: p.name }), _jsxs("div", { className: "text-white/70 mb-2", children: ["From \u20AC", p.basePrice] }), _jsxs("div", { className: "text-white/80 mb-4", children: ["Seats left: ", p.seatsLeft] }), _jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("label", { className: "text-white/80 text-sm", children: "Guests" }), _jsx("input", { type: "number", min: 1, max: Math.max(1, p.seatsLeft), className: "glass px-3 py-2 w-24", value: qtyByPackage[p.id] ?? 1, onChange: (e) => setQtyByPackage((prev) => ({ ...prev, [p.id]: Math.max(1, Math.min(Number(e.target.value || 1), Math.max(1, p.seatsLeft))) })), disabled: p.seatsLeft <= 0 })] }), _jsx("button", { className: "btn", disabled: p.seatsLeft <= 0, onClick: async () => {
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
                                }
                                catch (e) {
                                    setBookingMessage(e?.response?.data?.error || 'Booking failed');
                                }
                            }, children: p.seatsLeft > 0 ? 'Book now' : 'Sold out' }), bookingMessage && (_jsx("div", { className: "text-sm text-white/80 mt-2", children: bookingMessage }))] }, p.id))) }), _jsxs("div", { className: "max-w-4xl mx-auto px-6 py-10", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Itinerary" }), _jsx("div", { className: "space-y-3", children: trip.itinerary.sort((a, b) => a.day - b.day).map(item => (_jsxs(motion.div, { className: "glass p-4", initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, children: [_jsxs("div", { className: "font-semibold", children: ["Day ", item.day, ": ", item.title] }), _jsx("div", { className: "text-white/70", children: item.description })] }, item.id))) })] }), trip.media && trip.media.some(m => m.type === 'image') && (_jsxs("div", { className: "max-w-6xl mx-auto px-6 py-10", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gallery" }), _jsx("div", { className: "grid md:grid-cols-3 gap-4", children: trip.media.filter(m => m.type === 'image').slice(0, 6).map(m => (_jsxs("div", { className: "relative overflow-hidden rounded-xl", children: [_jsx("img", { src: m.url, alt: trip.city, className: "w-full h-48 object-cover hover:scale-105 transition-transform" }), _jsx("div", { className: "absolute inset-0 ring-1 ring-white/10" })] }, m.id))) })] }))] }));
}
