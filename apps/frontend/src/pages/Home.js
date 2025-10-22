import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Hero from '@/components/Hero';
import FeaturedTrips from '@/components/FeaturedTrips';
import { motion } from 'framer-motion';
export default function Home() {
    return (_jsxs("div", { children: [_jsx(Hero, {}), _jsx(FeaturedTrips, {}), _jsx(motion.div, { className: "max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6", initial: { opacity: 0 }, whileInView: { opacity: 1 }, children: [1, 2, 3].map((i) => (_jsxs("div", { className: "glass p-6", children: ["Testimonial ", i] }, i))) }), _jsx("footer", { className: "max-w-7xl mx-auto px-6 py-16 text-white/60", children: "\u00A9 Hache Viajes" })] }));
}
