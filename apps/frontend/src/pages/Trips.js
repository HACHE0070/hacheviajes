import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { motion } from 'framer-motion';
export default function Trips() {
    const [trips, setTrips] = useState([]);
    const [city, setCity] = useState('');
    useEffect(() => {
        api.get('/trips').then(r => setTrips(r.data));
    }, []);
    const filtered = useMemo(() => trips.filter(t => !city || t.city === city), [trips, city]);
    const cities = useMemo(() => Array.from(new Set(trips.map(t => t.city))), [trips]);
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-6 py-10", children: [_jsxs("div", { className: "glass p-4 mb-6 flex gap-4 items-center", children: [_jsx("div", { className: "text-white/80", children: "Filter:" }), _jsxs("select", { className: "glass p-2", value: city, onChange: (e) => setCity(e.target.value), children: [_jsx("option", { value: "", children: "All Cities" }), cities.map(c => _jsx("option", { value: c, children: c }, c))] })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: filtered.map((t) => (_jsxs(motion.a, { href: `/trips/${t.id}`, className: "glass overflow-hidden", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [_jsx("div", { className: "relative h-48", children: _jsx("video", { className: "absolute inset-0 w-full h-full object-cover", autoPlay: true, loop: true, muted: true, playsInline: true, children: _jsx("source", { src: t.heroMedia, type: "video/mp4" }) }) }), _jsxs("div", { className: "p-4", children: [_jsx("div", { className: "font-semibold text-lg", children: t.title }), _jsx("div", { className: "text-white/70", children: t.city })] })] }, t.id))) })] }));
}
