import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { motion } from 'framer-motion';
export default function Trips() {
    const [trips, setTrips] = useState([]);
    const [city, setCity] = useState('');
    const [showPackagesModal, setShowPackagesModal] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState('');
    const [bookingMsg, setBookingMsg] = useState(null);
    const [selectedDates, setSelectedDates] = useState({});
    useEffect(() => {
        api.get('/trips').then(r => setTrips(r.data));
    }, []);
    // Ensure Dakhla card exists even if not in API yet
    useEffect(() => {
        if (trips.length === 0)
            return;
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
    // Open Dakhla modal when linked with ?dest=dakhla
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if ((params.get('dest') || '').toLowerCase() === 'dakhla') {
            setSelectedTripId('dakhla');
            setShowPackagesModal(true);
        }
    }, []);
    // Local packages data for the horizontal cards
    const tripsData = {
        'dakhla': {
            title: 'Dakhla Packages',
            packages: [
                { name: 'Desert Explorer', duration: '4 days, 3 nights', price: '€499', features: ['Round-trip flights from major cities', '20kg luggage allowance', '3 nights in 3-star hotel', 'Breakfast included', 'Desert safari, City tour'] },
                { name: 'Kitesurf Adventure', duration: '6 days, 5 nights', price: '€799', features: ['Round-trip flights', '25kg luggage, sports gear included', '5 nights beach resort, HB', '3-day kitesurf lessons', 'Boat tour'], popular: true },
                { name: 'Luxury Escape', duration: '8 days, 7 nights', price: '€1,299', features: ['Flights (biz upgrade avail), lounge', '7 nights 5★ all-inclusive, ocean view', 'Private instructor', 'Glamping experience', 'Spa treatments, private chef'] },
            ],
        },
        'bali': {
            title: 'Bali Packages',
            packages: [
                { name: 'Cultural Journey', duration: '7 days, 6 nights', price: '€899', features: ['Round-trip flights from Europe', '30kg luggage allowance', '6 nights in boutique villas', 'All meals included', 'Temple tours, traditional ceremonies'], popular: true },
                { name: 'Surf Paradise', duration: '10 days, 9 nights', price: '€1,199', features: ['Direct flights included', 'Surfboard equipment provided', '9 nights beachfront accommodation', 'Daily surf lessons', 'Island hopping tours'] },
            ],
        },
        'swiss-alps': {
            title: 'Swiss Alps Packages',
            packages: [
                { name: 'Alpine Adventure', duration: '5 days, 4 nights', price: '€1,099', features: ['Round-trip flights to Zurich', 'Ski equipment included', '4 nights mountain lodge', 'All meals included', 'Ski passes, guided tours'] },
                { name: 'Luxury Alpine', duration: '7 days, 6 nights', price: '€2,499', features: ['Business class flights', '6 nights 5-star resort', 'Private ski instructor', 'Helicopter tour', 'Gourmet dining, spa access'], popular: true },
            ],
        },
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-6 py-10", children: [_jsxs("div", { className: "glass p-4 mb-6 flex gap-4 items-center", children: [_jsx("div", { className: "text-white/80", children: "Filter:" }), _jsxs("select", { className: "glass p-2", value: city, onChange: (e) => setCity(e.target.value), children: [_jsx("option", { value: "", children: "All Cities" }), cities.map(c => _jsx("option", { value: c, children: c }, c))] })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [dakhla && (_jsxs("div", { className: "destination-card bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer", onClick: () => { setSelectedTripId('dakhla'); setShowPackagesModal(true); }, children: [_jsxs("div", { className: "relative h-64", children: [_jsx("img", { src: dakhla.media?.find(m => m.type === 'image')?.url || 'https://images.unsplash.com/photo-1589506363528-8d56a4972334?auto=format&fit=crop&w=1200&q=80', alt: "Dakhla, Morocco", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 p-3 flex justify-between", children: _jsx("span", { className: "featured-badge inline-block bg-[#ff6b35] text-white px-3 py-1 rounded-full text-xs font-bold", children: "Featured" }) })] }), _jsxs("div", { className: "p-5", children: [_jsx("h3", { className: "text-[#2c5530] text-xl font-semibold mb-1", children: "Dakhla, Morocco" }), _jsx("p", { className: "text-[#666] italic mb-3", children: "Desert & Ocean Adventure" }), _jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [_jsx("span", { className: "feature-tag bg-[#f0f7f0] text-[#2c5530] px-3 py-1 rounded-full text-xs border border-[#d4e6d4]", children: "\u2600\uFE0F Sunny Weather" }), _jsx("span", { className: "feature-tag bg-[#f0f7f0] text-[#2c5530] px-3 py-1 rounded-full text-xs border border-[#d4e6d4]", children: "\uD83C\uDF2C\uFE0F Kitesurfing" }), _jsx("span", { className: "feature-tag bg-[#f0f7f0] text-[#2c5530] px-3 py-1 rounded-full text-xs border border-[#d4e6d4]", children: "\uD83C\uDFD6\uFE0F Lagoon Beaches" })] }), _jsxs("div", { className: "bg-[#f9f9f9] rounded-md p-3 mb-4", children: [_jsx("strong", { className: "block text-sm mb-1", children: "Available Dates:" }), _jsxs("div", { className: "flex flex-col gap-1 text-sm text-[#333]", children: [_jsx("span", { children: "Mar 15-22, 2025" }), _jsx("span", { children: "Apr 5-12, 2025" }), _jsx("span", { children: "May 10-17, 2025" })] })] }), _jsx("button", { className: "w-full py-2 rounded-md font-semibold bg-[#2c5530] text-white hover:bg-[#1e3a23]", onClick: (e) => { e.stopPropagation(); setSelectedTripId('dakhla'); setShowPackagesModal(true); }, children: "View Packages & Prices" })] })] })), others.map((t) => (_jsxs(motion.a, { href: `/trips/${t.id}`, className: "glass overflow-hidden hover:scale-[1.02] transition-transform", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [_jsxs("div", { className: "relative h-48", children: [t.media?.some(m => m.type === 'image') ? (_jsx("img", { src: t.media.find(m => m.type === 'image').url, alt: t.city, className: "absolute inset-0 w-full h-full object-cover" })) : (_jsx("video", { className: "absolute inset-0 w-full h-full object-cover", autoPlay: true, loop: true, muted: true, playsInline: true, children: _jsx("source", { src: t.heroMedia, type: "video/mp4" }) })), _jsx("div", { className: "absolute inset-0 ring-1 ring-white/10" })] }), _jsxs("div", { className: "p-4", children: [_jsx("div", { className: "font-semibold text-lg", children: t.title }), _jsx("div", { className: "text-white/70", children: t.city })] })] }, t.id)))] }), showPackagesModal && selectedTripId && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-black/70 z-40", onClick: () => setShowPackagesModal(false) }), _jsxs("div", { className: "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-[92%] max-w-5xl max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "sticky top-0 bg-[#2c5530] text-white flex items-center justify-between px-5 py-4 rounded-t-xl", children: [_jsx("h2", { className: "font-semibold", children: tripsData[selectedTripId].title }), _jsx("button", { className: "text-2xl leading-none", onClick: () => setShowPackagesModal(false), children: "\u00D7" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-5 p-5", children: tripsData[selectedTripId].packages.map((pkg, idx) => {
                                    const baseTrip = selectedTripId === 'dakhla' ? dakhla : others.find(o => o.city.toLowerCase().includes(selectedTripId.replace('-', ' ')));
                                    const pkgModel = baseTrip?.packages[idx] || baseTrip?.packages[0];
                                    const pkgId = pkgModel?.id;
                                    const selKey = pkg.name;
                                    return (_jsxs("div", { className: `relative bg-white rounded-lg shadow p-5 border ${idx === 1 ? 'border-yellow-400' : 'border-transparent'}`, children: [_jsx("div", { className: `absolute -top-2 left-5 px-3 py-1 rounded-full text-xs font-bold ${idx === 1 ? 'bg-yellow-400 text-black' : 'bg-[#2c5530] text-white'}`, children: pkg.popular ? 'Most Popular' : idx === 2 ? 'Luxury' : 'Budget Friendly' }), _jsx("h3", { className: "mt-4 text-lg font-semibold", children: pkg.name }), _jsx("div", { className: "text-sm text-gray-600", children: pkg.duration }), _jsx("div", { className: "text-2xl font-extrabold text-[#2c5530] my-3", children: pkg.price }), _jsxs("div", { className: "mb-3", children: [_jsx("strong", { className: "block text-sm mb-1", children: "Available Dates:" }), _jsxs("select", { className: "w-full border rounded px-3 py-2", value: selectedDates[selKey] || 'Flexible', onChange: (e) => setSelectedDates((prev) => ({ ...prev, [selKey]: e.target.value })), children: [_jsx("option", { value: "Flexible", children: "Flexible" }), _jsx("option", { children: "Mar" }), _jsx("option", { children: "Apr" }), _jsx("option", { children: "May" })] })] }), _jsx("button", { className: "w-full py-2 rounded-md font-semibold bg-[#2c5530] text-white hover:bg-[#1e3a23]", onClick: async () => {
                                                    try {
                                                        setBookingMsg(null);
                                                        if (!pkgId)
                                                            throw new Error('Package unavailable');
                                                        await api.post('/bookings', { userId: 'demo-user', tripId: baseTrip?.id, packageId: pkgId, guests: [{ anon: true }] });
                                                        setBookingMsg('Booking confirmed!');
                                                    }
                                                    catch (e) {
                                                        setBookingMsg(e?.response?.data?.error || 'Booking failed');
                                                    }
                                                }, children: "Book This Package" })] }, pkg.name));
                                }) }), bookingMsg && _jsx("div", { className: "px-5 pb-5 text-sm text-gray-700", children: bookingMsg })] })] }))] }));
}
