import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function NavBar() {
    return (_jsx("div", { className: "fixed top-0 left-0 right-0 z-50", children: _jsx("div", { className: "mx-auto max-w-7xl mt-4", children: _jsxs("div", { className: "glass flex items-center justify-between px-6 py-3", children: [_jsx(Link, { to: "/", className: "font-bold text-2xl text-white drop-shadow", children: "Hache Viajes" }), _jsx("nav", { className: "flex gap-6 text-sm", children: [
                            { to: '/', label: 'Home' },
                            { to: '/trips', label: 'Available Trips' },
                            { to: '/customize', label: 'Customize Your Trip' },
                            { to: '/about', label: 'About' },
                            { to: '/contact', label: 'Contact' },
                        ].map((item) => (_jsx(NavLink, { to: item.to, className: ({ isActive }) => `nav-link ${isActive ? 'text-white' : ''}`, children: _jsx(motion.span, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.98 }, children: item.label }) }, item.to))) })] }) }) }));
}
