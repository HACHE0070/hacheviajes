import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
export default function FeaturedTrips({ title = 'Featured Destinations' }) {
    const [trips, setTrips] = useState([]);
    useEffect(() => {
        api.get('/trips').then(r => setTrips(r.data.slice(0, 6)));
    }, []);
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-center mb-12 glow-text", children: title }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: trips.map((t) => (_jsxs(motion.a, { href: t.city.toLowerCase() === 'dakhla' ? '/trips?dest=dakhla' : `/trips/${t.id}`, className: "glass overflow-hidden hover:scale-[1.02] transition-transform", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [_jsxs("div", { className: "relative h-48", children: [_jsx("video", { className: "absolute inset-0 w-full h-full object-cover", autoPlay: true, loop: true, muted: true, playsInline: true, children: _jsx("source", { src: t.heroMedia, type: "video/mp4" }) }), _jsx("div", { className: "absolute inset-0 ring-1 ring-white/10" })] }), _jsxs("div", { className: "p-4", children: [_jsx("div", { className: "font-semibold text-lg", children: t.title }), _jsx("div", { className: "text-white/70", children: t.city })] })] }, t.id))) })] }));
}
