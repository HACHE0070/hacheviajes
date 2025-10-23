import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { Plane } from 'lucide-react';
export default function NavBar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/trips', label: 'Trips' },
        { path: '/customize', label: 'Customize Trip' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];
    return (_jsx("nav", { className: "fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-transparent border-b", style: { borderColor: 'var(--primary-lighter)' }, children: _jsx("div", { className: "container mx-auto px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 group", "aria-label": "Hache Viajes home", children: [_jsx(Plane, { className: "h-8 w-8", style: { color: 'var(--primary)' } }), _jsx("span", { className: "text-xl font-bold glow-text", children: "Hache Viajes" })] }), _jsx("div", { className: "hidden md:flex items-center gap-6", children: navLinks.map((link) => (_jsx(Link, { to: link.path, className: `text-sm font-medium transition-all duration-300 hover:scale-105 nav-link ${isActive(link.path) ? 'text-[color:var(--primary)]' : ''}`, style: !isActive(link.path) ? { color: 'var(--text-secondary)' } : undefined, children: link.label }, link.path))) })] }) }) }));
}
