import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Home from './Home';
import Trips from './Trips';
import TripDetails from './TripDetails';
import Customize from './Customize';
// Admin panel removed
export default function App() {
    return (_jsxs("div", { className: "bg-clouds min-h-screen pb-20", children: [_jsx(NavBar, {}), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 }, className: "pt-24", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/trips", element: _jsx(Trips, {}) }), _jsx(Route, { path: "/trips/:id", element: _jsx(TripDetails, {}) }), _jsx(Route, { path: "/customize", element: _jsx(Customize, {}) })] }) })] }));
}
